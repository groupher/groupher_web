defmodule GroupherServer.Test.Helper.Schema.Mention do
  @moduledoc "GraphQL documents used by mention tests."

  def q(:mentions) do
    """
    query($source: MentionSourceInput!, $pagi: PagiInput) {
          mentions(source: $source, pagi: $pagi) {
            entries {
              mentionerType
              mentionerId
              mentionerCommunityId
              mentionedScope
              mentionedType
              mentionedId
              mentionedCommunityId
              mentionedUrl
              mentionCase
              occurrences
            }
            pageInfo { hasNextPage ... on OffsetPageInfo { page size totalCount totalPages } ... on CursorPageInfo { endCursor } }
          }
        }
    """
  end

  def q(:mentioned_by) do
    """
    query($target: MentionTargetInput!, $pagi: PagiInput) {
          mentionedBy(target: $target, pagi: $pagi) {
            entries {
              mentionerType
              mentionerId
              mentionerCommunityId
              mentionedType
              mentionedId
              mentionedCommunityId
              mentionCase
            }
            pageInfo { hasNextPage ... on OffsetPageInfo { page size totalCount totalPages } ... on CursorPageInfo { endCursor } }
          }
        }
    """
  end

  def q(:mentions_2) do
    """
    query($source: MentionSourceInput!) {
          mentions(source: $source) {
            entries {
              mentionerType
              mentionerId
              mentionedType
              mentionedId
            }
            pageInfo { hasNextPage ... on OffsetPageInfo { totalCount page size } ... on CursorPageInfo { endCursor } }
          }
        }
    """
  end
end
