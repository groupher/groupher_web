defmodule GroupherServer.Accounts.Publish.Comments do
  @moduledoc """
  Account-side read facade for comments a user has published.

  Comment publication remains owned by `CMS.Comments`; this module gives profile
  and mailbox surfaces a compact account namespace for paged reads.

  Business position:

      profile read -> CMS.comments_paged_published_comments -> comment page
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User

  @doc """
  Returns a page of comments published by a user.

  ## Examples

      Accounts.Publish.Comments.paged(user, %{page: 1, size: 20})
  """
  @spec paged(User.t(), map(), User.t() | nil) :: term()
  def paged(user, filter, actor \\ nil) do
    CMS.comments_paged_published_comments(user, filter, actor)
  end

  @doc """
  Returns comments published by a user in one thread.

  ## Examples

      Accounts.Publish.Comments.paged(user, :post, %{page: 1, size: 20}, viewer)
  """
  @spec paged(User.t(), atom(), map(), User.t() | nil) :: term()
  def paged(user, thread, filter, actor) do
    CMS.comments_paged_published_comments(user, thread, filter, actor)
  end
end
