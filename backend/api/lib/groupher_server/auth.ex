defmodule GroupherServer.Auth do
  @moduledoc """
  Public boundary for the Auth Context.

  Authentication callers outside `GroupherServer.Auth.*` must enter through
  this module instead of depending on Auth implementation modules.

  Business position:

      caller -> GroupherServer.Auth -> result
  """

  @doc "Delegates Auth.Contract.oauth_identity_already_linked/0 through the Auth Context boundary."
  defdelegate contract_oauth_identity_already_linked(),
    to: GroupherServer.Auth.Contract,
    as: :oauth_identity_already_linked

  @doc "Delegates Auth.Contract.oauth_provider_already_linked/0 through the Auth Context boundary."
  defdelegate contract_oauth_provider_already_linked(),
    to: GroupherServer.Auth.Contract,
    as: :oauth_provider_already_linked

  @doc "Delegates Auth.Contract.oauth_last_login_method/0 through the Auth Context boundary."
  defdelegate contract_oauth_last_login_method(),
    to: GroupherServer.Auth.Contract,
    as: :oauth_last_login_method

  @doc "Delegates Auth.Contract.service_jwks_unavailable/0 through the Auth Context boundary."
  defdelegate contract_service_jwks_unavailable(),
    to: GroupherServer.Auth.Contract,
    as: :service_jwks_unavailable

  @doc "Delegates Auth.Contract.service_token_invalid/0 through the Auth Context boundary."
  defdelegate contract_service_token_invalid(),
    to: GroupherServer.Auth.Contract,
    as: :service_token_invalid

  @doc "Delegates Auth.Contract.token_invalid/0 through the Auth Context boundary."
  defdelegate contract_token_invalid(), to: GroupherServer.Auth.Contract, as: :token_invalid

  @doc "Delegates Auth.Contract.token_expired/0 through the Auth Context boundary."
  defdelegate contract_token_expired(), to: GroupherServer.Auth.Contract, as: :token_expired

  @doc "Delegates Auth.Contract.session_revoked/0 through the Auth Context boundary."
  defdelegate contract_session_revoked(), to: GroupherServer.Auth.Contract, as: :session_revoked

  @doc "Delegates Auth.Contract.service_scope_forbidden/0 through the Auth Context boundary."
  defdelegate contract_service_scope_forbidden(),
    to: GroupherServer.Auth.Contract,
    as: :service_scope_forbidden

  @doc "Delegates Auth.Contract.invalid_request/0 through the Auth Context boundary."
  defdelegate contract_invalid_request(), to: GroupherServer.Auth.Contract, as: :invalid_request

  @doc "Delegates Auth.Contract.invalid_csrf/0 through the Auth Context boundary."
  defdelegate contract_invalid_csrf(), to: GroupherServer.Auth.Contract, as: :invalid_csrf

  @doc "Delegates Auth.Contract.token_missing/0 through the Auth Context boundary."
  defdelegate contract_token_missing(), to: GroupherServer.Auth.Contract, as: :token_missing

  @doc "Delegates Auth.Contract.session_expired/0 through the Auth Context boundary."
  defdelegate contract_session_expired(), to: GroupherServer.Auth.Contract, as: :session_expired

  @doc "Delegates Auth.Contract.session_conflict/0 through the Auth Context boundary."
  defdelegate contract_session_conflict(), to: GroupherServer.Auth.Contract, as: :session_conflict

  @doc "Delegates Auth.Contract.account_blocked/0 through the Auth Context boundary."
  defdelegate contract_account_blocked(), to: GroupherServer.Auth.Contract, as: :account_blocked

  @doc "Delegates Auth.Contract.session_unavailable/0 through the Auth Context boundary."
  defdelegate contract_session_unavailable(),
    to: GroupherServer.Auth.Contract,
    as: :session_unavailable
end
