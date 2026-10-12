defmodule GroupherServer.Accounts.CollectFolders.MembershipConfirmation do
  @moduledoc """
  Confirms collect-folder membership writes for add and remove operations.

      collect add / remove
        -> MembershipConfirmation
        -> Receipt persistence / recovery
  """

  require GroupherServer.CMS

  GroupherServer.CMS.command_confirmation(
    operation: :collect_add,
    operations: [:collect_add, :collect_remove],
    data_keys: ["article_id", "folder_id", "operation", "total_count"],
    field_types: %{
      "article_id" => :string,
      "folder_id" => :string,
      "operation" => :string,
      "total_count" => :integer
    }
  )
end
