defmodule GroupherServer.AlertWall.Query do
  @moduledoc """
  Authorized read access to AlertWall items and reporter-owned user reports.

  Business position:

      GraphQL resolver
        -> AlertWall public query
          -> scope authorization
          -> item/report reads
  """

  import Ecto.Query

  alias GroupherServer.AlertWall
  alias GroupherServer.{CMS, Repo}
  alias AlertWall.Model.{Item, UserReport}
  alias CMS.Model.Community

  @doc "Lists items visible to an authorized platform or community reviewer."
  def list_items(scope, actor) do
    with {:ok, community_id, permission} <- normalize_scope(scope),
         {:ok, :pass} <- authorize(actor, permission) do
      query =
        from(item in Item,
          where: item.status == :open,
          order_by: [desc: item.opened_at, desc: item.id]
        )

      query =
        if is_nil(community_id),
          do: where(query, [item], is_nil(item.community_id)),
          else: where(query, [item], item.community_id == ^community_id)

      {:ok, Repo.all(query)}
    end
  end

  @doc "Loads one item only when its scope permits reviewer access."
  def item(item_id, actor) when is_integer(item_id) and item_id > 0 do
    case Repo.get(Item, item_id) do
      %Item{community_id: nil} = item ->
        with {:ok, :pass} <- authorize(actor, "review.platform.read"), do: {:ok, item}

      %Item{community_id: community_id} = item ->
        with {:ok, %Community{slug: slug}} <- community(community_id),
             {:ok, :pass} <- authorize(actor, "review.read", %{community: slug}) do
          {:ok, item}
        end

      nil ->
        {:error, GroupherServer.AlertWall.ErrorCat.item_not_found()}
    end
  end

  def item(_item_id, _actor), do: {:error, GroupherServer.AlertWall.ErrorCat.item_not_found()}

  @doc "Lists the current user's original report facts, including withdrawn history."
  def my_reports(actor) do
    with %{id: reporter_id} when is_integer(reporter_id) <- actor do
      {:ok,
       Repo.all(
         from(report in UserReport,
           where: report.reporter_id == ^reporter_id,
           order_by: [desc: report.inserted_at, desc: report.id]
         )
       )}
    else
      _ -> {:error, CMS.passport_error_cat_permission_denied()}
    end
  end

  @doc "Counts active reports authored by one account."
  def reported_count(user_id) when is_integer(user_id) do
    Repo.one(
      from(report in UserReport,
        where:
          report.reporter_id == ^user_id and is_nil(report.withdrawn_at) and
            is_nil(report.outdated_at) and is_nil(report.resolved_at),
        select: count(report.id)
      )
    ) || 0
  end

  def reported_count(_user_id), do: 0

  defp normalize_scope(%{type: :platform}), do: {:ok, nil, "review.platform.read"}

  defp normalize_scope(%{type: :community, community: %Community{id: id, slug: slug}}) do
    {:ok, id, {"review.read", %{community: slug}}}
  end

  defp normalize_scope(_scope), do: {:error, CMS.passport_error_cat_permission_denied()}

  defp authorize(actor, {permission, params}), do: authorize(actor, permission, params)
  defp authorize(actor, permission), do: authorize(actor, permission, %{})

  defp authorize(actor, permission, params) do
    case CMS.passport_authorization_check(actor, permission, params) do
      {:ok, true} -> {:ok, :pass}
      {:error, _reason} = error -> error
      _ -> {:error, CMS.passport_error_cat_permission_denied()}
    end
  end

  defp community(id) do
    case Repo.get(Community, id) do
      %Community{} = community -> {:ok, community}
      nil -> {:error, CMS.passport_error_cat_permission_denied()}
    end
  end
end
