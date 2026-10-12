defmodule GroupherServer.Accounts.Profiles.Commands.SignInOauth do
  @moduledoc """
  Owns the OAuth sign-in or first-registration command.

      provider -> existing binding / registration transaction
               -> profile effects -> BrowserSession
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Profiles.{BrowserSessions, Effects, Oauth}

  @doc """
  Signs in through an existing OAuth identity or registers its account.

  ## Examples

      Accounts.Profiles.Commands.SignInOauth.run(provider_payload, %{})
  """
  @spec run(map(), map()) :: {:ok, map()} | {:error, term()}
  def run(provider, browser_session_metadata \\ %{}) do
    provider = Oauth.normalize_oauth_provider(provider)

    case Oauth.find_oauth_provider(provider) do
      {:ok, oauth_provider} ->
        BrowserSessions.create(oauth_provider.user, browser_session_metadata)

      {:error, _} ->
        register(provider, browser_session_metadata)
    end
  end

  defp register(provider, browser_session_metadata) do
    transaction_result =
      provider
      |> Oauth.registration_multi()
      |> Repo.transaction()
      |> Oauth.recover_registration_race(provider)

    case transaction_result do
      {:ok, %{create_user: user}, :reused} ->
        BrowserSessions.create(user, browser_session_metadata)

      result ->
        with {:ok, user} <- Oauth.registration_result(result),
             {:ok, :pass} <- Effects.oauth_registration_completed(user) do
          BrowserSessions.create(user, browser_session_metadata)
        end
    end
  end
end
