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

  @doc "Pages a user's published Article paths with explicit Pagi input."
  defdelegate paged_articles(user, thread, filter, pagi), to: Articles, as: :paged
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

  @doc "Pages published Comments with explicit filter and Pagi position."
  defdelegate paged_comments(user, thread, filter, pagi, viewer), to: Comments, as: :paged
end
