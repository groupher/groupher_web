defmodule GroupherServer.CMS.DocTree.Workflows.ContentImport do
  @moduledoc """
  Names the Docs Tree operations owned by the ContentImport workflow.

  Import apply is a durable Job workflow, not a user DocTree Command. When an
  existing mapped document is in product Trash, this boundary restores it with
  the Job actor and records the restore as worker-sourced activity.

      ImportJob apply
          -> ContentImport workflow
          -> Docs Tree Trash restore
          -> Docs/Tree/Mapping atomic apply
          -> persisted Job result
  """

  alias GroupherServer.CMS.DocTree.Trash
  alias GroupherServer.CMS.Model.Community

  @doc "Restores an imported target through the ContentImport workflow path."
  def restore_trash_item(%Community{} = community, action_ref, args) when is_map(args) do
    Trash.restore_for_content_import(community, action_ref, args)
  end
end
