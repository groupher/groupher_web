defmodule GroupherServer.Test.Helper.Schema.Asset do
  @moduledoc "GraphQL documents used by asset tests."

  def q(:community_asset_refs) do
    """
    query($community: String!, $assetId: ID!, $pagi: PagiInput) {
        communityAssetRefs(community: $community, assetId: $assetId, pagi: $pagi) {
          entries {
            id
            articleId
            usage
            source
          }
          pageInfo { hasNextPage ... on OffsetPageInfo { page size totalCount totalPages } ... on CursorPageInfo { endCursor } }
        }
      }
    """
  end

  def q(:community_asset_origin_info) do
    """
    query($publicRef: String!) {
        communityAssetOriginInfo(publicRef: $publicRef) {
          publicRef
          status
          deletedAt
          filename
          storage
          storageKey
          mimeType
          sizeBytes
          width
          height
          meta
        }
      }
    """
  end
end
