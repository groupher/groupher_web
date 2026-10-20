defmodule GroupherServer.Accounts.CollectFolders.List do
  @moduledoc """
  Paginates collect folders with viewer-aware privacy rules.

  Anonymous or non-owner reads only see public folders. Owner reads include
  private folders and can still apply thread filters through the folder meta
  flags.

  Business position:

      Client / Auth
        -> GraphQL or internal API
        -> Accounts facade
        -> List
        -> Repo
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.Accounts

  alias Accounts.Model.{CollectFolder, User}
  alias Helper.{ORM, QueryBuilder, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @doc """
  Returns public collection folders for one account.

  ## Examples

      Accounts.CollectFolders.List.page(user_id, %{page: 1, size: 20})
  """
  @spec page(T.id(), map()) :: T.domain_res(T.paged_data())
  def page(user_id, filter) do
    query = CollectFolder |> where([c], c.user_id == ^user_id and not c.private)
    do_paged(filter, query)
  end

  @doc """
  Returns collection folders with private visibility for the account owner.

  ## Examples

      Accounts.CollectFolders.List.page(user_id, %{page: 1, size: 20}, viewer)
  """
  @spec page(T.id(), map(), User.t()) :: T.domain_res(T.paged_data())
  def page(user_id, filter, %User{id: cur_user_id}) do
    query =
      if cur_user_id == user_id,
        do: CollectFolder |> where([c], c.user_id == ^user_id),
        else: CollectFolder |> where([c], c.user_id == ^user_id and not c.private)

    do_paged(filter, query)
  end

  defp do_paged(filter, query) do
    %{page: page, size: size} = filter

    query =
      query
      |> filter_thread_ifneed(filter)
      |> QueryBuilder.filter_pack(Map.delete(filter, :thread))
      |> exclude(:order_by)

    with {:ok, result} <-
           ORM.pagi(
             query,
             %Params.Offset{page: page, size: size},
             for: CollectFolder,
             order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
           ) do
      done(Page.to_legacy(result))
    end
  end

  defp filter_thread_ifneed(query, %{thread: thread}) do
    field_name = "has_#{thread}"
    query |> where([f], fragment("(?->>?)::boolean = ?", f.meta, ^field_name, true))
  end

  defp filter_thread_ifneed(query, _), do: query
end
