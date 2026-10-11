defmodule GroupherServer.Jobs do
  @moduledoc """
  Public boundary for constructing and scheduling background work.

  Business Contexts enqueue stable job intents here. Jobs workers decode their
  payload and re-enter the owning Context through its root Facade.

      Context caller -> Jobs -> Oban job -> owning Context Facade
  """

  @doc """
  Delegates audition/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.audition(...)
  """
  defdelegate audition(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates comments_new/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.comments_new(...)
  """
  defdelegate comments_new(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates comments_new/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.comments_new(...)
  """
  defdelegate comments_new(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates config_skip_enqueue?/0 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.config_skip_enqueue?(...)
  """
  defdelegate config_skip_enqueue?(), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates enqueue_best_effort/3 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.enqueue_best_effort(...)
  """
  defdelegate enqueue_best_effort(arg1, arg2, arg3), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates later/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.later(...)
  """
  defdelegate later(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates later_new/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.later_new(...)
  """
  defdelegate later_new(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates later_new/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.later_new(...)
  """
  defdelegate later_new(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates notify_comment/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.notify_comment(...)
  """
  defdelegate notify_comment(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates notify_reply/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.notify_reply(...)
  """
  defdelegate notify_reply(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates public_cache_purge_job/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.public_cache_purge_job(...)
  """
  defdelegate public_cache_purge_job(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates public_cache_purge_new/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.public_cache_purge_new(...)
  """
  defdelegate public_cache_purge_new(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates public_cache_purge_new/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.public_cache_purge_new(...)
  """
  defdelegate public_cache_purge_new(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates reconcile_comments_participants/3 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.reconcile_comments_participants(...)
  """
  defdelegate reconcile_comments_participants(arg1, arg2, arg3), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates search_index/3 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.search_index(...)
  """
  defdelegate search_index(arg1, arg2, arg3), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates search_index_new/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.search_index_new(...)
  """
  defdelegate search_index_new(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates search_index_new/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.search_index_new(...)
  """
  defdelegate search_index_new(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates snapshot_refresh/3 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.snapshot_refresh(...)
  """
  defdelegate snapshot_refresh(arg1, arg2, arg3), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates snapshot_refresh_new/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.snapshot_refresh_new(...)
  """
  defdelegate snapshot_refresh_new(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates snapshot_refresh_new/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.snapshot_refresh_new(...)
  """
  defdelegate snapshot_refresh_new(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates subscribe_community/2 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.subscribe_community(...)
  """
  defdelegate subscribe_community(arg1, arg2), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates sync_mentions/1 to the Jobs workflow owner.

  ## Examples

      iex> GroupherServer.Jobs.sync_mentions(...)
  """
  defdelegate sync_mentions(arg1), to: GroupherServer.Jobs.Workflow

  @doc """
  Delegates Jobs.CommunitySetup.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.community_setup_new(...)
  """
  defdelegate community_setup_new(arg1), to: GroupherServer.Jobs.CommunitySetup, as: :new

  @doc """
  Delegates Jobs.CommunitySetup.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.community_setup_new(...)
  """
  defdelegate community_setup_new(arg1, arg2), to: GroupherServer.Jobs.CommunitySetup, as: :new

  @doc """
  Delegates Jobs.CreateCommunity.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.create_community_new(...)
  """
  defdelegate create_community_new(arg1), to: GroupherServer.Jobs.CreateCommunity, as: :new

  @doc """
  Delegates Jobs.CreateCommunity.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.create_community_new(...)
  """
  defdelegate create_community_new(arg1, arg2), to: GroupherServer.Jobs.CreateCommunity, as: :new
end
