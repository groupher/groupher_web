defmodule GroupherServer.Accounts.Profiles.Commands.LinkOauthIdentity do
  @moduledoc """
  Owns linking an OAuth identity and returning the canonical linked-account view.

      LinkOauthIdentity -> LinkOauth transaction -> Query projection
  """

  alias GroupherServer.Accounts.Profiles.{Commands, Query}

  @doc """
  Links a verified identity and returns linked-account projections.

  ## Examples

      Accounts.Profiles.Commands.LinkOauthIdentity.run("alice", provider_payload)
  """
  @spec run(String.t(), map()) :: {:ok, map()} | {:error, term()}
  def run(login, provider) do
    with {:ok, _user} <- Commands.LinkOauth.run(login, provider) do
      Query.linked_oauth_accounts(login)
    end
  end
end
