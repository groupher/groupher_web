defmodule GroupherServer.Accounts.Mailbox.Effects do
  @moduledoc """
  Applies post-commit cache invalidation for mailbox projections.

      committed User.mailbox rows
        -> Mailbox.Effects.invalidate_users/1
        -> FrontDesk user cache
  """

  alias GroupherServer.Accounts
  alias Accounts.FrontDesk.Cache, as: FrontDeskCache
  alias Accounts.Model.User

  @doc """
  Invalidates cached users after mailbox persistence has committed.

  ## Examples

      Accounts.Mailbox.Effects.invalidate_users([user])
  """
  @spec invalidate_users([User.t()]) :: {:ok, :pass}
  def invalidate_users(users) when is_list(users) do
    users
    |> Enum.map(& &1.login)
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
    |> Enum.each(&FrontDeskCache.delete_user/1)

    {:ok, :pass}
  end
end
