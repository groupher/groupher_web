defmodule GroupherServer.Accounts.Profiles.Commands.UnlinkOauthIdentity do
  @moduledoc """
  Owns unlinking an OAuth identity by public reference and returning the view.

      UnlinkOauthIdentity -> transaction -> Query projection
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Profiles.{Effects, Oauth, Query}

  @doc """
  Unlinks one owned OAuth binding by its public reference.

  ## Examples

      Accounts.Profiles.Commands.UnlinkOauthIdentity.run("alice", public_ref)
  """
  @spec run(String.t(), String.t()) :: {:ok, map()} | {:error, term()}
  def run(login, public_ref) do
    result =
      Repo.transaction(fn ->
        case Oauth.unlink_identity_in_transaction(login, public_ref) do
          {:ok, user} -> user
          {:error, reason} -> Repo.rollback(reason)
        end
      end)

    case result do
      {:ok, user} ->
        Effects.revalidate_user(user)
        Query.linked_oauth_accounts(login)

      {:error, reason} ->
        {:error, reason}
    end
  end
end
