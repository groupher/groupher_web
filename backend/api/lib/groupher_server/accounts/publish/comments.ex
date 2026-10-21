defmodule GroupherServer.Accounts.Publish.Comments do
  @moduledoc """
  Account-side read facade for comments a user has published.

  Comment publication remains owned by `CMS.Comments`; this module gives profile
  and mailbox surfaces a compact account namespace for paged reads.

  Business position:

      profile read -> CMS.comments_paged_published_comments -> comment page
  """

  alias GroupherServer.CMS

  @doc "Pages published comments with explicit thread, filter, position and viewer."
  def paged(user, thread, filter, pagi, viewer) do
    CMS.comments_paged_published_comments(user, thread, filter, pagi, viewer)
  end
end
