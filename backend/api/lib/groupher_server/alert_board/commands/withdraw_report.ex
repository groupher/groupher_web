defmodule GroupherServer.AlertBoard.Commands.WithdrawReport do
  @moduledoc """
  Withdraws only the caller's report fact and reverses its derived projection.

      report ID + reporter identity
        -> CMS Command Receipt
        -> locked Report fact
        -> withdrawal timestamp + projection decrement
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  import Ecto.Query

  alias GroupherServer.{Accounts, AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{Case, Report}
  alias ReviewBot.Model.Check
  alias Accounts.Model.User
  alias CMS.Model.{Article, ArticleLifecycle, Comment, CommentLifecycle}
  alias CMS.Command.ConfirmationDefinition

  @pipeline operation: :alert_board_withdraw_report,
            access: :user,
            target: :report_id,
            params: [],
            confirmation: __MODULE__.Confirmation

  defmodule Confirmation do
    @moduledoc """
    Recovers the withdrawn report identity after a lost command response.

        withdrawReport Receipt -> Confirmation -> AlertBoard Query
    """

    use ConfirmationDefinition,
      operation: :alert_board_withdraw_report,
      data_keys: ["report_id", "command_id"],
      field_types: %{"report_id" => :integer, "command_id" => :string}
  end

  @doc "Withdraws a report owned by the authenticated actor; repeated requests are safe."
  @spec execute(pos_integer(), User.t(), Ecto.UUID.t()) ::
          {:ok, Report.t()} | {:error, term()}
  def execute(report_id, %User{} = actor, command_id) when is_integer(report_id) do
    execute_pipeline(report_id, actor, command_id)
  end

  def execute(_report_id, _actor, _command_id) do
    {:error, AlertBoard.ErrorCat.report_not_found()}
  end

  receipt_pipeline execute_pipeline(report_id, actor, command_id) do
    prepare(fn -> prepare_report(report_id) end)
    gate(fn prepared -> {:ok, prepared} end)

    change(fn %{report_id: id} ->
      withdraw(%{actor: actor, command_id: command_id}, id)
    end)

    confirm(fn confirmation -> {:ok, confirmation} end)
    present(&present_result/1)
  end

  defp prepare_report(report_id) when is_integer(report_id) and report_id > 0 do
    {:ok, %{report_id: report_id},
     target: {:alert_board_report, report_id}, params: %{"report_id" => report_id}}
  end

  defp prepare_report(_report_id), do: {:error, AlertBoard.ErrorCat.report_not_found()}

  defp present_result(%Confirmation{data: %{"report_id" => id}}) do
    case Repo.get(Report, id) do
      %Report{} = report -> {:ok, report}
      nil -> {:error, AlertBoard.ErrorCat.report_not_found()}
    end
  end

  defp present_result(_result), do: {:error, AlertBoard.ErrorCat.report_not_found()}

  defp withdraw(context, report_id) do
    query =
      from(report in Report,
        where: report.id == ^report_id,
        lock: "FOR UPDATE"
      )

    case Repo.one(query) do
      %Report{reporter_id: reporter_id} = report when reporter_id == context.actor.id ->
        withdraw_owned(report, context.actor, context.command_id)

      %Report{} ->
        {:error, AlertBoard.ErrorCat.report_not_found()}

      nil ->
        {:error, AlertBoard.ErrorCat.report_not_found()}
    end
  end

  defp withdraw_owned(%Report{withdrawn_at: %DateTime{}} = report, _actor, command_id) do
    confirmation(report, command_id)
  end

  defp withdraw_owned(%Report{} = report, actor, command_id) do
    with {:ok, updated} <-
           report
           |> Report.changeset(%{withdrawn_at: DateTime.utc_now(:second)})
           |> Repo.update(),
         {:ok, :pass} <- remove_projection(updated, actor),
         {:ok, lifecycle} <- review_lifecycle(updated),
         {:ok, :pass} <- resolve_case_without_evidence(updated, lifecycle) do
      confirmation(updated, command_id)
    end
  end

  defp review_lifecycle(%Report{target_deleted_at: %DateTime{}}), do: {:ok, nil}

  defp review_lifecycle(%Report{article_id: id}) when is_binary(id) do
    {:ok, Repo.get_by(ArticleLifecycle, article_id: id)}
  end

  defp review_lifecycle(%Report{comment_id: id}) when is_integer(id) do
    {:ok, Repo.get_by(CommentLifecycle, comment_id: id)}
  end

  defp review_lifecycle(_report), do: {:ok, nil}

  defp resolve_case_without_evidence(%Report{case_id: case_id}, lifecycle) do
    case Repo.one(
           from(case_record in Case, where: case_record.id == ^case_id, lock: "FOR UPDATE")
         ) do
      %Case{status: :open} = case_record ->
        with false <- active_reports?(case_record.id),
             {:ok, :pass} <- no_active_restrictions(lifecycle, case_record.scope_key),
             false <- pending_checks?(case_record) do
          case_record
          |> Case.changeset(%{
            status: :resolved,
            resolution: "reports_withdrawn",
            version: case_record.version + 1,
            resolved_at: DateTime.utc_now(:second)
          })
          |> Repo.update()
          |> case do
            {:ok, _resolved} -> {:ok, :pass}
            {:error, _changeset} -> {:error, AlertBoard.ErrorCat.case_version_conflict()}
          end
        else
          true -> {:ok, :pass}
          {:ok, :keep_open} -> {:ok, :pass}
          {:error, _reason} = error -> error
        end

      _ ->
        {:ok, :pass}
    end
  end

  defp active_reports?(case_id) do
    Repo.exists?(
      from(report in Report, where: report.case_id == ^case_id and is_nil(report.withdrawn_at))
    )
  end

  defp no_active_restrictions(%{__struct__: _} = lifecycle, scope_key) do
    case CMS.active_review_restrictions(lifecycle, scope_key) do
      {:ok, []} -> {:ok, :pass}
      {:ok, _restrictions} -> {:ok, :keep_open}
      {:error, _reason} = error -> error
    end
  end

  defp no_active_restrictions(_target, _scope_key), do: {:ok, :pass}

  defp pending_checks?(%Case{} = case_record) do
    Repo.exists?(
      from(check in Check,
        where:
          check.target_key == ^case_record.target_key and
            check.scope_key == ^case_record.scope_key and
            check.content_token == ^case_record.content_token and
            check.state in [:queued, :running]
      )
    )
  end

  defp confirmation(report, command_id) do
    {:ok,
     %Confirmation{
       data: %{"report_id" => report.id, "command_id" => command_id}
     }}
  end

  defp remove_projection(%Report{article_id: id}, actor) when is_binary(id) do
    case Repo.get(Article, id) do
      %Article{} = article -> normalize_projection(CMS.remove_report_projection(article, actor))
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp remove_projection(%Report{comment_id: id}, actor) when is_integer(id) do
    with %Comment{} = comment <- Repo.get(Comment, id),
         {:ok, _projection} <- CMS.remove_report_projection(comment, actor) do
      {:ok, :pass}
    else
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp remove_projection(%Report{user_id: id}, _actor) when is_integer(id) do
    {:ok, :pass}
  end

  defp remove_projection(%Report{target_deleted_at: %DateTime{}}, _actor) do
    {:ok, :pass}
  end

  defp remove_projection(_report, _actor), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp normalize_projection({:ok, _projection}), do: {:ok, :pass}
  defp normalize_projection({:error, _reason} = error), do: error
end
