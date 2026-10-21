defmodule GroupherServer.Test.Helper.Schema.DocTree do
  @moduledoc "GraphQL documents used by doc tree tests."

  def q(:doc_tree) do
    """
    query($community: String!) {
        docTree(community: $community) {
          revision
          treeState {
            hasUnpublishedChanges
            stagedEventCount
          }
          stagedEvents {
            eventType
          }
          tabs {
            id
            pins { id type title href }
            groups { id type parentNodeId }
          }
        }
      }
    """
  end

  def q(:doc_public_tree) do
    """
    query($community: String!) {
        docPublicTree(community: $community) {
          tabs {
            id
            title
            groups {
              id
              type
              title
              pages { id docId type title href }
            }
          }
        }
      }
    """
  end

  def q(:doc_tree_trash_items) do
    """
    query($community: String!, $pagi: PagiInput) {
      docTreeTrashItems(community: $community, pagi: $pagi) {
        entries {
        id
        nodeId
        type
        title
        restoredAt
        }
        pageInfo { __typename hasNextPage hasPreviousPage ... on OffsetPageInfo {page size totalCount totalPages} ... on CursorPageInfo {startCursor endCursor} }
      }
    }
    """
  end

  def m(:delete_doc_tree_node) do
    """
    mutation($community: String!, $id: ID!, $baseRevision: Int!, $commandId: ID!) {
      deleteDocTreeNode(community: $community, id: $id, baseRevision: $baseRevision, commandId: $commandId) {
        revision
        conflict
      }
    }
    """
  end

  def m(:restore_doc_tree_trash_item) do
    """
    mutation($community: String!, $id: ID!, $baseRevision: Int!, $commandId: ID!) {
      restoreDocTreeTrashItem(community: $community, id: $id, baseRevision: $baseRevision, commandId: $commandId) {
        revision
        conflict
        node {
          id
          type
          title
        }
      }
    }
    """
  end
end
