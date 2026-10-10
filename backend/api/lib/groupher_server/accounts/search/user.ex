defmodule GroupherServer.Accounts.Search.User do
  @moduledoc """
  Lightweight user search by nickname or login.

  This is intentionally bounded for mention pickers and small search surfaces,
  not a full text-search pipeline.

  Business position:

      Accounts.Search -> Search.User -> bounded User query
  """

  import Ecto.Query, warn: false
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.Accounts

  alias Accounts.Model.User
  alias Helper.ORM

  @search_items_count 15

  @doc """
  Searches users by nickname or login for bounded picker results.

  ## Examples

      Accounts.Search.User.search("alice")
  """
  @spec search(String.t()) :: {:ok, map()} | {:error, any()}
  def search(name) do
    User
    |> where([u], ilike(u.nickname, ^"%#{name}%") or ilike(u.login, ^"%#{name}%"))
    |> ORM.paginator(page: 1, size: @search_items_count)
    |> done()
  end
end
