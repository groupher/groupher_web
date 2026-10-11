defmodule GroupherServer.Accounts.Publish.Effects do
  @moduledoc """
  Applies post-commit cache effects for published profile projections.

      committed published-count projection -> Effects -> FrontDesk
  """

  alias GroupherServer.{Accounts, FrontDesk}
  alias Accounts.Model.User

  @doc """
  Revalidates a user's public profile after the count projection changes.

  ## Examples

      Accounts.Publish.Effects.revalidate_user(user)
  """
  @spec revalidate_user(User.t()) :: {:ok, :pass}
  def revalidate_user(%User{login: login}) when is_binary(login) do
    FrontDesk.revalidate_user(login)
    {:ok, :pass}
  end

  def revalidate_user(%User{}), do: {:ok, :pass}
end
