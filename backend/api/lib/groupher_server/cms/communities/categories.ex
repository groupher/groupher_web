defmodule GroupherServer.CMS.Communities.Categories do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.Communities.Categories -> result
  """

  @doc "Delegates create/2 to the owning implementation."
  defdelegate create(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates delete/2 to the owning implementation."
  defdelegate delete(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates set/2 to the owning implementation."
  defdelegate set(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates unset/2 to the owning implementation."
  defdelegate unset(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates update/1 to the owning implementation."
  defdelegate update(arg1), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates update/2 to the owning implementation."
  defdelegate update(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow
end
