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

  alias GroupherServer.{Accounts, CMS, Repo}
  alias GroupherServer.AlertBoard
  alias AlertBoard.Model.Report
  alias Accounts.Model.User
  alias CMS.Model.{Article, Comment}
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
         {:ok, :pass} <- remove_projection(updated, actor) do
      confirmation(updated, command_id)
    end
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

  defp remove_projection(_report, _actor), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp normalize_projection({:ok, _projection}), do: {:ok, :pass}
  defp normalize_projection({:error, _reason} = error), do: error
end
