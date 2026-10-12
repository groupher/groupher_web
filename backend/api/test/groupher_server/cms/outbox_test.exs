defmodule GroupherServer.Test.CMS.OutboxTest do
  @moduledoc false

  use GroupherServer.TestMate

  alias GroupherServer.{CMS, Repo}
  alias CMS.Outbox.Event

  test "an event is completed once and duplicate delivery is a no-op" do
    assert {:ok, event} =
             CMS.Outbox.send(%{
               event: "test.completed",
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: "test",
               resource_id: "one",
               command_id: Ecto.UUID.generate(),
               data: %{value: 1}
             })

    assert {:ok, :done} =
             CMS.Outbox.execute(event.id, fn received ->
               send(self(), {:outbox_action, received.id, received.attempts})
               {:ok, :done}
             end)

    assert_receive {:outbox_action, id, 1}
    assert id == event.id

    assert {:ok, :done} =
             CMS.Outbox.execute(event.id, fn _received ->
               send(self(), :must_not_run)
               {:ok, :wrong}
             end)

    refute_receive :must_not_run
    assert Repo.get!(Event, event.id).status == :done
  end

  test "stores rolling-safe status values while exposing the current lifecycle" do
    assert {:ok, event} =
             CMS.Outbox.send(event_attrs("test.status_storage", Ecto.UUID.generate()))

    assert %{rows: [["pending"]]} =
             Repo.query!("SELECT status FROM cms.outbox_events WHERE id::text = $1", [event.id])

    assert Repo.get!(Event, event.id).status == :waiting
  end

  test "Community provisioning resolves the string Outbox resource id as a database id" do
    {:ok, community} = db_insert(:community)

    assert {:ok, event} =
             CMS.Outbox.send(%{
               event: "community.analysis_provision",
               worker: GroupherServer.Jobs.CMSOutboxCommunity,
               resource_type: "community",
               resource_id: community.id,
               identity: {:workflow, "community-analysis:#{community.id}"},
               effect_key: "analysis_provision"
             })

    assert {:ok, :pass} =
             GroupherServer.Jobs.CMSOutboxCommunity.perform(%Oban.Job{
               args: %{"event_id" => event.id},
               attempt: 1,
               max_attempts: 3
             })

    assert Repo.get!(Event, event.id).status == :done
  end

  test "a failed event can be claimed and retried" do
    assert {:ok, event} =
             CMS.Outbox.send(%{
               event: "test.retry",
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: "test",
               resource_id: "two",
               command_id: Ecto.UUID.generate()
             })

    assert {:error, :temporary_failure} =
             CMS.Outbox.execute(event.id, fn _received -> {:error, :temporary_failure} end)

    assert Repo.get!(Event, event.id).status == :retrying

    assert {:ok, :recovered} =
             CMS.Outbox.execute(event.id, fn _received -> {:ok, :recovered} end)

    assert Repo.get!(Event, event.id).status == :done
  end

  test "requires an explicit worker and command id" do
    assert {:error, :outbox_worker_required} =
             CMS.Outbox.send(%{
               event: "test.missing_worker",
               resource_type: "test",
               resource_id: "missing",
               command_id: Ecto.UUID.generate()
             })

    assert {:error, :outbox_command_id_required} =
             CMS.Outbox.send(%{
               event: "test.missing_command",
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: "test",
               resource_id: "missing"
             })
  end

  test "event insertion rolls back with the enclosing transaction" do
    command_id = Ecto.UUID.generate()

    assert {:error, :rolled_back} =
             Repo.transaction(fn ->
               assert {:ok, _event} = CMS.Outbox.send(event_attrs("test.rollback", command_id))
               Repo.rollback(:rolled_back)
             end)

    refute Repo.exists?(from(event in Event, where: event.command_id == ^command_id))
  end

  test "the command-event-resource identity is unique" do
    attrs = event_attrs("test.unique", Ecto.UUID.generate())
    assert {:ok, first} = CMS.Outbox.send(attrs)
    assert {:ok, second} = CMS.Outbox.send(attrs)
    assert second.id == first.id
    assert Repo.aggregate(Event, :count, :id) == 1
  end

  test "workflow identity is separate from command identity" do
    assert {:ok, event} =
             CMS.Outbox.send(%{
               event: "test.workflow",
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: "asset",
               resource_id: 42,
               identity: {:workflow, "reconcile-run-42"},
               effect_key: "asset:42"
             })

    assert event.identity_type == :workflow
    assert event.command_id == "reconcile-run-42"
    assert event.effect_key == "asset:42"
  end

  test "one command can own multiple effect scopes without a second uuid" do
    command_id = Ecto.UUID.generate()

    assert {:ok, _source} = CMS.Outbox.send(event_attrs("test.scope", command_id))

    assert {:ok, destination} =
             CMS.Outbox.send(%{
               event: "test.scope",
               worker: GroupherServer.Jobs.CMSOutboxArticle,
               resource_type: "test",
               resource_id: "destination",
               identity: {:command, command_id},
               effect_key: "destination"
             })

    assert destination.command_id == command_id
    assert destination.identity_type == :command
  end

  test "a live lease makes a second delivery busy" do
    {:ok, event} = CMS.Outbox.send(event_attrs("test.busy", Ecto.UUID.generate()))

    event
    |> Event.changeset(%{
      status: :running,
      attempts: 1,
      locked_at: DateTime.utc_now(:second),
      locked_by: "live-worker"
    })
    |> Repo.update!()

    assert {:busy, seconds} = CMS.Outbox.execute(event.id, fn _event -> {:ok, :nope} end)
    assert seconds in 1..120
  end

  test "an expired lease is reclaimed" do
    {:ok, event} = CMS.Outbox.send(event_attrs("test.expired_lease", Ecto.UUID.generate()))

    event
    |> Event.changeset(%{
      status: :running,
      attempts: 1,
      locked_at: DateTime.add(DateTime.utc_now(:second), -121, :second),
      locked_by: "old-worker"
    })
    |> Repo.update!()

    assert {:ok, :reclaimed} =
             CMS.Outbox.execute(event.id, fn _event -> {:ok, :reclaimed} end)

    assert Repo.get!(Event, event.id).attempts == 2
  end

  test "a retrying event can be marked failed after the final attempt" do
    {:ok, event} = CMS.Outbox.send(event_attrs("test.failed", Ecto.UUID.generate()))

    assert {:error, :permanent_failure} =
             CMS.Outbox.execute(event.id, fn _event -> {:error, :permanent_failure} end)

    assert {:ok, :pass} = CMS.Outbox.mark_failed(event.id)
    assert Repo.get!(Event, event.id).status == :failed

    assert {:error, :outbox_event_failed} =
             CMS.Outbox.execute(event.id, fn _ -> {:ok, :nope} end)
  end

  defp event_attrs(event, command_id) do
    %{
      event: event,
      worker: GroupherServer.Jobs.CMSOutboxArticle,
      resource_type: "test",
      resource_id: event,
      command_id: command_id
    }
  end
end
