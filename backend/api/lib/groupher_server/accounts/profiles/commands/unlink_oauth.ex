defmodule GroupherServer.Accounts.Profiles.Commands.UnlinkOauth do
  @moduledoc """
  Owns unlinking one verified OAuth identity from an existing account.

      UnlinkOauth command -> Repo.transaction -> Oauth row primitives -> Effects
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.User
  alias Accounts.Profiles.{Effects, Oauth}

  @doc """
  Removes an OAuth provider while preserving at least one login method.

  ## Examples

      Accounts.Profiles.Commands.UnlinkOauth.run("alice", provider_payload)
  """
  @spec run(String.t(), map()) :: {:ok, User.t()} | {:error, term()}
  def run(login, provider) do
    transaction(fn -> Oauth.unlink_in_transaction(login, provider) end)
    |> case do
      {:ok, %User{} = user} = result ->
        Effects.revalidate_user(user)
        result

      error ->
        error
    end
  end

  defp transaction(operation) do
    Repo.transaction(fn ->
      case operation.() do
        {:ok, value} -> value
        {:error, reason} -> Repo.rollback(reason)
      end
    end)
  end
end
