defmodule GroupherServer.AlertBoard.Persist do
  @moduledoc """
  Persists AlertBoard rows inside the caller-owned CMS transaction.

      Community.Create transaction
        -> AlertBoard.Persist defaults
        -> ReviewConfig rows
        -> commit with Community
  """

  import Ecto.Query

  alias GroupherServer.{AlertBoard, Repo, ReviewBot}
  alias AlertBoard.Model.{Case, Decision, Report, ReviewConfig}
  alias ReviewBot.Model.Check

  @subjects [:article, :comment]

  @doc """
  Creates immediate-mode Article and Comment configs in the caller's Community transaction.

  ## Examples

      create_default_configs_for_community(community.id)
      #=> {:ok, [%ReviewConfig{}, %ReviewConfig{}]} | {:error, reason}
  """
  @spec create_default_configs_for_community(pos_integer()) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  def create_default_configs_for_community(community_id) when is_integer(community_id) do
    Enum.reduce_while(@subjects, {:ok, []}, fn subject_kind, {:ok, configs} ->
      attrs = %{
        scope_key: "community:#{community_id}",
        community_id: community_id,
        subject_kind: subject_kind,
        version: 1,
        publish_mode: :immediate,
        edit_mode: :immediate,
        background_check: false
      }

      case Repo.insert(ReviewConfig.changeset(%ReviewConfig{}, attrs)) do
        {:ok, config} -> {:cont, {:ok, [config | configs]}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> case do
      {:ok, configs} -> {:ok, Enum.reverse(configs)}
      {:error, reason} -> {:error, reason}
    end
  end

  def create_default_configs_for_community(_community_id), do: {:error, :invalid_community_id}

  @doc """
  Opens or recovers the single open Case for one Check target and scope.

  ## Examples

      open_check_case(check, target_context)
      #=> {:ok, %Case{}} | {:error, reason}
  """
  @spec open_check_case(Check.t(), map()) :: {:ok, Case.t()} | {:error, term()}
  def open_check_case(%Check{} = check, %{case_attrs: target_attrs} = target) do
    now = DateTime.utc_now(:second)

    attrs =
      target_attrs
      |> Map.merge(%{
        target_key: target.target_key,
        scope_key: check.scope_key,
        content_token: check.content_token,
        status: :open,
        priority: :normal,
        version: 1,
        opened_at: now
      })

    changeset = Case.changeset(%Case{}, attrs)

    case Repo.insert(changeset, mode: :savepoint) do
      {:ok, case_record} -> {:ok, case_record}
      {:error, changeset} -> recover_open_case(check, changeset)
    end
  end

  def open_check_case(_check, _target) do
    {:error, GroupherServer.AlertBoard.ErrorCat.invalid_target()}
  end

  @doc "Returns an existing open Case for the exact Check snapshot, without creating one."
  @spec open_case_for_check(Check.t()) :: {:ok, Case.t() | nil} | {:error, term()}
  def open_case_for_check(%Check{} = check) do
    case Repo.get_by(Case,
           target_key: check.target_key,
           scope_key: check.scope_key,
           content_token: check.content_token,
           status: :open
         ) do
      %Case{} = case_record -> {:ok, case_record}
      nil -> {:ok, nil}
    end
  end

  def open_case_for_check(_check),
    do: {:error, GroupherServer.AlertBoard.ErrorCat.invalid_target()}

  @doc "Resolves a policy Case after its final restriction clears, unless reports remain active."
  @spec resolve_policy_case(Case.t()) :: {:ok, Case.t() | :kept_open} | {:error, term()}
  def resolve_policy_case(%Case{status: :open} = case_record) do
    active_reports? =
      Repo.exists?(
        from(report in Report,
          where: report.case_id == ^case_record.id and is_nil(report.withdrawn_at)
        )
      )

    if active_reports? do
      {:ok, :kept_open}
    else
      now = DateTime.utc_now(:second)

      case_record
      |> Case.changeset(%{
        status: :resolved,
        resolution: "policy_approved",
        version: case_record.version + 1,
        resolved_at: now
      })
      |> Repo.update()
      |> case do
        {:ok, updated} ->
          {:ok, updated}

        {:error, _changeset} ->
          {:error, GroupherServer.AlertBoard.ErrorCat.case_version_conflict()}
      end
    end
  end

  def resolve_policy_case(_case_record) do
    {:error, GroupherServer.AlertBoard.ErrorCat.case_version_conflict()}
  end

  @doc """
  Opens or recovers the human Case required by a human-first submission.

  A human-first Case exists independently of whether model checks are enabled.

  ## Examples

      open_submission_case(target, "community:12", "revision:abc")
      #=> {:ok, %Case{status: :open}} | {:error, reason}
  """
  @spec open_submission_case(map(), String.t(), String.t()) ::
          {:ok, Case.t()} | {:error, term()}
  def open_submission_case(
        %{case_attrs: target_attrs, target_key: target_key},
        scope_key,
        content_token
      )
      when is_map(target_attrs) and is_binary(target_key) and is_binary(scope_key) and
             is_binary(content_token) do
    now = DateTime.utc_now(:second)

    attrs =
      target_attrs
      |> Map.merge(%{
        target_key: target_key,
        scope_key: scope_key,
        content_token: content_token,
        status: :open,
        priority: :normal,
        version: 1,
        opened_at: now
      })

    case Repo.insert(Case.changeset(%Case{}, attrs), mode: :savepoint) do
      {:ok, case_record} ->
        {:ok, case_record}

      {:error, changeset} ->
        recover_submission_case(target_key, scope_key, content_token, changeset)
    end
  end

  def open_submission_case(_target, _scope_key, _content_token) do
    {:error, GroupherServer.AlertBoard.ErrorCat.invalid_target()}
  end

  @doc """
  Appends one idempotent policy Decision for a Check result.

  ## Examples

      record_policy_decision(check, case_record, :restrict, restriction_ids)
      #=> {:ok, %Decision{}} | {:error, reason}
  """
  @spec record_policy_decision(Check.t(), Case.t() | nil, :approve | :restrict, [integer()]) ::
          {:ok, Decision.t()} | {:error, term()}
  def record_policy_decision(%Check{} = check, case_record, action, restriction_ids)
      when action in [:approve, :restrict] and is_list(restriction_ids) do
    attrs = %{
      case_id: case_record && case_record.id,
      target_key: check.target_key,
      scope_key: check.scope_key,
      content_token: check.content_token,
      action: action,
      source: :policy,
      check_id: check.id,
      restriction_ids: restriction_ids,
      operation_ref: check.operation_ref
    }

    changeset = Decision.changeset(%Decision{}, attrs)

    case Repo.insert(changeset, mode: :savepoint) do
      {:ok, decision} -> {:ok, decision}
      {:error, changeset} -> recover_policy_decision(check, changeset)
    end
  end

  def record_policy_decision(_check, _case, _action, _restriction_ids) do
    {:error, GroupherServer.AlertBoard.ErrorCat.decision_conflict()}
  end

  defp recover_open_case(check, changeset) do
    query =
      from(case_record in Case,
        where:
          case_record.target_key == ^check.target_key and
            case_record.scope_key == ^check.scope_key and
            case_record.content_token == ^check.content_token and case_record.status == :open
      )

    case Repo.one(query) do
      %Case{} = case_record -> {:ok, case_record}
      nil -> {:error, changeset}
    end
  end

  defp recover_submission_case(target_key, scope_key, content_token, changeset) do
    case Repo.get_by(Case,
           target_key: target_key,
           scope_key: scope_key,
           content_token: content_token,
           status: :open
         ) do
      %Case{} = case_record -> {:ok, case_record}
      nil -> {:error, changeset}
    end
  end

  defp recover_policy_decision(check, changeset) do
    case Repo.get_by(Decision, operation_ref: check.operation_ref) do
      %Decision{} = decision -> {:ok, decision}
      nil -> {:error, changeset}
    end
  end
end
