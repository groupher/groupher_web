defmodule GroupherServer.CMS.Communities.Categories do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.Communities.Categories -> result
  """

  @doc "Delegates the legacy create/2 compatibility arity."
  defdelegate create(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates command-aware create/3 to the receipt pipeline."
  defdelegate create(arg1, arg2, arg3), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates the legacy delete/2 compatibility arity."
  defdelegate delete(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates command-aware delete/4 to the receipt pipeline."
  defdelegate delete(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates the legacy set/2 compatibility arity."
  defdelegate set(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates command-aware set/4 to the receipt pipeline."
  defdelegate set(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates the legacy unset/2 compatibility arity."
  defdelegate unset(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates command-aware unset/4 to the receipt pipeline."
  defdelegate unset(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates the legacy update/1 compatibility arity."
  defdelegate update(arg1), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates the legacy update/2 compatibility arity."
  defdelegate update(arg1, arg2), to: GroupherServer.CMS.Communities.Categories.Workflow

  @doc "Delegates command-aware update/4 to the receipt pipeline."
  defdelegate update(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Communities.Categories.Workflow
end
