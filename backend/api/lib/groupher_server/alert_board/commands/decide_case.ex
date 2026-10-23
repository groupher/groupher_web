defmodule GroupherServer.AlertBoard.Commands.DecideCase do
  @moduledoc """
  Applies one authorized human decision to an open Case and its canonical target.

      Case pre-read -> resource Lifecycle lock -> Case lock
        -> restriction transition -> immutable Decision -> Case resolution
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Authorization
  alias AlertBoard.Model.{Case, Decision}
  alias CMS.Model.{Article, Comment, Community}
  alias CMS.Command.ConfirmationDefinition

  defmodule Confirmation do
    @moduledoc """
    Recovers the immutable decision identity after a lost response.

        decideReviewCase Receipt -> Confirmation -> AlertBoard decision lookup
    """

    use ConfirmationDefinition,
      operation: :alert_board_decide_case,
      data_keys: ["decision_id", "case_id", "case_version"],
      field_types: %{"decision_id" => :integer, "case_id" => :integer, "case_version" => :integer}
  end

  @actions [:approve, :restrict, :release, :dismiss, :record_handled]

  @pipeline operation: :alert_board_decide_case,
            access: :user,
            target: :case_id,
            params: [:attrs],
            confirmation: Confirmation

  @doc "Applies a version-checked human decision through the shared Command Receipt boundary."
  @spec execute(pos_integer(), map(), struct(), Ecto.UUID.t()) ::
          {:ok, Decision.t()} | {:error, term()}
  def execute(case_id, attrs, actor, command_id)
      when is_integer(case_id) and case_id > 0 and is_map(attrs) and is_binary(command_id) do
    execute_pipeline(case_id, attrs, actor, command_id)
  end

  def execute(_case_id, _attrs, _actor, _command_id) do
    {:error, AlertBoard.ErrorCat.invalid_target()}
  end

  receipt_pipeline execute_pipeline(case_id, attrs, actor, command_id) do
    prepare(fn -> prepare(case_id, attrs) end)
    gate(fn prepared -> authorize(prepared, actor) end)

    change(fn prepared ->
      context = %{actor: actor, command_id: command_id}
      persist(context, prepared.attrs, prepared.case_record)
    end)

    confirm(fn confirmation -> {:ok, confirmation} end)
    present(&present_result/1)
  end

  defp prepare(case_id, attrs) do
    case Repo.get(Case, case_id) do
      %Case{} = case_record ->
        {:ok, %{case_record: case_record, attrs: attrs},
         target: command_target(case_record),
         params: stringify_attrs(Map.put(attrs, :case_id, case_id))}

      nil ->
        {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp authorize(%{case_record: case_record} = prepared, actor) do
    with {:ok, :pass} <-
           Authorization.authorize(scope(case_record), decide_action(case_record), actor) do
      {:ok, prepared}
    end
  end

  defp persist(context, attrs, case_snapshot) do
    case_id = case_snapshot.id
    action = normalize_action(Map.get(attrs, :action) || Map.get(attrs, "action"))

    expected_version =
      Map.get(attrs, :expected_case_version) || Map.get(attrs, "expected_case_version")

    expected_token =
      Map.get(attrs, :expected_content_token) || Map.get(attrs, "expected_content_token")

    restriction_ids = Map.get(attrs, :restriction_ids) || Map.get(attrs, "restriction_ids") || []
    reason_code = Map.get(attrs, :reason_code) || Map.get(attrs, "reason_code")
    note = Map.get(attrs, :note) || Map.get(attrs, "note")

    with {:ok, :pass} <-
           validate_decision(
             action,
             expected_version,
             expected_token,
             restriction_ids,
             reason_code,
             note
           ),
         {:ok, target} <- lock_target(case_snapshot),
         %Case{} = case_record <- lock_case(case_id),
         {:ok, :pass} <- ensure_case_snapshot(case_record, expected_version, expected_token),
         {:ok, :pass} <- ensure_target_snapshot(target, case_record),
         {:ok, :pass} <- authorize_current(context.actor, case_record, target),
         {:ok, active} <- active_restrictions(target, case_record),
         {:ok, :pass} <-
           validate_action_target(action, case_record, target, active, restriction_ids),
         {:ok, :pass} <-
           supersede_pending_checks(action, case_record, active, restriction_ids),
         {:ok, ended_ids, added_ids} <-
           apply_action(action, case_record, target, active, restriction_ids, context.command_id),
         {:ok, decision} <-
           insert_decision(
             context,
             case_record,
             action,
             ended_ids ++ added_ids,
             reason_code,
             note
           ),
         {:ok, updated_case} <- update_case(case_record, action, active, ended_ids) do
      {:ok,
       %Confirmation{
         data: %{
           "decision_id" => decision.id,
           "case_id" => updated_case.id,
           "case_version" => updated_case.version
         }
       }}
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.decision_conflict()}
    end
  end

  defp lock_case(case_id) do
    Repo.one(from(case_record in Case, where: case_record.id == ^case_id, lock: "FOR UPDATE"))
  end

  defp lock_target(%Case{user_id: user_id}) when is_integer(user_id) do
    case Repo.one(
           from(user in GroupherServer.Accounts.Model.User,
             where: user.id == ^user_id,
             lock: "FOR UPDATE"
           )
         ) do
      %GroupherServer.Accounts.Model.User{} -> {:ok, :account_case}
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp lock_target(%Case{target_key: target_key, scope_key: scope_key}) do
    CMS.load_review_target_for_update(target_key, scope_key)
  end

  defp authorize_current(actor, case_record, target) do
    with {:ok, :pass} <-
           Authorization.authorize(scope(case_record), decide_action(case_record), actor),
         {:ok, :pass} <- reject_self_decision(actor, case_record, target) do
      {:ok, :pass}
    end
  end

  defp reject_self_decision(actor, %Case{user_id: user_id}, :account_case)
       when is_integer(user_id) do
    if actor.id == user_id do
      {:error, AlertBoard.ErrorCat.self_review_forbidden()}
    else
      {:ok, :pass}
    end
  end

  defp reject_self_decision(actor, _case_record, %{target: %Article{} = article}) do
    article = Repo.preload(article, author: :user)

    if article.author && article.author.user_id == actor.id do
      {:error, AlertBoard.ErrorCat.self_review_forbidden()}
    else
      {:ok, :pass}
    end
  end

  defp reject_self_decision(actor, _case_record, %{target: %Comment{author_id: author_id}}) do
    if author_id == actor.id do
      {:error, AlertBoard.ErrorCat.self_review_forbidden()}
    else
      {:ok, :pass}
    end
  end

  defp reject_self_decision(_actor, _case_record, _target), do: {:ok, :pass}

  defp active_restrictions(_target, %Case{user_id: user_id}) when is_integer(user_id) do
    {:ok, []}
  end

  defp active_restrictions(%{lifecycle: lifecycle}, %Case{scope_key: scope_key}) do
    CMS.active_review_restrictions(lifecycle, scope_key)
  end

  defp validate_action_target(:record_handled, %Case{user_id: user_id}, _target, _active, _ids)
       when is_integer(user_id) do
    {:ok, :pass}
  end

  defp validate_action_target(:dismiss, %Case{user_id: user_id}, _target, _active, _ids)
       when is_integer(user_id) do
    {:ok, :pass}
  end

  defp validate_action_target(action, %Case{user_id: user_id}, _target, _active, _ids)
       when is_integer(user_id) and action not in [:dismiss, :record_handled] do
    {:error, AlertBoard.ErrorCat.unsupported_review_action()}
  end

  defp validate_action_target(:record_handled, _case_record, _target, _active, _ids) do
    {:error, AlertBoard.ErrorCat.unsupported_review_action()}
  end

  defp validate_action_target(:approve, %Case{content_token: token}, _target, active, ids) do
    selected = Enum.filter(active, &(&1.id in ids))
    ids = Enum.uniq(ids)

    valid? =
      ids != [] and length(selected) == length(ids) and
        Enum.all?(selected, fn restriction ->
          restriction.content_token == token and restriction.kind != :manual_hold
        end)

    if valid? do
      {:ok, :pass}
    else
      {:error, AlertBoard.ErrorCat.restriction_scope_mismatch()}
    end
  end

  defp validate_action_target(:release, _case_record, _target, active, ids) do
    selected = Enum.filter(active, &(&1.id in ids))
    ids = Enum.uniq(ids)

    if ids != [] and length(selected) == length(ids) and
         Enum.all?(selected, fn restriction ->
           restriction.kind == :manual_hold or
             (restriction.kind == :rule_hit and restriction.source == :policy)
         end) do
      {:ok, :pass}
    else
      {:error, AlertBoard.ErrorCat.restriction_scope_mismatch()}
    end
  end

  defp validate_action_target(:dismiss, _case_record, _target, active, _ids) do
    if active != [] do
      {:error, AlertBoard.ErrorCat.unsupported_review_action()}
    else
      {:ok, :pass}
    end
  end

  defp validate_action_target(action, _case_record, _target, _active, _ids)
       when action == :restrict do
    {:ok, :pass}
  end

  defp validate_action_target(_action, _case_record, _target, _active, _ids) do
    {:error, AlertBoard.ErrorCat.unsupported_review_action()}
  end

  defp apply_action(action, _case_record, _target, _active, _ids, _command_id)
       when action in [:dismiss, :record_handled] do
    {:ok, [], []}
  end

  defp apply_action(action, case_record, target, _active, ids, command_id)
       when action in [:approve, :release] do
    reason = if action == :approve, do: "approved", else: "released"

    with {:ok, :pass} <-
           CMS.end_review_restrictions(
             target.lifecycle,
             case_record.scope_key,
             Enum.sort(ids),
             command_id,
             reason
           ) do
      {:ok, Enum.sort(ids), []}
    end
  end

  defp apply_action(:restrict, case_record, target, active, _ids, command_id) do
    wait_ids =
      active
      |> Enum.filter(fn restriction ->
        restriction.kind in [:awaiting_ai, :awaiting_human] and
          restriction.content_token == case_record.content_token
      end)
      |> Enum.map(& &1.id)

    with {:ok, :pass} <-
           CMS.end_review_restrictions(
             target.lifecycle,
             case_record.scope_key,
             wait_ids,
             command_id,
             "human_restriction_decided"
           ),
         {:ok, restriction} <-
           CMS.apply_review_restriction(target.lifecycle, %{
             scope_key: case_record.scope_key,
             content_token: case_record.content_token,
             cause_key: "decision:#{command_id}",
             kind: :manual_hold,
             source: :human,
             case_id: case_record.id,
             created_by_operation_ref: command_id
           }) do
      {:ok, wait_ids, [restriction.id]}
    end
  end

  defp supersede_pending_checks(:approve, %Case{} = case_record, active, restriction_ids) do
    resolves_ai_wait? =
      Enum.any?(active, fn restriction ->
        restriction.id in restriction_ids and
          restriction.kind in [:awaiting_ai, :awaiting_human]
      end)

    if resolves_ai_wait? do
      ReviewBot.supersede_in_flight_checks(case_record.target_key, case_record.scope_key)
    else
      {:ok, :pass}
    end
  end

  defp supersede_pending_checks(:restrict, %Case{} = case_record, _active, _restriction_ids) do
    ReviewBot.supersede_in_flight_checks(case_record.target_key, case_record.scope_key)
  end

  defp supersede_pending_checks(_action, _case_record, _active, _restriction_ids) do
    {:ok, :pass}
  end

  defp insert_decision(context, case_record, action, restriction_ids, reason_code, note) do
    attrs = %{
      case_id: case_record.id,
      target_key: case_record.target_key,
      scope_key: case_record.scope_key,
      content_token: case_record.content_token,
      action: action,
      source: :human,
      actor_id: context.actor.id,
      restriction_ids: restriction_ids,
      reason_code: reason_code,
      note: note,
      operation_ref: context.command_id,
      expected_case_version: case_record.version
    }

    Repo.insert(Decision.changeset(%Decision{}, attrs))
  end

  defp update_case(case_record, action, active, ended_ids) do
    remaining = Enum.reject(active, &(&1.id in ended_ids))
    terminal? = action in [:dismiss, :record_handled] or (action != :restrict and remaining == [])
    status = if terminal?, do: :resolved, else: :open
    resolution = Atom.to_string(action)
    now = DateTime.utc_now(:second)

    case_record
    |> Case.changeset(%{
      status: status,
      resolution: resolution,
      version: case_record.version + 1,
      resolved_at: if(terminal?, do: now, else: nil)
    })
    |> Repo.update()
    |> case do
      {:ok, updated} -> {:ok, updated}
      {:error, _changeset} -> {:error, AlertBoard.ErrorCat.case_version_conflict()}
    end
  end

  defp ensure_case_snapshot(%Case{status: :open} = case_record, version, token) do
    if case_record.version == version and case_record.content_token == token do
      {:ok, :pass}
    else
      {:error, AlertBoard.ErrorCat.case_version_conflict()}
    end
  end

  defp ensure_case_snapshot(_case_record, _version, _token) do
    {:error, AlertBoard.ErrorCat.case_version_conflict()}
  end

  defp ensure_target_snapshot(%{lifecycle: %{review_content_token: token}}, %Case{
         content_token: token
       }) do
    {:ok, :pass}
  end

  defp ensure_target_snapshot(:account_case, %Case{user_id: user_id, content_token: token})
       when is_integer(user_id) do
    if token == "user:#{user_id}" do
      {:ok, :pass}
    else
      {:error, AlertBoard.ErrorCat.content_token_changed()}
    end
  end

  defp ensure_target_snapshot(_target, _case_record) do
    {:error, AlertBoard.ErrorCat.content_token_changed()}
  end

  defp validate_decision(action, version, token, ids, reason_code, note) do
    cond do
      action not in @actions ->
        {:error, AlertBoard.ErrorCat.unsupported_review_action()}

      not (is_integer(version) and version > 0) ->
        {:error, AlertBoard.ErrorCat.case_version_conflict()}

      not (is_binary(token) and token != "") ->
        {:error, AlertBoard.ErrorCat.content_token_changed()}

      not is_list(ids) or not Enum.all?(ids, &(is_integer(&1) and &1 > 0)) ->
        {:error, AlertBoard.ErrorCat.restriction_scope_mismatch()}

      action == :record_handled and not (is_binary(note) and String.trim(note) != "") ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      not (is_binary(reason_code) and String.trim(reason_code) != "") ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      action == :record_handled and not (is_binary(note) and String.trim(note) != "") ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      is_binary(note) and String.length(note) > 4_000 ->
        {:error, AlertBoard.ErrorCat.review_config_invalid()}

      true ->
        {:ok, :pass}
    end
  end

  defp present_result(%Confirmation{data: %{"decision_id" => id}}) do
    case Repo.get(Decision, id) do
      %Decision{} = decision -> {:ok, decision}
      nil -> {:error, AlertBoard.ErrorCat.decision_conflict()}
    end
  end

  defp present_result(_), do: {:error, AlertBoard.ErrorCat.decision_conflict()}
  defp normalize_action(action) when action in @actions, do: action

  defp normalize_action(action) when is_binary(action) do
    candidate = String.downcase(action)
    Enum.find(@actions, &(Atom.to_string(&1) == candidate))
  end

  defp normalize_action(_), do: nil
  defp scope(%Case{scope_key: "platform"}), do: %{kind: :platform}

  defp scope(%Case{scope_key: "community:" <> id}) do
    with {community_id, ""} <- Integer.parse(id),
         %Community{} = community <- Repo.get(Community, community_id) do
      %{kind: :community, community: community}
    else
      _ -> %{kind: :invalid}
    end
  end

  defp decide_action(%Case{scope_key: "platform"}), do: "review.platform.decide"
  defp decide_action(_case_record), do: "review.decide"
  defp stringify_attrs(attrs), do: Map.new(attrs, fn {key, value} -> {to_string(key), value} end)

  defp command_target(%Case{article_id: article_id, branch_id: branch_id})
       when is_binary(article_id) and is_integer(branch_id) do
    {:doc, "#{article_id}:#{branch_id}"}
  end

  defp command_target(%Case{article_id: article_id}) when is_binary(article_id) do
    {:article, article_id}
  end

  defp command_target(%Case{comment_id: comment_id}) when is_integer(comment_id) do
    {:comment, comment_id}
  end

  defp command_target(%Case{user_id: user_id}) when is_integer(user_id) do
    {:user, user_id}
  end
end
