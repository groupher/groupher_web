defmodule GroupherServer.AlertBoard.Commands.SubmitReport do
  @moduledoc """
  Records one new AlertBoard report fact and its derived Interaction projection.

      authenticated report intent
        -> CMS Command Receipt
        -> AlertBoard Case + Report
        -> Interaction projection
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{Accounts, CMS, Repo}
  alias GroupherServer.AlertBoard
  alias AlertBoard.Model.Report
  alias Accounts.Model.User
  alias CMS.Model.{Article, ArticleLifecycle, Author, Comment, CommentLifecycle}
  alias CMS.Command.ConfirmationDefinition

  defmodule Confirmation do
    @moduledoc """
    Recovers the submitted report identity after a lost command response.

        submitReport Receipt -> Confirmation -> AlertBoard Query
    """

    use ConfirmationDefinition,
      operation: :alert_board_submit_report,
      data_keys: ["report_id", "target_key", "command_id"],
      field_types: %{"report_id" => :integer, "target_key" => :string, "command_id" => :string}
  end

  @reason_codes ~w(SPAM HARASSMENT ILLEGAL_CONTENT IMPERSONATION OTHER)

  @pipeline operation: :alert_board_submit_report,
            access: :user,
            target: :target,
            params: [:reason_code, :details],
            confirmation: Confirmation

  @doc "Submits a report about a canonical loaded Article, Comment, or User."
  @spec execute(map(), String.t(), String.t() | nil, User.t(), Ecto.UUID.t()) ::
          {:ok, Report.t()} | {:error, term()}
  def execute(target, reason_code, details, %User{} = actor, command_id)
      when is_map(target) and is_binary(reason_code) do
    execute_pipeline(target, reason_code, details, actor, command_id)
  end

  def execute(_target, _reason_code, _details, _actor, _command_id) do
    {:error, AlertBoard.ErrorCat.invalid_target()}
  end

  receipt_pipeline execute_pipeline(target, reason_code, details, actor, command_id) do
    prepare(fn -> prepare(target, reason_code, details) end)
    gate(fn prepared -> {:ok, prepared} end)

    change(fn prepared ->
      context = %{actor: actor, command_id: command_id}
      persist(context, prepared.target, reason_code, details)
    end)

    confirm(fn confirmation -> {:ok, confirmation} end)
    present(&present_result/1)
  end

  defp prepare(target, reason_code, details) do
    with {:ok, normalized} <- normalize_target(target),
         {:ok, :pass} <- validate_reason(reason_code, details) do
      {:ok, %{target: normalized},
       target: normalized.resource,
       params: %{
         "target_key" => normalized.target_key,
         "reason_code" => reason_code,
         "details" => details || ""
       }}
    end
  end

  defp present_result(%Confirmation{data: %{"report_id" => report_id}}) do
    case Repo.get(Report, report_id) do
      %Report{} = report -> {:ok, report}
      nil -> {:error, AlertBoard.ErrorCat.report_not_found()}
    end
  end

  defp present_result(_result), do: {:error, AlertBoard.ErrorCat.report_not_found()}

  defp persist(context, target, reason_code, details) do
    actor = context.actor
    operation_ref = context.command_id

    with {:ok, :pass} <- reject_self_report(target, actor),
         {:ok, case_record} <-
           AlertBoard.Persist.open_submission_case(
             %{target_key: target.target_key, case_attrs: target.case_attrs},
             target.scope_key,
             target.content_token
           ),
         {:ok, report} <-
           Repo.insert(
             Report.changeset(%Report{}, %{
               target_key: target.target_key,
               article_id: target.article_id,
               comment_id: target.comment_id,
               user_id: target.user_id,
               scope_key: target.scope_key,
               content_token: target.content_token,
               reporter_id: actor.id,
               case_id: case_record.id,
               reason_code: reason_code,
               details: details,
               operation_ref: operation_ref
             }),
             mode: :savepoint
           ),
         {:ok, _projection} <- add_projection(target.resource, actor) do
      {:ok,
       %Confirmation{
         data: %{
           "report_id" => report.id,
           "target_key" => target.target_key,
           "command_id" => operation_ref
         }
       }}
    else
      {:error, %Ecto.Changeset{} = changeset} ->
        if active_report_conflict?(changeset) do
          {:error, AlertBoard.ErrorCat.report_already_active()}
        else
          {:error, changeset}
        end

      {:error, _reason} = error ->
        error
    end
  end

  defp normalize_target(%{resource: %Article{} = article, community_id: community_id})
       when is_integer(community_id) do
    case Repo.get_by(ArticleLifecycle, article_id: article.id) do
      %ArticleLifecycle{review_content_token: token} when is_binary(token) ->
        {:ok,
         %{
           resource: article,
           target_key: "article:#{article.id}",
           content_token: token,
           scope_key: "community:#{community_id}",
           article_id: article.id,
           comment_id: nil,
           user_id: nil,
           case_attrs: %{article_id: article.id}
         }}

      _ ->
        {:error, AlertBoard.ErrorCat.target_not_readable()}
    end
  end

  defp normalize_target(%{resource: %Comment{} = comment}) do
    case Repo.get_by(CommentLifecycle, comment_id: comment.id) do
      %CommentLifecycle{review_content_token: token} when is_binary(token) ->
        {:ok,
         %{
           resource: comment,
           target_key: "comment:#{comment.id}",
           content_token: token,
           scope_key: "community:#{comment.community_id}",
           article_id: nil,
           comment_id: comment.id,
           user_id: nil,
           case_attrs: %{comment_id: comment.id}
         }}

      _ ->
        {:error, AlertBoard.ErrorCat.target_not_readable()}
    end
  end

  defp normalize_target(%{resource: %User{} = user}) do
    {:ok,
     %{
       resource: user,
       target_key: "user:#{user.id}",
       content_token: "user:#{user.id}",
       scope_key: "platform",
       article_id: nil,
       comment_id: nil,
       user_id: user.id,
       case_attrs: %{user_id: user.id}
     }}
  end

  defp normalize_target(_target), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  defp validate_reason(reason_code, details) do
    cond do
      reason_code not in @reason_codes ->
        {:error, AlertBoard.ErrorCat.invalid_target()}

      reason_code == "OTHER" and not non_empty_details?(details) ->
        {:error, AlertBoard.ErrorCat.invalid_target()}

      is_binary(details) and String.length(details) <= 2_000 ->
        {:ok, :pass}

      is_nil(details) ->
        {:ok, :pass}

      true ->
        {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  defp non_empty_details?(value), do: is_binary(value) and String.trim(value) != ""

  defp reject_self_report(%{user_id: user_id}, %User{id: user_id}) do
    {:error, AlertBoard.ErrorCat.self_report()}
  end

  defp reject_self_report(%{resource: %Article{author_id: author_id}}, %User{id: actor_id}) do
    case Repo.get(Author, author_id) do
      %Author{user_id: ^actor_id} -> {:error, AlertBoard.ErrorCat.self_report()}
      _ -> {:ok, :pass}
    end
  end

  defp reject_self_report(
         %{resource: %Comment{author_id: author_id}},
         %User{id: reporter_id}
       )
       when author_id == reporter_id do
    {:error, AlertBoard.ErrorCat.self_report()}
  end

  defp reject_self_report(_target, _actor), do: {:ok, :pass}

  defp add_projection(%Article{} = article, actor) do
    CMS.add_report_projection(article, actor)
  end

  defp add_projection(%Comment{} = comment, actor) do
    CMS.add_report_projection(comment, actor)
  end

  defp add_projection(%User{}, _actor), do: {:ok, :pass}

  defp active_report_conflict?(%Ecto.Changeset{errors: errors}) do
    Enum.any?(errors, fn {field, {_, metadata}} ->
      field in [:reporter_id, :target_key] and metadata[:constraint] == :unique
    end)
  end
end
