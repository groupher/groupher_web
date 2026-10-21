defmodule GroupherServer.Test.Helper.Schema.Mailbox do
  @moduledoc "GraphQL documents used by mailbox tests."

  def m(:mark_read) do
    """
    mutation($type: MailboxType, $ids: [ID]) {
          markRead(ids: $ids, type: $type) {
            done
          }
        }
    """
  end

  def m(:mark_read_all) do
    """
    mutation($type: MailboxType) {
          markReadAll(type: $type) {
            done
          }
        }
    """
  end

  def q(:user) do
    """
    query($login: String!) {
          user(login: $login) {
            login
            mailbox {
              isEmpty
              unreadTotalCount
              unreadMentionsCount
              unreadNotificationsCount
            }
          }
        }
    """
  end

  def q(:paged_mentions) do
    """
    query($filter: MailboxMentionsFilter, $pagi: PagiInput) {
          pagedMentions(filter: $filter, pagi: $pagi) {
            entries {
              id
              thread
              articleId
              title
              commentId
              read
              blockLinker
              user {
                login
                nickname
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              ... on OffsetPageInfo { page size totalCount totalPages }
              ... on CursorPageInfo { startCursor endCursor }
            }
          }
        }
    """
  end

  def q(:paged_notifications) do
    """
    query($filter: MailboxNotificationsFilter, $pagi: PagiInput) {
          pagedNotifications(filter: $filter, pagi: $pagi) {
            entries {
              id
              action
              thread
              articleId
              title
              commentId
              read
              fromUsers {
                login
                nickname
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              ... on OffsetPageInfo { page size totalCount totalPages }
              ... on CursorPageInfo { startCursor endCursor }
            }
          }
        }
    """
  end
end
