defmodule GroupherServer.CMS.Interactions.Reactions.Report do
  @moduledoc """
  Owns the complete Article and Comment report flow.

      CMS.Interactions
        -> Gate canonical Artiment and aggregate MutationLock
        -> AbuseReport embedded fact keyed by immutable reporter user id
        -> Interaction State in the same transaction

  Account reports intentionally remain in `CMS.AbuseReports`; their reported
  meta is a separate account moderation mechanism.
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  import Ecto.Query

  alias GroupherServer.{Accounts, CMS, Repo}

  alias Accounts.Model.User
  alias CMS.{Artiment.Matcher, Gate}
  alias CMS.Comments.States, as: CommentStates

  alias CMS.Interactions.{ErrorCat, Persist, Projection}
  alias CMS.Interactions.Reactions.ReportConfirmation, as: Confirmation
  alias CMS.Model.{AbuseReport, Comment, Embeds}
  alias Helper.T

  @report_threshold_for_fold Comment.report_threshold_for_fold()

  @doc """
  Adds one report fact for the immutable reporter identity.

  ## Examples

      Reactions.Report.add(comment, "spam", %{}, actor, command_id)

  """
  @spec add(struct(), String.t(), term(), User.t(), Ecto.UUID.t()) :: T.domain_res(struct())
  def add(artiment, reason, attrs, %User{} = actor, command_id) do
    execute_add(artiment, reason, attrs, actor, command_id)
  end

  @doc """
  Removes the current reporter's fact idempotently.

  ## Examples

      Reactions.Report.remove(comment, actor, command_id)

  """
  @spec remove(struct(), User.t(), Ecto.UUID.t()) :: T.domain_res(struct())
  def remove(artiment, %User{} = actor, command_id) do
    execute_remove(artiment, actor, command_id)
  end

  @pipeline operation: :report_add,
            confirmation: Confirmation,
            target: :input,
            params: [:reason, :attrs]

  receipt_pipeline execute_add(input, reason, attrs, actor, command_id) do
    gate(fn _input -> Gate.check_interaction_in_transaction(actor, :report, input) end)
    change(fn canonical -> add_report(canonical, reason, attrs, actor) end)
    confirm(&confirmation/1)
    present(fn confirmation -> present_result(confirmation, input) end)
  end

  @pipeline operation: :report_remove,
            confirmation: Confirmation,
            target: :input,
            params: []

  receipt_pipeline execute_remove(input, actor, command_id) do
    gate(fn _input -> Gate.check_interaction_in_transaction(actor, :report, input) end)
    change(fn canonical -> remove_report(canonical, actor) end)
    confirm(&confirmation/1)
    present(fn confirmation -> present_result(confirmation, input) end)
  end

  defp add_report(canonical, reason, attrs, actor) do
    with {:ok, info} <- Matcher.match_interaction(canonical),
         {:ok, report} <- add_fact(info, canonical, reason, attrs, actor),
         {:ok, _projection} <- Projection.add_report(canonical, actor),
         {:ok, _} <- maybe_fold_comment(canonical, report, actor) do
      {:ok, canonical}
    end
  end

  defp remove_report(canonical, actor) do
    with {:ok, info} <- Matcher.match_interaction(canonical),
         {:ok, changed?} <- remove_fact(info, canonical.id, actor),
         {:ok, _} <- maybe_remove_state(canonical, actor, changed?) do
      {:ok, canonical}
    end
  end

  defp confirmation(canonical) do
    with {:ok, target_type} <- target_type(canonical) do
      {:ok,
       %Confirmation{
         data: %{
           "target_id" => to_string(canonical.id),
           "target_type" => target_type
         }
       }}
    end
  end

  defp present_result(%Confirmation{}, input), do: {:ok, input}

  defp target_type(%Comment{}), do: {:ok, "comment"}

  defp target_type(%{__struct__: module}) do
    {:ok, module |> Module.split() |> List.last() |> Macro.underscore()}
  end

  defp target_type(_target), do: {:error, ErrorCat.unsupported_artiment("report target")}

  defp maybe_remove_state(_canonical, _actor, false), do: {:ok, :pass}

  defp maybe_remove_state(canonical, actor, true) do
    case Projection.remove_report(canonical, actor) do
      {:ok, _projection} -> {:ok, :pass}
      {:error, _reason} = error -> error
    end
  end

  defp maybe_fold_comment(%Comment{} = comment, report, _actor)
       when report.report_cases_count >= @report_threshold_for_fold do
    case CommentStates.fold_for_report(comment) do
      {:ok, _comment} -> {:ok, :pass}
      {:error, _reason} = error -> error
    end
  end

  defp maybe_fold_comment(_artiment, _report, _actor), do: {:ok, :pass}

  defp add_fact(info, canonical, reason, attrs, actor) do
    content_id = canonical.id

    with {:ok, report} <- load_report(info, content_id) do
      add_case(report, info, canonical, reason, attrs, actor)
    end
  end

  defp remove_fact(info, content_id, actor) do
    with {:ok, report} <- load_report(info, content_id) do
      remove_case(report, actor)
    end
  end

  defp load_report(info, content_id) do
    from(report in AbuseReport,
      where: field(report, ^info.foreign_key) == ^content_id,
      lock: "FOR UPDATE",
      limit: 2
    )
    |> Repo.all()
    |> case do
      [] -> {:ok, nil}
      [report] -> {:ok, report}
      _ -> {:error, ErrorCat.interaction_state_conflict("multiple AbuseReport facts")}
    end
  end

  defp add_case(nil, info, canonical, reason, attrs, actor) do
    params =
      %{report_cases_count: 1, report_cases: [case_params(reason, attrs, actor)]}
      |> Map.put(info.foreign_key, canonical.id)
      |> maybe_put_community_id(canonical)

    %AbuseReport{}
    |> AbuseReport.changeset(params)
    |> Persist.insert()
  end

  defp add_case(%AbuseReport{} = report, _info, _canonical, reason, attrs, actor) do
    if reported_by?(report, actor.id) do
      {:error, ErrorCat.already_reported("user #{actor.id} already reported")}
    else
      cases = report.report_cases ++ [case_struct(reason, attrs, actor)]

      report
      |> Ecto.Changeset.change(report_cases_count: length(cases))
      |> Ecto.Changeset.put_embed(:report_cases, cases)
      |> Persist.update()
    end
  end

  defp remove_case(nil, _actor), do: {:ok, false}

  defp remove_case(%AbuseReport{} = report, actor) do
    if reported_by?(report, actor.id) do
      cases = Enum.reject(report.report_cases, &(reporter_user_id(&1) == actor.id))

      case cases do
        [] ->
          case Persist.delete(report) do
            {:ok, _report} -> {:ok, true}
            {:error, _changeset} = error -> error
          end

        _ ->
          report
          |> Ecto.Changeset.change(report_cases_count: length(cases))
          |> Ecto.Changeset.put_embed(:report_cases, cases)
          |> Persist.update()
          |> case do
            {:ok, _report} -> {:ok, true}
            {:error, _changeset} = error -> error
          end
      end
    else
      {:ok, false}
    end
  end

  defp reported_by?(report, user_id) do
    Enum.any?(report.report_cases, &(reporter_user_id(&1) == user_id))
  end

  defp reporter_user_id(%{user: %{user_id: user_id}}), do: user_id
  defp reporter_user_id(_case), do: nil

  defp maybe_put_community_id(params, %{community: %{id: community_id}})
       when is_integer(community_id) do
    Map.put(params, :community_id, community_id)
  end

  defp maybe_put_community_id(params, %Comment{community_id: community_id})
       when is_integer(community_id) do
    Map.put(params, :community_id, community_id)
  end

  defp maybe_put_community_id(params, _canonical), do: params

  defp case_params(reason, attrs, actor) do
    %{
      reason: reason,
      attr: attrs,
      user: actor |> Embeds.User.from_account_user() |> Map.from_struct()
    }
  end

  defp case_struct(reason, attrs, actor) do
    user = actor |> Embeds.User.from_account_user() |> Map.from_struct()
    %Embeds.AbuseReportCase{reason: reason, attr: attrs, user: user}
  end
end
