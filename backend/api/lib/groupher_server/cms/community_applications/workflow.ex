defmodule GroupherServer.CMS.CommunityApplications.Workflow do
  @moduledoc """
  Runs expiry maintenance for submitted Community Applications.

  User mutations live in `Commands.Submit` and `Commands.Cancel`. This module
  is intentionally limited to the retryable maintenance workflow invoked by
  the expiry job.

      Oban expiry job
        -> CommunityApplications.Workflow
        -> Lifecycle / Persist / slug claims
  """

  alias GroupherServer.Repo
  alias Ecto.Multi
  alias GroupherServer.CMS.Communities.SlugClaims
  alias GroupherServer.CMS.CommunityApplications.Persist
  alias GroupherServer.CMS.CommunityApplications.Lifecycle, as: ApplicationLifecycle
  alias GroupherServer.CMS.CommunityApplications.Transaction

  @doc "Expires a bounded set of submitted applications whose deadline has passed."
  @spec expire_due(DateTime.t()) :: {:ok, non_neg_integer()} | {:error, term()}
  def expire_due(%DateTime{} = now) do
    applications = Persist.due(now)

    Enum.reduce_while(applications, {:ok, 0}, fn application, {:ok, count} ->
      case expire_one(application.public_ref, now) do
        {:ok, :noop} -> {:cont, {:ok, count}}
        {:ok, _application} -> {:cont, {:ok, count + 1}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
  end

  defp expire_one(public_ref, now) do
    Transaction.run(fn ->
      application = Persist.lock_submitted(public_ref)

      cond do
        is_nil(application) or application.status != :submitted ->
          :noop

        DateTime.compare(application.expires_at, now) == :gt ->
          :noop

        true ->
          operation_ref = "expire_" <> application.public_ref

          Multi.new()
          |> ApplicationLifecycle.add(
            :application,
            :event,
            application,
            :expired,
            %{expired_at: now, expires_at: nil},
            %{
              type: :job,
              operation_ref: operation_ref,
              metadata: %{"worker" => "ExpireSubmitted"},
              occurred_at: now
            }
          )
          |> SlugClaims.release_application(:claim, application, now)
          |> Transaction.run()
          |> unwrap_nested_transaction()
      end
    end)
  end

  defp unwrap_nested_transaction({:ok, %{application: application}}), do: application
  defp unwrap_nested_transaction({:error, _step, reason, _changes}), do: Repo.rollback(reason)
end
