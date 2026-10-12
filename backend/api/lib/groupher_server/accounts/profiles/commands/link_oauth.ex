defmodule GroupherServer.Accounts.Profiles.Commands.LinkOauth do
  @moduledoc """
  Owns linking one verified OAuth identity to an existing account.

      LinkOauth command -> Repo.transaction -> Oauth row primitives -> Effects
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.User
  alias Accounts.Profiles.{Effects, Oauth}

  @doc """
  Links an OAuth provider and revalidates the changed account.

  ## Examples

      Accounts.Profiles.Commands.LinkOauth.run("alice", provider_payload)
  """
  @spec run(String.t(), map()) :: {:ok, User.t()} | {:error, term()}
  def run(login, provider) do
    transaction(fn -> Oauth.link_in_transaction(login, provider) end)
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
