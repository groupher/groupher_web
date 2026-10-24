defmodule GroupherServerWeb.Resolvers.AlertWall do
  @moduledoc """
  Scoped GraphQL reads for AlertWall's risk items.

  Business position:

      GraphQL AlertWall field
        -> resolver maps public target/scope input
          -> AlertWall query or Receipt-backed command
  """

  alias GroupherServer.CMS
  alias GroupherServer.{AlertWall, FrontDesk}
  alias CMS.Model.{Article, Comment, Community}

  def alert_items(_parent, %{scope: %{type: :platform}}, %{context: %{cur_user: actor}}) do
    AlertWall.list_items(%{type: :platform}, actor)
  end

  def alert_items(_parent, %{scope: %{type: :community, community: slug}}, %{
        context: %{cur_user: actor}
      }) do
    with {:ok, community} <- FrontDesk.community(slug, mode: :internal) do
      AlertWall.list_items(%{type: :community, community: community}, actor)
    end
  end

  def alert_items(_parent, _args, _resolution) do
    {:error, GroupherServer.CMS.passport_error_cat_permission_denied()}
  end

  def alert_item(_parent, %{id: id}, %{context: %{cur_user: actor}}) do
    with {:ok, item_id} <- parse_id(id) do
      AlertWall.item(item_id, actor)
    end
  end

  def alert_item(_parent, _args, _resolution) do
    {:error, AlertWall.item_not_found_error()}
  end

  def my_reports(_parent, _args, %{context: %{cur_user: actor}}) do
    AlertWall.my_reports(actor)
  end

  def my_reports(_parent, _args, _resolution) do
    {:error, GroupherServer.CMS.passport_error_cat_permission_denied()}
  end

  def submit_report(_parent, %{input: input, command_id: command_id}, %{
        context: %{cur_user: actor}
      }) do
    with {:ok, target} <- resolve_report_target(input.target, actor) do
      AlertWall.submit_report(target, input.report_type, input.details || "", actor, command_id)
    end
  end

  def submit_report(_parent, _args, _resolution) do
    {:error, GroupherServer.CMS.passport_error_cat_permission_denied()}
  end

  def withdraw_report(_parent, %{report_id: report_id, command_id: command_id}, %{
        context: %{cur_user: actor}
      }) do
    with {:ok, parsed_report_id} <- parse_id(report_id) do
      AlertWall.withdraw_report(parsed_report_id, actor, command_id)
    end
  end

  def withdraw_report(_parent, _args, _resolution) do
    {:error, GroupherServer.CMS.passport_error_cat_permission_denied()}
  end

  def report_count(%{id: id}, _args, _resolution) when is_integer(id) do
    {:ok, AlertWall.active_report_count(id)}
  end

  def report_count(_item, _args, _resolution), do: {:ok, 0}

  def reported_count(%{id: user_id}, _args, _resolution) when is_integer(user_id) do
    {:ok, AlertWall.reported_count(user_id)}
  end

  def reported_count(_account, _args, _resolution), do: {:ok, 0}

  def resolve_alert_item(_parent, %{id: id, resolution: resolution, command_id: command_id}, %{
        context: %{cur_user: actor}
      }) do
    with {:ok, item_id} <- parse_id(id) do
      AlertWall.resolve_item(item_id, resolution, actor, command_id)
    end
  end

  def resolve_alert_item(_parent, _args, _resolution) do
    {:error, GroupherServer.CMS.passport_error_cat_permission_denied()}
  end

  defp parse_id(id) when is_integer(id) and id > 0, do: {:ok, id}

  defp parse_id(id) when is_binary(id) do
    case Integer.parse(id) do
      {integer, ""} when integer > 0 -> {:ok, integer}
      _ -> {:error, AlertWall.item_not_found_error()}
    end
  end

  defp parse_id(_id), do: {:error, AlertWall.item_not_found_error()}

  defp resolve_report_target(%{type: :article, article: path}, actor) when is_map(path) do
    with {:ok, projection} <- FrontDesk.article(path, actor),
         article_id when is_binary(article_id) <- Map.get(projection, :id),
         {:ok, %Community{} = community} <- FrontDesk.community(path.community, actor, []),
         {:ok, %Article{} = article} <-
           FrontDesk.article(article_id, mode: :internal, view: :command_context) do
      {:ok,
       %{
         owner: :cms,
         target_type: :article,
         target_id: article.id,
         community_id: community.id,
         subject_ref: subject_ref(:article, article, projection)
       }}
    else
      _ -> {:error, AlertWall.invalid_report_error()}
    end
  end

  defp resolve_report_target(%{type: :comment, comment: path}, actor) when is_map(path) do
    with {:ok, %Comment{} = comment} <- FrontDesk.comment(path, actor) do
      {:ok,
       %{
         owner: :cms,
         target_type: :comment,
         target_id: to_string(comment.id),
         community_id: comment.community_id,
         subject_ref: subject_ref(:comment, comment, comment.body)
       }}
    else
      _ -> {:error, AlertWall.invalid_report_error()}
    end
  end

  defp resolve_report_target(%{type: :doc, article: path, doc_branch_id: branch_id}, actor)
       when is_map(path) and is_integer(branch_id) and branch_id > 0 do
    with {:ok, projection} <- FrontDesk.article(path, actor),
         article_id when is_binary(article_id) <- Map.get(projection, :id),
         ^branch_id <- Map.get(projection, :branch_id),
         {:ok, %Article{} = article} <-
           FrontDesk.article(article_id, mode: :internal, view: :command_context) do
      {:ok,
       %{
         owner: :cms,
         target_type: :doc,
         target_id: article.id,
         community_id: nil,
         subject_ref: "branch:#{branch_id}:#{subject_ref(:doc, article, projection)}"
       }}
    else
      _ -> {:error, AlertWall.invalid_report_error()}
    end
  end

  defp resolve_report_target(_target, _actor) do
    {:error, AlertWall.invalid_report_error()}
  end

  defp subject_ref(type, resource, projection) do
    revision = Map.get(projection, :revision_id) || Map.get(projection, :current_revision_id)
    version = Map.get(projection, :version) || Map.get(projection, :body_version)
    updated_at = Map.get(resource, :updated_at)

    cond do
      is_integer(revision) or is_binary(revision) -> "#{type}:revision:#{revision}"
      is_integer(version) -> "#{type}:version:#{version}"
      match?(%DateTime{}, updated_at) -> "#{type}:updated:#{DateTime.to_iso8601(updated_at)}"
      true -> "#{type}:current:#{resource.id}"
    end
  end
end
