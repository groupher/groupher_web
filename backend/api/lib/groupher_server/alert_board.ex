defmodule GroupherServer.AlertBoard do
  @moduledoc """
  Public context boundary for review cases, reports and configuration.

      GraphQL / CMS command
        -> AlertBoard facade
        -> Query / Persist / Commands
        -> AlertBoard tables
  """

  alias __MODULE__.{Authorization, ErrorCat, Persist, Query}
  alias GroupherServer.ReviewBot
  alias __MODULE__.Model.{Case, Decision, ReviewConfig}
  alias ReviewBot.Model.Check

  @doc "Reads one authorized review configuration for the supplied scope."
  @spec review_config(map(), atom(), struct()) :: {:ok, ReviewConfig.t()} | {:error, term()}
  defdelegate review_config(scope, subject_kind, actor), to: Query

  @doc "Lists Cases after exact-scope authorization and before pagination."
  @spec list_cases(map(), map(), term(), struct()) :: {:ok, map()} | {:error, term()}
  defdelegate list_cases(scope, filter, pagi, actor), to: Query

  @doc "Loads one authorized Case with reports, decisions, signals, and restrictions."
  @spec get_case(map(), pos_integer(), struct()) :: {:ok, map()} | {:error, term()}
  defdelegate get_case(scope, case_id, actor), to: Query

  @doc """
  Returns the current, Gate-derived review projection for one canonical Article or Comment.

  ## Examples

      AlertBoard.content_review(%{kind: :article, resource: article}, community, actor)
      #=> {:ok, %{status: :public, can_edit: true, can_request_review: false}} | {:error, reason}
  """
  @spec content_review(map(), GroupherServer.CMS.Model.Community.t(), struct() | nil) ::
          {:ok, map()} | {:error, term()}
  defdelegate content_review(target, community, actor), to: Query

  @doc "Returns the AlertBoard invalid-target error at the public context boundary."
  @spec invalid_target() :: struct()
  defdelegate invalid_target(), to: ErrorCat

  @doc "Returns the AlertBoard target-not-readable error at the public context boundary."
  @spec target_not_readable() :: struct()
  defdelegate target_not_readable(), to: ErrorCat

  @doc "Returns the AlertBoard invalid-configuration error at the public context boundary."
  @spec review_config_invalid() :: struct()
  defdelegate review_config_invalid(), to: ErrorCat

  @doc "Returns the missing review-configuration error at the public context boundary."
  @spec review_config_not_found() :: struct()
  defdelegate review_config_not_found(), to: ErrorCat

  @doc """
  Reads the configured platform/community policies for an Article, Comment or platform Doc.

  ## Examples

      configs_for_target(community_id, :comment)
      #=> {:ok, [platform_config, community_config]} | {:error, reason}
  """
  @spec configs_for_target(pos_integer() | nil, atom()) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  defdelegate configs_for_target(community_id, subject_kind), to: Query

  @doc "Returns platform and Community policies for the supplied bound communities."
  @spec configs_for_targets([pos_integer()], :article | :comment | :doc) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  defdelegate configs_for_targets(community_ids, subject_kind), to: Query

  @doc """
  Creates immediate-mode Article and Comment defaults inside the Community create transaction.

  ## Examples

      create_default_configs_for_community(community.id)
      #=> {:ok, configs} | {:error, reason}
  """
  @spec create_default_configs_for_community(pos_integer()) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  defdelegate create_default_configs_for_community(community_id), to: Persist

  @doc """
  Opens or recovers the human Case required by a completed Check.

  ## Examples

      AlertBoard.open_check_case(check, locked_target)
      #=> {:ok, %Case{}} | {:error, reason}
  """
  @spec open_check_case(Check.t(), map()) :: {:ok, Case.t()} | {:error, term()}
  defdelegate open_check_case(check, target), to: Persist

  @doc "Returns an existing open Case for the exact Check snapshot without creating one."
  @spec open_case_for_check(Check.t()) :: {:ok, Case.t() | nil} | {:error, term()}
  defdelegate open_case_for_check(check), to: Persist

  @doc "Resolves a policy Case after its final restriction clears, unless active reports remain."
  @spec resolve_policy_case(Case.t()) :: {:ok, Case.t() | :kept_open} | {:error, term()}
  defdelegate resolve_policy_case(case_record), to: Persist

  @doc """
  Opens the initial human Case for a human-first content submission.

  ## Examples

      AlertBoard.open_submission_case(target, "platform", content_token)
      #=> {:ok, %Case{}} | {:error, reason}
  """
  @spec open_submission_case(map(), String.t(), String.t()) ::
          {:ok, Case.t()} | {:error, term()}
  defdelegate open_submission_case(target, scope_key, content_token), to: Persist

  @doc """
  Records the idempotent policy Decision for an applied Check result.

  ## Examples

      AlertBoard.record_policy_decision(check, case_record, :approve, ended_restriction_ids)
      #=> {:ok, %Decision{}} | {:error, reason}
  """
  @spec record_policy_decision(Check.t(), Case.t() | nil, :approve | :restrict, [integer()]) ::
          {:ok, Decision.t()} | {:error, term()}
  defdelegate record_policy_decision(check, case_record, action, restriction_ids), to: Persist

  @doc """
  Returns the active report submitted by the current actor for a target.

  ## Examples

      viewer_report(%{target_key: "article:<uuid>"}, actor)
      #=> {:ok, report_or_nil} | {:error, reason}
  """
  @spec viewer_report(map(), struct() | nil) :: {:ok, term()} | {:error, term()}
  defdelegate viewer_report(target, actor), to: Query

  @doc """
  Lists the authenticated actor's active reports, independent of target visibility.

  ## Examples

      AlertBoard.my_reports(nil, actor)
      #=> {:ok, %{entries: reports, page_info: info}} | {:error, reason}
  """
  @spec my_reports(term(), struct()) :: {:ok, map()} | {:error, term()}
  defdelegate my_reports(pagi, actor), to: Query

  @doc "Counts active AlertBoard reports filed against one account."
  @spec reported_count(pos_integer()) :: {:ok, non_neg_integer()} | {:error, term()}
  defdelegate reported_count(user_id), to: Query

  @doc "Submits a caller-owned report through the new AlertBoard fact boundary."
  @spec submit_report(map(), String.t(), String.t() | nil, struct(), Ecto.UUID.t()) ::
          {:ok, GroupherServer.AlertBoard.Model.Report.t()} | {:error, term()}
  defdelegate submit_report(target, reason_code, details, actor, command_id),
    to: GroupherServer.AlertBoard.Commands.SubmitReport,
    as: :execute

  @doc "Withdraws the caller's report without resolving or erasing its review Case."
  @spec withdraw_report(pos_integer(), struct(), Ecto.UUID.t()) ::
          {:ok, GroupherServer.AlertBoard.Model.Report.t()} | {:error, term()}
  defdelegate withdraw_report(report_id, actor, command_id),
    to: GroupherServer.AlertBoard.Commands.WithdrawReport,
    as: :execute

  @doc "Updates an authorized policy using optimistic version control and immutable RuleSets."
  @spec update_config(map(), atom(), pos_integer(), map(), struct(), Ecto.UUID.t()) ::
          {:ok, ReviewConfig.t()} | {:error, term()}
  defdelegate update_config(scope, subject_kind, expected_version, attrs, actor, command_id),
    to: GroupherServer.AlertBoard.Commands.UpdateConfig,
    as: :execute

  @doc "Applies a version-checked human decision to a Case through the shared receipt boundary."
  @spec decide_case(pos_integer(), map(), struct(), Ecto.UUID.t()) ::
          {:ok, Decision.t()} | {:error, term()}
  defdelegate decide_case(case_id, attrs, actor, command_id),
    to: GroupherServer.AlertBoard.Commands.DecideCase,
    as: :execute

  @doc "Rechecks one current Article or Comment snapshot under the latest authorized policy."
  @spec recheck(map(), map(), struct(), Ecto.UUID.t()) ::
          {:ok, [Check.t()]} | {:error, term()}
  defdelegate recheck(target, scope, actor, command_id),
    to: GroupherServer.AlertBoard.Commands.RecheckTarget,
    as: :execute

  @doc "Authorizes one platform or community Board action through Passport."
  @spec authorize(map(), String.t(), struct()) :: {:ok, :pass} | {:error, term()}
  defdelegate authorize(scope, action, actor), to: Authorization

  @doc """
  Builds the visibility transition plan for one completed ReviewBot Check.

  ## Examples

      AlertBoard.review_check(check, active_restrictions)
      #=> %{action: :pass | :review | :restrict, add_restrictions: [], end_restriction_ids: []}
  """
  @spec review_check(Check.t(), [map()]) :: map()
  defdelegate review_check(check, active_restrictions), to: GroupherServer.AlertBoard.Policy
end
