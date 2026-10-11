defmodule GroupherServer.CMS.DocTree.Publish do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.DocTree.Publish -> result
  """

  @doc "Delegates checklist/1 to the owning implementation."
  defdelegate checklist(arg1), to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates checklist/2 to the owning implementation."
  defdelegate checklist(arg1, arg2), to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates move_doc_to_draft/3 to the owning implementation."
  defdelegate move_doc_to_draft(arg1, arg2, arg3), to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates move_doc_to_draft/4 to the owning implementation."
  defdelegate move_doc_to_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates move_subtree_to_draft/3 to the owning implementation."
  defdelegate move_subtree_to_draft(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates move_subtree_to_draft/4 to the owning implementation."
  defdelegate move_subtree_to_draft(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates public_node_for_draft/2 to the owning implementation."
  defdelegate public_node_for_draft(arg1, arg2), to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates public_node_for_draft/3 to the owning implementation."
  defdelegate public_node_for_draft(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates publish_changes/3 to the owning implementation."
  defdelegate publish_changes(arg1, arg2, arg3), to: GroupherServer.CMS.DocTree.Publish.Workflow

  @doc "Delegates publish_changes/4 to the owning implementation."
  defdelegate publish_changes(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocTree.Publish.Workflow
end
