defmodule GroupherServer.Accounts.Publish.Articles do
  @moduledoc """
  Account-side view for a user's published articles.

  The CMS article domain owns publication queries. This module adapts those
  queries for profile pages. Published-count rebuilding belongs to
  `Accounts.Publish.Projection`.

  Business position:

      profile read -> CMS.Articles.paged_published -> public article page
      publication -> Publish.Projection -> User.meta count
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User

  @doc """
  Returns a page of articles published by a user.

  ## Examples

      Accounts.Publish.Articles.paged(user, :post, %{page: 1, size: 20})
  """
  @spec paged(User.t(), atom(), map(), User.t() | nil) :: term()
  def paged(%User{} = target_user, thread, filter, actor \\ nil) do
    CMS.Articles.paged_published(thread, filter, target_user, actor)
  end
end
