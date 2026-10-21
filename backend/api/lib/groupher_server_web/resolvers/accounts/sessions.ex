defmodule GroupherServerWeb.Resolvers.Accounts.Sessions do
  @moduledoc """
  Adapts session and identity GraphQL fields to Accounts authentication use cases.

      GraphQL session field -> this resolver -> Accounts session/auth facade
  """
  require GroupherServer.Accounts.Profiles.ErrorCat
  alias GroupherServer.Accounts
  alias Accounts.Profiles.ErrorCat

  def session_state(_root, _args, %{context: %{auth_failure: code}}) do
    {:error, message: "Authorize: browser token is invalid", code: code}
  end

  def session_state(_root, _args, %{context: %{service_auth_failure: code}}) do
    {:error, message: "Authorize: service identity could not be verified", code: code}
  end

  def session_state(_root, _args, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_session_state(cur_user)
  end

  def session_state(_root, _args, _info) do
    {:ok, %{is_valid: false}}
  end

  def signin_oauth(_root, %{provider: provider} = args, _info) do
    Accounts.profiles_signin_oauth(provider, Map.get(args, :browser_session, %{}))
  end

  def refresh_browser_session(_root, %{browser_session_ref: ref}, _info) do
    ref |> Accounts.profiles_refresh_browser_session() |> browser_session_result()
  end

  def revoke_browser_session(_root, %{browser_session_ref: ref}, _info) do
    with {:ok, _result} <- Accounts.profiles_revoke_browser_session(ref) do
      {:ok, %{done: true}}
    end
  end

  def browser_sessions(_root, %{browser_session_ref: ref} = args, _info) do
    ref
    |> Accounts.profiles_browser_sessions_for_ref(Map.get(args, :pagi))
    |> browser_session_result()
  end

  def revoke_browser_session_public(
        _root,
        %{browser_session_ref: ref, public_ref: public_ref},
        _info
      ) do
    ref |> Accounts.profiles_revoke_browser_session_public(public_ref) |> browser_session_result()
  end

  def revoke_other_browser_sessions(_root, %{browser_session_ref: ref}, _info) do
    with {:ok, _result} <-
           ref
           |> Accounts.profiles_revoke_other_browser_sessions_for_ref()
           |> browser_session_result() do
      {:ok, %{done: true}}
    end
  end

  def linked_oauth_accounts(_root, _args, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_linked_oauth_accounts(cur_user.login)
  end

  def link_oauth_identity(_root, %{identity: identity}, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_link_oauth_identity(cur_user.login, identity)
  end

  def unlink_oauth_identity(_root, %{public_ref: public_ref}, %{context: %{cur_user: cur_user}}) do
    Accounts.profiles_unlink_oauth_identity(cur_user.login, public_ref)
  end

  defp browser_session_result({:error, reason}) do
    {message, code} =
      case error_reason(reason) do
        :session_expired ->
          {"Browser Session expired.", GroupherServer.Auth.contract_session_expired()}

        :session_revoked ->
          {"Browser Session revoked.", GroupherServer.Auth.contract_session_revoked()}

        :session_not_found ->
          {"Browser Session no longer exists.", GroupherServer.Auth.contract_session_revoked()}

        :current_session ->
          {"The current Browser Session cannot be revoked here.",
           GroupherServer.Auth.contract_session_conflict()}

        :account_blocked ->
          {"Account is blocked.", GroupherServer.Auth.contract_account_blocked()}

        _ ->
          {"Browser Session operation failed.",
           GroupherServer.Auth.contract_session_unavailable()}
      end

    {:error, message: message, code: code}
  end

  defp browser_session_result(result) do
    result
  end

  defp error_reason(ErrorCat.error_pattern(reason: reason)) do
    reason
  end

  defp error_reason(reason) when is_atom(reason) do
    reason
  end

  defp error_reason(_reason) do
    :unknown
  end
end
