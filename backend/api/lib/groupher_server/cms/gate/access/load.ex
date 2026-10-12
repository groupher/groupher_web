defmodule GroupherServer.CMS.Gate.Access.Load do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.Gate.Access.Load -> result
  """

  @doc "Delegates article_in_community/3 to the owning implementation."
  defdelegate article_in_community(arg1, arg2, arg3),
    to: GroupherServer.CMS.Gate.Access.Load.Query

  @doc "Delegates article/3 to the owning implementation."
  defdelegate article(arg1, arg2, arg3), to: GroupherServer.CMS.Gate.Access.Load.Query

  @doc "Delegates comment/4 to the owning implementation."
  defdelegate comment(arg1, arg2, arg3, arg4), to: GroupherServer.CMS.Gate.Access.Load.Query

  @doc "Delegates community/1 to the owning implementation."
  defdelegate community(arg1), to: GroupherServer.CMS.Gate.Access.Load.Query

  @doc "Delegates doc/3 to the owning implementation."
  defdelegate doc(arg1, arg2, arg3), to: GroupherServer.CMS.Gate.Access.Load.Query
end
