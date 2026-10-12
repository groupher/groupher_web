defmodule GroupherServer.Accounts.ProfileViewTracker do
  @moduledoc """
  Owns explicit, synchronous Profile view tracking.

      visible Profile -> RequestActor -> ProfileViewTracker transaction -> User.views
  """

  alias __MODULE__.{Record, DedupeCleanup}
  alias GroupherServer.{Accounts, RequestActor}
  alias Accounts.Model.User
  alias RequestActor.Classification

  @doc "Commits one explicit Profile view and returns the committed counter."
  @spec track(User.t(), User.t() | nil, Classification.t(), keyword()) ::
          {:ok, %{tracked: boolean(), views: non_neg_integer()}} | {:error, term()}
  defdelegate track(profile, viewer, classification, opts \\ []), to: Record

  @doc "Drains expired Profile-view dedupe state within configured budgets."
  @spec cleanup_expired() :: map()
  defdelegate cleanup_expired(), to: DedupeCleanup
end
