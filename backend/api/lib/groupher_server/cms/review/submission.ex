defmodule GroupherServer.CMS.Review.Submission do
  @moduledoc """
  Registers one content snapshot against its platform and community policies.

      locked resource transaction
        -> lifecycle token / epoch
        -> expire old submission waits
        -> Check registration + scoped wait restrictions
        -> apply deterministic hits
        -> commit content and review facts together
  """

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{Case, ReviewConfig}
  alias ReviewBot.Model.{Attempt, Check}
  alias CMS.Model.DocLifecycle

  @doc """
  Pins configured checks and publication waits to a newly written snapshot.

  `target` must contain `:target_key` and typed `:case_attrs`; `content` must
  contain canonical title/body text, body hash, immutable identity and refs.
  The caller owns the transaction and Lifecycle lock.

  ## Examples

      Submission.register(lifecycle, target, content, configs, command_id)
      #=> {:ok, %{checks: checks, content_token: token}} | {:error, reason}
  """
  @spec register(struct(), map(), map(), [ReviewConfig.t()], Ecto.UUID.t()) ::
          {:ok, %{checks: [Check.t()], content_token: String.t(), lifecycle: struct()}}
          | {:error, term()}
  def register(lifecycle, target, content, configs, operation_ref)
      when is_map(target) and is_map(content) and is_list(configs) and
             is_binary(operation_ref) do
    content_token = content_token(target.target_key, content)

    with true <- Repo.in_transaction?(),
         {:ok, lifecycle} <- CMS.ReviewRestrictions.advance_snapshot(lifecycle, content_token),
         target <- Map.merge(target, %{lifecycle: lifecycle, human_epoch: lifecycle.review_epoch}),
         {:ok, checks} <-
           register_scopes(
             target,
             Map.put(content, :content_token, content_token),
             configs,
             operation_ref
           ) do
      {:ok, %{checks: checks, content_token: content_token, lifecycle: lifecycle}}
    else
      false -> {:error, CMS.ErrorCat.review_transition_requires_transaction()}
      {:error, _reason} = error -> error
      _ -> {:error, CMS.ErrorCat.invalid_review_restriction()}
    end
  end

  def register(_lifecycle, _target, _content, _configs, _operation_ref) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp register_scopes(target, content, configs, operation_ref) do
    configs
    |> Enum.sort_by(& &1.scope_key)
    |> Enum.reduce_while({:ok, []}, fn config, {:ok, checks} ->
      case register_scope(target, content, config, operation_ref) do
        {:ok, scope_checks} -> {:cont, {:ok, checks ++ scope_checks}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
  end

  defp register_scope(target, content, %ReviewConfig{} = config, operation_ref) do
    mode = effective_mode(config, target)

    with {:ok, old_waits} <-
           expire_old_waits(
             target.lifecycle,
             target.target_key,
             config.scope_key,
             content.content_token,
             operation_ref,
             target.lifecycle.review_epoch
           ),
         {:ok, case_record} <-
           maybe_open_submission_case(mode, target, config, content.content_token),
         {:ok, :pass} <-
           apply_submission_wait(
             target.lifecycle,
             config,
             mode,
             content.content_token,
             operation_ref,
             case_record
           ),
         {:ok, %{checks: checks}} <-
           ReviewBot.register_in_transaction(
             Map.merge(target, %{scope_key: config.scope_key, trigger: target.trigger}),
             content,
             config,
             operation_ref
           ),
         {:ok, :pass} <- apply_deterministic_checks(checks, target),
         {:ok, :pass} <-
           enqueue_snapshot_visibility(target.lifecycle, target, config, content) do
      _ = old_waits
      {:ok, checks}
    end
  end

  defp enqueue_snapshot_visibility(%DocLifecycle{}, _target, _config, _content) do
    {:ok, :pass}
  end

  defp enqueue_snapshot_visibility(lifecycle, target, config, content) do
    case CMS.Review.Effects.enqueue(
           lifecycle,
           target.target_key,
           config.scope_key,
           "snapshot:#{content.content_token}",
           target.community_id
         ) do
      {:ok, _event} -> {:ok, :pass}
      {:error, _reason} = error -> error
    end
  end

  defp maybe_open_submission_case(:human_first, target, config, content_token) do
      AlertBoard.open_submission_case(
        target,
        config.scope_key,
        content_token
      )
  end

  defp maybe_open_submission_case(_mode, _target, _config, _content_token) do
    {:ok, nil}
  end

  defp apply_submission_wait(lifecycle, config, mode, content_token, operation_ref, case_record)
       when mode in [:ai_first, :human_first] do
    kind = if mode == :ai_first, do: :awaiting_ai, else: :awaiting_human

    apply_review_restriction(lifecycle, %{
      scope_key: config.scope_key,
      content_token: content_token,
      cause_key: "#{kind}:#{content_token}",
      kind: kind,
      source: :submission,
      case_id: case_record && case_record.id,
      created_by_operation_ref: operation_ref
    })
    |> case do
      {:ok, _restriction} -> {:ok, :pass}
      {:error, _reason} = error -> error
    end
  end

  defp apply_submission_wait(
         _lifecycle,
         _config,
         _mode,
         _content_token,
         _operation_ref,
         _case_record
       ) do
    {:ok, :pass}
  end

  defp apply_review_restriction(
         %CMS.Model.ArticleLifecycle{} = lifecycle,
         attrs
       ) do
    CMS.Articles.Lifecycle.apply_review_restriction(lifecycle, attrs)
  end

  defp apply_review_restriction(
         %CMS.Model.CommentLifecycle{} = lifecycle,
         attrs
       ) do
    CMS.Comments.Lifecycle.apply_review_restriction(lifecycle, attrs)
  end

  defp apply_review_restriction(
         %CMS.Model.DocLifecycle{} = lifecycle,
         attrs
       ) do
    CMS.Docs.Lifecycle.apply_review_restriction(lifecycle, attrs)
  end

  defp apply_review_restriction(_lifecycle, _attrs) do
    {:error, CMS.ErrorCat.invalid_review_restriction()}
  end

  defp expire_old_waits(
         lifecycle,
         target_key,
         scope_key,
         content_token,
         operation_ref,
         human_epoch
       ) do
    with {:ok, :pass} <-
           supersede_stale_work(target_key, scope_key, content_token, human_epoch),
         {:ok, restrictions} <- CMS.ReviewRestrictions.active_for(lifecycle, scope_key) do
      ids =
        restrictions
        |> Enum.filter(fn restriction ->
          restriction.content_token != content_token and
            restriction.kind in [:awaiting_ai, :awaiting_human]
        end)
        |> Enum.map(& &1.id)

      CMS.ReviewRestrictions.end_restrictions(
        lifecycle,
        scope_key,
        ids,
        operation_ref,
        "content_superseded"
      )
      |> case do
        {:ok, :pass} -> {:ok, ids}
        {:error, _reason} = error -> error
      end
    end
  end

  defp supersede_stale_work(target_key, scope_key, content_token, human_epoch) do
    now = DateTime.utc_now(:second)

    stale_checks =
      Check
      |> where(
        [check],
        check.target_key == ^target_key and check.scope_key == ^scope_key and
          (check.content_token != ^content_token or check.human_epoch != ^human_epoch) and
          check.state in [:queued, :running]
      )
      |> select([check], check.id)
      |> Repo.all()

    Repo.update_all(
      from(case_record in Case,
        where:
          case_record.target_key == ^target_key and
            case_record.scope_key == ^scope_key and
            case_record.content_token != ^content_token and case_record.status == :open
      ),
      inc: [version: 1],
      set: [
        status: :superseded,
        resolution: "content_superseded",
        resolved_at: now,
        updated_at: now
      ]
    )

    if stale_checks != [] do
      Repo.update_all(
        from(attempt in Attempt,
          where: attempt.check_id in ^stale_checks and attempt.state == :running
        ),
        set: [state: :abandoned, finished_at: now, updated_at: now]
      )

      Repo.update_all(
        from(check in Check, where: check.id in ^stale_checks),
        set: [state: :superseded, payload: nil, payload_expires_at: nil, updated_at: now]
      )
    end

    {:ok, :pass}
  end

  defp apply_deterministic_checks(checks, target) do
    queued? = Enum.any?(checks, &(&1.state == :queued))

    checks
    |> Enum.filter(fn check ->
      check.state == :completed and (check.result != :pass or not queued?)
    end)
    |> Enum.reduce_while({:ok, :pass}, fn check, {:ok, :pass} ->
      case ReviewBot.apply_completed_check(check, target) do
        {:ok, :pass} -> {:cont, {:ok, :pass}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
  end

  defp effective_mode(%ReviewConfig{edit_mode: mode}, %{trigger: :edit}), do: mode
  defp effective_mode(%ReviewConfig{publish_mode: mode}, _target), do: mode

  defp content_token(target_key, content) do
    identity = Map.get(content, :identity) || Map.get(content, "identity")
    body_hash = Map.get(content, :body_hash) || Map.get(content, "body_hash")
    images = Map.get(content, :images) || Map.get(content, "images") || []

    digest =
      :crypto.hash(
        :sha256,
        :erlang.term_to_binary({target_key, identity, body_hash, image_versions(images)})
      )

    "sha256:" <> Base.encode16(digest, case: :lower)
  end

  defp image_versions(images) when is_list(images) do
    images
    |> Enum.map(fn image ->
      {Map.get(image, :asset_id) || Map.get(image, "asset_id"),
       Map.get(image, :immutable_version) || Map.get(image, "immutable_version")}
    end)
    |> Enum.sort()
  end

  defp image_versions(_images), do: []
end
