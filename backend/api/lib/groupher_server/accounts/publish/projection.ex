defmodule GroupherServer.Accounts.Publish.Projection do
  @moduledoc """
  Rebuilds the published-count projection after CMS publication changes.

      CMS publication -> count query -> Persist -> Effects
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias Accounts.Publish.{Effects, Persist}

  @doc """
  Rebuilds one user's published-count metadata for a thread.

  The caller owns the surrounding transaction when this is invoked from a CMS
  publication workflow.

  ## Examples

      Accounts.Publish.Projection.update_states(user, :post)
  """
  @spec update_states(User.t(), atom()) :: {:ok, User.t()} | {:error, term()}
  def update_states(%User{} = user, thread) do
    with {:ok, published_count} <- CMS.Articles.count_published(thread, user),
         {:ok, updated_user} <- Persist.update_published_count(user, thread, published_count) do
      Effects.revalidate_user(updated_user)
      {:ok, updated_user}
    end
  end
end
