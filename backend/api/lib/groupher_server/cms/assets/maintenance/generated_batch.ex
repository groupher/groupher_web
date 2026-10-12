defmodule GroupherServer.CMS.Assets.Maintenance.GeneratedBatch do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.Assets.Maintenance.GeneratedBatch -> result
  """

  @doc "Delegates claim_for_publish/2 to the owning implementation."
  defdelegate claim_for_publish(arg1, arg2),
    to: GroupherServer.CMS.Assets.Maintenance.GeneratedBatch.Provider

  @doc "Delegates delete_claim/2 to the owning implementation."
  defdelegate delete_claim(arg1, arg2),
    to: GroupherServer.CMS.Assets.Maintenance.GeneratedBatch.Provider
end
