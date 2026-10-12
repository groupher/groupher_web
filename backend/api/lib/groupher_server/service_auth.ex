defmodule GroupherServer.ServiceAuth do
  @moduledoc """
  Public boundary for the ServiceAuth Context.

  Service callers outside `GroupherServer.ServiceAuth.*` must enter through
  this module instead of depending on ServiceAuth implementation modules.

  Business position:

      trusted service caller -> ServiceAuth -> Client -> signed service token
  """

  @doc "Delegates ServiceAuth.Client.token/2 through the ServiceAuth Context boundary."
  defdelegate client_token(arg1, arg2), to: GroupherServer.ServiceAuth.Client, as: :token
end
