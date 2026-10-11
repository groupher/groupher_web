defmodule GroupherServer.Jobs.Workflow do
  @moduledoc """
  Application-facing facade for background jobs.

  Business modules should call this facade instead of `Oban.insert/2` directly.

  Business position:

      mutation transaction
        -> required named Jobs API
        -> Oban insert result participates in commit / rollback

      committed mutation or successful read
        -> enqueue_best_effort
        -> optional named Jobs API
        -> log safely on enqueue failure, preserve caller result
  """

  require Logger

  alias GroupherServer.Jobs
  alias Jobs.{Codec, Config}

  @type later_job :: {module(), atom(), list()}
  @type safe_resource_ref :: integer() | String.t() | atom() | nil

  @doc """
  Builds the Oban changeset for one PublicCache invalidation delivery.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.public_cache_purge_job(...)
  """
  @spec public_cache_purge_job(Ecto.UUID.t()) :: Ecto.Changeset.t()
  def public_cache_purge_job(invalidation_id) do
    Jobs.PublicCachePurge.new(%{invalidation_id: invalidation_id})
  end

  @doc """
  Enqueues an optional job without allowing enqueue failure to fail the
  completed business operation.

  The log contains only the finite job name, a caller-supplied safe resource
  reference, and a stable failure kind. The callback result or exception is
  never inspected into logs.

  ## Examples

      Jobs.enqueue_best_effort(:notify_comment, comment.id, fn ->
        Jobs.notify_comment(comment, actor)
      end)

      #=> {:ok, :pass}
  """
  @spec enqueue_best_effort(atom(), safe_resource_ref(), (-> term())) :: {:ok, :pass}
  def enqueue_best_effort(job_name, resource_ref, enqueue)
      when is_atom(job_name) and
             (is_integer(resource_ref) or is_binary(resource_ref) or is_atom(resource_ref) or
                is_nil(resource_ref)) and is_function(enqueue, 0) do
    case enqueue.() do
      {:ok, _job} ->
        {:ok, :pass}

      {:error, _reason} ->
        log_best_effort_failure(job_name, resource_ref, :error_result)

      _other ->
        log_best_effort_failure(job_name, resource_ref, :unexpected_result)
    end
  rescue
    _exception ->
      log_best_effort_failure(job_name, resource_ref, :exception)
  catch
    :throw, _reason ->
      log_best_effort_failure(job_name, resource_ref, :throw)

    :exit, _reason ->
      log_best_effort_failure(job_name, resource_ref, :exit)
  end

  @doc """
  Enqueues a compatibility job that invokes the encoded module/function/arguments tuple.

  ## Examples

      Jobs.later({GroupherServer.Jobs.Comments, :perform, [payload]})
  """
  @spec later(later_job()) :: {:ok, :pass}
  def later({mod, func, args} = job) when is_atom(mod) and is_atom(func) and is_list(args) do
    if Config.skip_enqueue?() do
      {:ok, :pass}
    else
      %{job: Codec.encode(job)}
      |> Jobs.Later.new()
      |> insert_pass()
    end
  end

  @doc """
  Enqueues a compatibility job whose insertion must participate in the caller transaction.

  ## Examples

      Jobs.Workflow.enqueue_later({SomeModule, :run, [payload]})
  """
  @spec enqueue_later(later_job()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def enqueue_later({mod, func, args} = job)
      when is_atom(mod) and is_atom(func) and is_list(args) do
    if Config.skip_enqueue?() do
      {:ok, :pass}
    else
      %{job: Codec.encode(job)}
      |> Jobs.Later.new()
      |> Oban.insert()
    end
  end

  @doc """
  Enqueues mention reconciliation for one comment-like artiment.

  ## Examples

      Jobs.sync_mentions(comment)
      #=> {:ok, %Oban.Job{}} | {:ok, :pass} | {:error, reason}
  """
  @spec sync_mentions(struct()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def sync_mentions(artiment), do: comments_job(:sync_mentions, %{artiment: artiment})

  @doc """
  Enqueues content audition for one comment-like artiment.

  ## Examples

      Jobs.audition(comment)
  """
  @spec audition(struct()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def audition(artiment), do: comments_job(:audition, %{artiment: artiment})

  @doc """
  Enqueues the notification produced by a new top-level comment.

  ## Examples

      Jobs.notify_comment(comment, actor)
  """
  @spec notify_comment(struct(), struct()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def notify_comment(comment, actor) do
    comments_job(:notify_comment, %{comment: comment, from_user: actor})
  end

  @doc """
  Enqueues the notification produced by a reply.

  ## Examples

      Jobs.notify_reply(reply_comment, actor)
  """
  @spec notify_reply(struct(), struct()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def notify_reply(reply_comment, actor) do
    comments_job(:notify_reply, %{reply_comment: reply_comment, from_user: actor})
  end

  @doc """
  Enqueues community subscription after a successful comment mutation.

  ## Examples

      Jobs.subscribe_community(community, actor)
  """
  @spec subscribe_community(struct(), struct()) ::
          {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def subscribe_community(target, actor) do
    comments_job(:subscribe_community, %{target: target, user: actor})
  end

  @doc """
  Enqueues repair of an article's persisted comment participant count.

  ## Examples

      Jobs.reconcile_comments_participants(:post, article_id, 12)
  """
  @spec reconcile_comments_participants(atom(), Ecto.UUID.t(), non_neg_integer()) ::
          {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def reconcile_comments_participants(thread, article_id, total_count)
      when is_atom(thread) and is_binary(article_id) and is_integer(total_count) and
             total_count >= 0 do
    comments_job(:reconcile_comments_participants, %{
      thread: thread,
      article_id: article_id,
      total_count: total_count
    })
  end

  @doc """
  Enqueues an artiment search-index update unless job insertion is disabled.

  ## Examples

      Jobs.search_index(:updated, :post, article_ref)
  """
  @spec search_index(atom(), atom(), term()) :: {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def search_index(action, thread, ref) when is_atom(action) and is_atom(thread) do
    if Config.skip_enqueue?() do
      {:ok, :pass}
    else
      %{action: Atom.to_string(action), thread: Atom.to_string(thread), ref: ref}
      |> Jobs.SearchIndex.new()
      |> Oban.insert()
    end
  end

  @doc """
  Enqueues a snapshot refresh for the supplied resource kind and references.

  ## Examples

      Jobs.snapshot_refresh(:article, [article_ref], [])
  """
  @spec snapshot_refresh(atom(), term(), keyword()) ::
          {:ok, Oban.Job.t() | :pass} | {:error, term()}
  def snapshot_refresh(kind, refs, opts) when is_atom(kind) and is_list(opts) do
    if Config.skip_enqueue?() do
      {:ok, :pass}
    else
      %{kind: Atom.to_string(kind), refs: Codec.encode(refs), opts: Codec.encode(opts)}
      |> Jobs.SnapshotRefresh.new()
      |> Oban.insert()
    end
  end

  defp insert_pass(changeset) do
    case Oban.insert(changeset) do
      {:ok, _job} -> {:ok, :pass}
      {:error, _reason} -> {:ok, :pass}
    end
  rescue
    _ -> {:ok, :pass}
  end

  defp comments_job(kind, payload) do
    if Config.skip_enqueue?() do
      {:ok, :pass}
    else
      %{kind: Atom.to_string(kind), payload: Codec.encode(payload)}
      |> Jobs.Comments.new()
      |> Oban.insert()
    end
  end

  defp log_best_effort_failure(job_name, resource_ref, failure_kind) do
    Logger.warning(
      "optional job enqueue failed job=#{job_name} resource_ref=#{resource_ref || "none"} failure=#{failure_kind}"
    )

    {:ok, :pass}
  end

  @doc """
  Delegates GroupherServer.Jobs.Comments.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.comments_new(...)
  """
  defdelegate comments_new(arg1), to: GroupherServer.Jobs.Comments, as: :new

  @doc """
  Delegates GroupherServer.Jobs.Comments.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.comments_new(...)
  """
  defdelegate comments_new(arg1, arg2), to: GroupherServer.Jobs.Comments, as: :new

  @doc """
  Delegates GroupherServer.Jobs.Config.skip_enqueue?/0 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.config_skip_enqueue?(...)
  """
  defdelegate config_skip_enqueue?(), to: GroupherServer.Jobs.Config, as: :skip_enqueue?

  @doc """
  Delegates GroupherServer.Jobs.Later.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.later_new(...)
  """
  defdelegate later_new(arg1), to: GroupherServer.Jobs.Later, as: :new

  @doc """
  Delegates GroupherServer.Jobs.Later.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.later_new(...)
  """
  defdelegate later_new(arg1, arg2), to: GroupherServer.Jobs.Later, as: :new

  @doc """
  Delegates GroupherServer.Jobs.PublicCachePurge.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.public_cache_purge_new(...)
  """
  defdelegate public_cache_purge_new(arg1), to: GroupherServer.Jobs.PublicCachePurge, as: :new

  @doc """
  Delegates GroupherServer.Jobs.PublicCachePurge.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.public_cache_purge_new(...)
  """
  defdelegate public_cache_purge_new(arg1, arg2),
    to: GroupherServer.Jobs.PublicCachePurge,
    as: :new

  @doc """
  Delegates GroupherServer.Jobs.SearchIndex.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.search_index_new(...)
  """
  defdelegate search_index_new(arg1), to: GroupherServer.Jobs.SearchIndex, as: :new

  @doc """
  Delegates GroupherServer.Jobs.SearchIndex.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.search_index_new(...)
  """
  defdelegate search_index_new(arg1, arg2), to: GroupherServer.Jobs.SearchIndex, as: :new

  @doc """
  Delegates GroupherServer.Jobs.SnapshotRefresh.new/1 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.snapshot_refresh_new(...)
  """
  defdelegate snapshot_refresh_new(arg1), to: GroupherServer.Jobs.SnapshotRefresh, as: :new

  @doc """
  Delegates GroupherServer.Jobs.SnapshotRefresh.new/2 through the Jobs Context boundary.

  ## Examples

      iex> GroupherServer.Jobs.Workflow.snapshot_refresh_new(...)
  """
  defdelegate snapshot_refresh_new(arg1, arg2), to: GroupherServer.Jobs.SnapshotRefresh, as: :new
end
