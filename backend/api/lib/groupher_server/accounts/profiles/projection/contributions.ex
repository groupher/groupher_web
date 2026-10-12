defmodule GroupherServer.Accounts.Profiles.Projection.Contributions do
  @moduledoc """
  Persists the rebuildable contribution digest owned by a Profile.

      contribution facts -> digest -> User.contributes
  """

  alias GroupherServer.Accounts
  alias Accounts.Model.User
  alias Helper.ORM

  @doc """
  Refreshes one User contribution projection inside the caller transaction.

  ## Examples

      Profiles.Projection.Contributions.refresh(user.id, digest)
  """
  @spec refresh(integer(), map()) :: {:ok, User.t()} | {:error, term()}
  def refresh(user_id, digest) when is_integer(user_id) and is_map(digest) do
    with {:ok, user} <- ORM.find(User, user_id) do
      ORM.update_embed(user, :contributes, digest)
    end
  end
end
