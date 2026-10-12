defmodule GroupherServer.Accounts.Profiles.Projection do
  @moduledoc """
  Owns rebuildable Profile projections derived from authoritative facts.

      contribution digest -> Projection -> User.contributes
  """

  alias __MODULE__.Contributions
  alias GroupherServer.Accounts
  alias Accounts.Model.User

  @doc """
  Refreshes the persisted contribution projection for one User id.

  ## Examples

      Profiles.Projection.refresh_contributions(user.id, digest)
  """
  @spec refresh_contributions(integer(), map()) :: {:ok, User.t()} | {:error, term()}
  defdelegate refresh_contributions(user_id, digest), to: Contributions, as: :refresh
end
