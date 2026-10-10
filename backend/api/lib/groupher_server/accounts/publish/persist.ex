defmodule GroupherServer.Accounts.Publish.Persist do
  @moduledoc """
  Owns the row primitive for published-count metadata.

      Publish.Projection -> Publish.Persist -> User.meta
  """

  alias GroupherServer.Accounts.Model.User
  alias Helper.ORM
  import Helper.Utils, only: [plural: 1]

  @doc """
  Persists one published-count projection in the caller's transaction.

  ## Examples

      Accounts.Publish.Persist.update_published_count(user, :post, 3)
  """
  @spec update_published_count(User.t(), atom(), non_neg_integer()) ::
          {:ok, User.t()} | {:error, term()}
  def update_published_count(%User{} = user, thread, count) do
    ORM.update_meta(user, %{published_count_key(thread) => count})
  end

  defp published_count_key(thread), do: String.to_atom("published_#{plural(thread)}_count")
end
