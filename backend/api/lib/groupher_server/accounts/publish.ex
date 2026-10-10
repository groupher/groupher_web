defmodule GroupherServer.Accounts.Publish do
  @moduledoc """
  Account-facing read model for a user's published artiments and comments.

  Business position:

      Client / Auth -> Accounts facade -> Query / Projection
                                      -> CMS reads / User projection
  """

  alias __MODULE__.{Articles, Comments, Projection}
  alias GroupherServer.Accounts

  alias Accounts.Model.User
  alias Helper.T

  @doc """
  Returns the user's published articles for a thread.

  ## Examples

      Accounts.Publish.paged_articles(user, :post, %{page: 1, size: 20})
  """
  @spec paged_articles(User.t(), T.thread(), map()) :: T.domain_res(T.paged_data())
  def paged_articles(%User{} = user, thread, filter), do: Articles.paged(user, thread, filter)

  @doc """
  Returns published articles with viewer-aware fields.

  ## Examples

      Accounts.Publish.paged_articles(user, :post, %{page: 1, size: 20}, viewer)
  """
  def paged_articles(%User{} = user, thread, filter, actor) do
    Articles.paged(user, thread, filter, actor)
  end

  @doc """
  Updates the published-state projection for one thread.

  ## Examples

      Accounts.Publish.update_states(user, :post)
  """
  @spec update_states(User.t(), T.thread()) :: T.domain_res(User.t())
  def update_states(%User{} = user, thread), do: Projection.update_states(user, thread)

  @doc """
  Returns the user's published comments.

  ## Examples

      Accounts.Publish.paged_comments(user, %{page: 1, size: 20})
      Accounts.Publish.paged_comments(user, %{page: 1, size: 20}, viewer)
      Accounts.Publish.paged_comments(user, :post, %{page: 1, size: 20})
  """
  @spec paged_comments(User.t(), map()) :: T.domain_res(T.paged_data())
  def paged_comments(%User{} = user, filter), do: Comments.paged(user, filter)

  @doc """
  Returns published comments for a viewer or a selected thread.

  ## Examples

      Accounts.Publish.paged_comments(user, %{page: 1, size: 20}, viewer)
      Accounts.Publish.paged_comments(user, :post, %{page: 1, size: 20})
  """
  def paged_comments(%User{} = user, filter, actor) when is_map(filter) do
    Comments.paged(user, filter, actor)
  end

  @spec paged_comments(User.t(), T.thread(), map()) :: T.domain_res(T.paged_data())
  def paged_comments(%User{} = user, thread, filter) when is_atom(thread) do
    Comments.paged(user, thread, filter, nil)
  end

  @doc """
  Returns thread-filtered published comments with viewer-aware fields.

  ## Examples

      Accounts.Publish.paged_comments(user, :post, %{page: 1, size: 20}, viewer)
  """
  def paged_comments(%User{} = user, thread, filter, actor) do
    Comments.paged(user, thread, filter, actor)
  end
end
