defmodule GroupherServer.Accounts.Publish do
  @moduledoc """
  Account-facing read model for a user's published artiments and comments.

  Business position:

      Client / Auth -> Accounts facade -> Query / Projection
                                      -> CMS reads / User projection
  """

  alias __MODULE__.{Articles, Comments, Effects, Projection}
  alias GroupherServer.Accounts

  alias Accounts.Model.User
  alias Helper.T

  @doc """
  Pages a user's published Article paths for the selected thread.

  ## Examples

      Accounts.Publish.paged_articles(user, :post, %{}, %GroupherServer.Pagi.Params.Offset{page: 1, size: 20})
  """
  defdelegate paged_articles(user, thread, filter, pagi), to: Articles, as: :paged

  @doc """
  Pages published Article paths and projects the requesting viewer's state.

  ## Examples

      Accounts.Publish.paged_articles(user, :post, %{}, %GroupherServer.Pagi.Params.Offset{page: 1, size: 20}, viewer)
  """
  defdelegate paged_articles(user, thread, filter, pagi, viewer), to: Articles, as: :paged

  @doc """
  Updates the published-state projection for one thread.

  ## Examples

      Accounts.Publish.update_states(user, :post)
  """
  @spec update_states(User.t(), T.thread()) :: T.domain_res(User.t())
  def update_states(%User{} = user, thread), do: Projection.update_states(user, thread)

  @doc """
  Revalidates the public profile after a published-count projection commits.

  ## Examples

      Accounts.Publish.revalidate_user(user)
  """
  @spec revalidate_user(User.t()) :: {:ok, :pass}
  def revalidate_user(%User{} = user), do: Effects.revalidate_user(user)

  @doc """
  Pages a user's published comments for the selected thread and viewer.

  ## Examples

      Accounts.Publish.paged_comments(user, :post, %{}, %GroupherServer.Pagi.Params.Offset{page: 1, size: 20}, viewer)
  """
  defdelegate paged_comments(user, thread, filter, pagi, viewer), to: Comments, as: :paged
end
