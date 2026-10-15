defmodule GroupherServer.CMS.Assets.ProviderReconciliation do
  @moduledoc """
  Repairs provider-deletion intents for database assets already marked deleted.

  Reconciliation is deliberately an outbox repair path: it never resurrects an
  asset and it never calls the provider inline from a request.

  Business position:

      asset maintenance job
        -> ProviderReconciliation
        -> missing provider-delete intent -> Asset cleanup worker
  """

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}
  alias CMS.Assets.{Effects, Workflow}
  alias CMS.Model.{AssetWorkflowRun, AssetWorkflowStep}
  alias CMS.Model.{Community, CommunityAsset}
  alias CMS.Outbox.Event

  @default_age_seconds 15 * 60

  @doc "Re-enqueues missing provider-delete intents for old soft-deleted assets."
  def enqueue_missing(%Community{id: community_id}, opts \\ []) do
    workflow_ref = Keyword.get(opts, :workflow_ref)

    if is_binary(workflow_ref) and workflow_ref != "" do
      enqueue_missing_for_workflow(community_id, opts, workflow_ref)
    else
      {:error, :workflow_ref_required}
    end
  end

  defp enqueue_missing_for_workflow(community_id, opts, workflow_ref) do
    cutoff =
      DateTime.add(
        DateTime.utc_now(:second),
        -Keyword.get(opts, :age_seconds, @default_age_seconds),
        :second
      )

    assets =
      Repo.all(
        from(asset in CommunityAsset,
          where:
            asset.community_id == ^community_id and asset.status == :deleted and
              not is_nil(asset.deleted_at) and asset.deleted_at <= ^cutoff,
          order_by: [asc: asset.deleted_at, asc: asset.id]
        )
      )

    with {:ok, run} <-
           Workflow.ensure_run(%{
             workflow_ref: workflow_ref,
             workflow_type: "provider_reconciliation",
             community_id: community_id,
             resource_type: "community",
             resource_id: to_string(community_id),
             status: :pending
           }),
         owner <- workflow_owner(workflow_ref),
         run_claim <- Workflow.claim_run(run, owner) do
      handle_run_claim(run_claim, assets, workflow_ref, owner)
    else
      {:error, reason} ->
        {:error, reason}
    end
  end

  defp handle_run_claim({:ok, run_state}, assets, workflow_ref, owner) do
    result =
      with {:ok, steps} <- ensure_steps(run_state, assets),
           {:ok, result} <- process_steps(steps, workflow_ref, owner),
           {:ok, finished} <- Workflow.finish_run(run_state, owner) do
        {:ok, Map.merge(result, %{run_ref: workflow_ref, status: finished.status})}
      end

    finalize_claim_result(result, run_state, owner)
  end

  defp handle_run_claim({:completed, run}, _assets, workflow_ref, _owner) do
    {:ok, %{run_ref: workflow_ref, status: run.status, enqueued: 0, skipped: 0}}
  end

  defp handle_run_claim({:busy, seconds}, _assets, _workflow_ref, _owner) do
    {:error, {:workflow_busy, seconds}}
  end

  defp handle_run_claim({:error, reason}, _assets, _workflow_ref, _owner), do: {:error, reason}

  defp finalize_claim_result({:ok, _result} = success, _run_state, _owner), do: success

  defp finalize_claim_result({:error, reason}, run_state, owner) do
    _ = Workflow.fail_run(run_state, owner, reason)
    {:error, reason}
  end

  defp ensure_steps(%AssetWorkflowRun{} = run, assets) do
    Enum.reduce_while(assets, {:ok, []}, fn asset, {:ok, steps} ->
      case Workflow.ensure_step(run, %{
             step_ref: "asset:#{asset.id}",
             resource_type: "community_asset",
             resource_id: to_string(asset.id),
             status: :pending,
             payload: %{asset_id: asset.id, public_ref: asset.public_ref},
             result: %{},
             attempts: 0
           }) do
        {:ok, step} -> {:cont, {:ok, [step | steps]}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> case do
      {:ok, steps} -> {:ok, Enum.reverse(steps)}
      error -> error
    end
  end

  defp process_steps(steps, workflow_ref, owner) do
    Enum.reduce_while(steps, {:ok, %{enqueued: 0, skipped: 0}}, fn step, {:ok, result} ->
      case Workflow.claim_step(step, owner) do
        {:completed, _step} ->
          {:cont, {:ok, %{result | skipped: result.skipped + 1}}}

        {:busy, seconds} ->
          {:halt, {:error, {:workflow_step_busy, seconds}}}

        {:ok, claimed} ->
          process_claimed_step(claimed, workflow_ref, owner, result)
      end
    end)
  end

  defp process_claimed_step(claimed, workflow_ref, owner, result) do
    if pending_intent?(claimed.resource_id) do
      _ = Workflow.complete_step(claimed, owner, %{"outbox" => "present"})
      {:cont, {:ok, %{result | skipped: result.skipped + 1}}}
    else
      enqueue_claimed_step(claimed, workflow_ref, owner, result)
    end
  end

  defp enqueue_claimed_step(claimed, workflow_ref, owner, result) do
    case enqueue_provider_delete(claimed, workflow_ref) do
      {:ok, _event} ->
        _ = Workflow.complete_step(claimed, owner, %{"outbox" => "created"})
        {:cont, {:ok, %{result | enqueued: result.enqueued + 1}}}

      {:error, reason} = error ->
        _ = Workflow.fail_step(claimed, owner, reason)
        {:halt, error}
    end
  end

  defp enqueue_provider_delete(%AssetWorkflowStep{} = step, workflow_ref) do
    Repo.transaction(fn ->
      case Repo.get(CommunityAsset, step.resource_id) do
        %CommunityAsset{} = asset ->
          Effects.enqueue_provider_delete(asset, {:workflow, workflow_ref}, retry_failed: true)

        nil ->
          Repo.rollback(:asset_not_found)
      end
    end)
    |> case do
      {:ok, {:ok, event}} -> {:ok, event}
      {:ok, {:error, reason}} -> {:error, reason}
      {:error, reason} -> {:error, reason}
    end
  end

  defp workflow_owner(workflow_ref) do
    "provider-reconciliation:#{workflow_ref}:#{Ecto.UUID.generate()}"
  end

  @doc "Returns provider objects that have no Phoenix asset authority row."
  def scan_provider_orphans(community, provider_objects, opts \\ [])

  def scan_provider_orphans(%Community{} = community, provider_objects, opts)
      when is_list(provider_objects) and is_list(opts) do
    authorities = authority_keys(community)

    cutoff =
      DateTime.add(
        DateTime.utc_now(:second),
        -Keyword.get(opts, :grace_seconds, 15 * 60),
        :second
      )

    active_upload_keys = MapSet.new(Keyword.get(opts, :active_upload_keys, []))

    {:ok,
     Enum.reject(provider_objects, fn object ->
       identity = provider_identity(object)

       MapSet.member?(authorities, identity) or
         MapSet.member?(active_upload_keys, identity) or recent_provider_object?(object, cutoff)
     end)}
  end

  @doc false
  def scan_provider_orphans(%Community{} = community, fetch_page, opts)
      when is_function(fetch_page, 2) and is_list(opts) do
    cursor = Keyword.get(opts, :cursor)
    limit = opts |> Keyword.get(:limit, 100) |> min(500) |> max(1)

    with {:ok, %{objects: objects, next_cursor: next_cursor}} <- fetch_page.(cursor, limit),
         {:ok, orphans} <- scan_provider_orphans(community, objects, opts) do
      {:ok, %{orphans: orphans, next_cursor: next_cursor, cursor: cursor, limit: limit}}
    end
  end

  defp authority_keys(%Community{id: community_id}) do
    Repo.all(
      from(asset in CommunityAsset,
        where:
          asset.community_id == ^community_id and not is_nil(asset.storage) and
            not is_nil(asset.storage_key),
        select: {asset.storage, asset.storage_key}
      )
    )
    |> MapSet.new()
  end

  defp provider_identity(object) do
    {Map.get(object, :storage) || Map.get(object, "storage"),
     Map.get(object, :storage_key) || Map.get(object, "storageKey") ||
       Map.get(object, "storage_key")}
  end

  defp recent_provider_object?(object, cutoff) do
    case Map.get(object, :inserted_at) || Map.get(object, "inserted_at") ||
           Map.get(object, :created_at) || Map.get(object, "created_at") do
      %DateTime{} = inserted_at -> DateTime.compare(inserted_at, cutoff) == :gt
      _ -> false
    end
  end

  defp pending_intent?(asset_id) do
    Repo.exists?(
      from(event in Event,
        where:
          event.event == "asset.provider_delete" and event.resource_type == "community_asset" and
            event.resource_id == ^to_string(asset_id) and
            event.status in [:waiting, :running, :retrying, :done]
      )
    )
  end
end
