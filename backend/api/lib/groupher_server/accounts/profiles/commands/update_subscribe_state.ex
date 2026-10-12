defmodule GroupherServer.Accounts.Profiles.Commands.UpdateSubscribeState do
  @moduledoc """
  Owns rebuilding denormalized subscription fields on a user profile.

      subscription rows -> command transaction -> profile projection -> Effects
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.User
  alias Accounts.Profiles.Persist

  @doc """
  Rebuilds one user's subscribed-community count and ID projection.

  ## Examples

      Accounts.Profiles.Commands.UpdateSubscribeState.run(user)
  """
  @spec run(User.t()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user) do
    case Repo.transaction(fn -> Persist.rebuild_subscribe_state(user) end) do
      {:ok, {:ok, updated_user}} ->
        {:ok, updated_user}

      {:ok, {:error, reason}} ->
        {:error, reason}

      {:error, reason} ->
        {:error, reason}
    end
  end
end
