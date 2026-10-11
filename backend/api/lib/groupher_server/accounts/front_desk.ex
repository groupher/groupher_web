defmodule GroupherServer.Accounts.FrontDesk do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.Accounts.FrontDesk -> result
  """

  @doc """
  Delegates fresh_user/1 to the owning implementation.

  ## Examples

      iex> GroupherServer.Accounts.FrontDesk.fresh_user(...)
  """
  defdelegate fresh_user(arg1), to: GroupherServer.Accounts.FrontDesk.Query

  @doc """
  Delegates user/1 to the owning implementation.

  ## Examples

      iex> GroupherServer.Accounts.FrontDesk.user(...)
  """
  defdelegate user(arg1), to: GroupherServer.Accounts.FrontDesk.Query

  @doc """
  Delegates userid/1 to the owning implementation.

  ## Examples

      iex> GroupherServer.Accounts.FrontDesk.userid(...)
  """
  defdelegate userid(arg1), to: GroupherServer.Accounts.FrontDesk.Query
end
