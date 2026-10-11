defmodule GroupherServer.Accounts.Search do
  @moduledoc """
  Public account-search boundary for nickname and login matching.

  Business position:

      Client / Auth -> Accounts facade -> Search.Query -> User read model
  """

  alias __MODULE__.User
  alias Helper.T

  @doc """
  Searches users by nickname or login.

  ## Examples

      GroupherServer.Accounts.search_user("alice")
  """
  @spec user(String.t()) :: T.domain_res(T.paged_users())
  def user(name) when is_binary(name), do: User.search(name)
end
