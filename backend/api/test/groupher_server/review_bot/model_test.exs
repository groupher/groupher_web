defmodule GroupherServer.Test.ReviewBot.ModelTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.Model.{Attempt, Check}

  test "checks use UUID identity and pin a ruleset, target and generation" do
    assert Check.__schema__(:type, :id) == Ecto.UUID

    changeset =
      Check.changeset(%Check{}, %{
        target_key: "comment:8",
        scope_key: "community:2",
        content_token: "v3",
        ruleset_id: 4,
        config_version: 2,
        mode: :immediate,
        generation: 1,
        trigger: :submit,
        state: :queued,
        operation_ref: Ecto.UUID.generate()
      })

    assert changeset.valid?

    refute Check.changeset(%Check{}, %{
             target_key: "comment:8",
             scope_key: "community:2",
             content_token: "v3",
             ruleset_id: 4,
             config_version: 2,
             mode: :immediate,
             generation: 0,
             trigger: :submit,
             state: :queued,
             operation_ref: Ecto.UUID.generate()
           }).valid?
  end

  test "attempts record bounded provider metadata only" do
    attempt =
      Attempt.changeset(%Attempt{}, %{
        check_id: Ecto.UUID.generate(),
        number: 1,
        state: :running,
        started_at: DateTime.utc_now(),
        provider_profile: "judge:community",
        request_id: Ecto.UUID.generate()
      })

    assert attempt.valid?
    refute :payload in Attempt.__schema__(:fields)

    refute Attempt.changeset(%Attempt{}, %{
             check_id: Ecto.UUID.generate(),
             number: 0,
             state: :running,
             started_at: DateTime.utc_now(),
             provider_profile: "judge:community",
             request_id: Ecto.UUID.generate()
           }).valid?
  end
end
