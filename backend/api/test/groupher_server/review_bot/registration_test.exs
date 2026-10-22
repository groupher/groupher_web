defmodule GroupherServer.Test.ReviewBot.RegistrationTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{AlertBoard, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias ReviewBot.Model.Check

  setup do
    oban_config =
      :groupher_server
      |> Application.fetch_env!(Oban)
      |> Keyword.merge(testing: :manual, queues: false, plugins: false)

    start_supervised!({Oban, oban_config})
    previous_env = Application.get_env(:groupher_server, :env)
    Application.put_env(:groupher_server, :env, :test_jobs)

    on_exit(fn ->
      if is_nil(previous_env) do
        Application.delete_env(:groupher_server, :env)
      else
        Application.put_env(:groupher_server, :env, previous_env)
      end
    end)

    :ok
  end

  test "no configured rules produce no Check" do
    config = %ReviewConfig{
      scope_key: "platform",
      version: 1,
      publish_mode: :immediate,
      ruleset_id: nil
    }

    assert {:ok, %{checks: [], word_result: nil}} =
             Repo.transact_result(fn ->
               ReviewBot.register_in_transaction(
                 target(),
                 content(),
                 config,
                 Ecto.UUID.generate()
               )
             end)
  end

  test "ai_first rejects a missing ruleset before the content transaction can commit" do
    config = %ReviewConfig{
      scope_key: "platform",
      version: 1,
      publish_mode: :ai_first,
      ruleset_id: nil
    }

    assert {:error, _reason} =
             Repo.transact_result(fn ->
               ReviewBot.register_in_transaction(
                 target(),
                 content(),
                 config,
                 Ecto.UUID.generate()
               )
             end)

    assert Repo.aggregate(Check, :count) == 0
  end

  test "word rules persist a completed signal-only Check and registration is idempotent" do
    ruleset = ruleset(%{"items" => [word_rule()]})
    config = config(ruleset, background_check: false)
    operation_ref = Ecto.UUID.generate()

    register = fn ->
      Repo.transact_result(fn ->
        ReviewBot.register_in_transaction(
          target(),
          content("badword in body"),
          config,
          operation_ref
        )
      end)
    end

    assert {:ok, %{checks: [%Check{} = check], word_result: %{matches: [match]}}} = register.()
    assert match.rule_id == "w1"
    assert check.state == :completed
    assert check.mode == :immediate
    assert check.result == :restrict
    assert check.signals == %{"items" => [%{rule_id: "w1", category: "spam", action: "restrict"}]}
    refute inspect(check.signals) =~ "badword"

    assert {:ok, %{checks: [%Check{id: repeated_id}], word_result: _}} = register.()
    assert repeated_id == check.id
    assert Repo.aggregate(Check, :count) == 1
  end

  test "model rules pin a queued Check and keep content out of the Oban arguments" do
    set_test_provider_profile()
    ruleset = ruleset(%{"items" => [judge_rule()]}, provider_profile: "test-judge")
    config = config(ruleset, background_check: true, publish_mode: :ai_first)

    assert {:ok, %{checks: [%Check{} = check], word_result: nil}} =
             Repo.transact_result(fn ->
               ReviewBot.register_in_transaction(
                 target(human_epoch: 4),
                 content("private body"),
                 config,
                 Ecto.UUID.generate()
               )
             end)

    assert check.state == :queued
    assert check.mode == :ai_first
    assert check.generation == 1
    assert check.human_epoch == 4
    assert check.payload["text"] == %{"title" => "Title", "body" => "private body"}
    refute Map.has_key?(check.payload, "private body")
    refute Map.has_key?(check.payload, "signed_read_url")

    job = Repo.get_by!(Oban.Job, worker: "GroupherServer.Jobs.ReviewBotCheck")
    assert job.args["check_id"] == check.id
  end

  test "edit checks snapshot edit mode instead of the first-publication mode" do
    set_test_provider_profile()
    ruleset = ruleset(%{"items" => [judge_rule()]}, provider_profile: "test-judge")
    config = config(ruleset, background_check: true, publish_mode: :human_first)

    assert {:ok, %{checks: [%Check{} = check]}} =
             Repo.transact_result(fn ->
               ReviewBot.register_in_transaction(
                 target(trigger: :edit),
                 content(),
                 config,
                 Ecto.UUID.generate()
               )
             end)

    assert check.trigger == :edit
    assert check.mode == :immediate
  end

  test "manual rechecks advance deterministic check generation for the same snapshot" do
    ruleset = ruleset(%{"items" => [word_rule()]})
    config = config(ruleset, background_check: false)

    register = fn ->
      Repo.transact_result(fn ->
        ReviewBot.register_in_transaction(
          target(trigger: :manual, human_epoch: 1),
          Map.put(content(), :content_token, "same-content-token"),
          config,
          Ecto.UUID.generate()
        )
      end)
    end

    assert {:ok, %{checks: [%Check{generation: 1} = first]}} = register.()
    assert {:ok, %{checks: [%Check{generation: 2} = second]}} = register.()
    assert first.content_token == second.content_token
    assert first.id != second.id
  end

  defp config(ruleset, opts) do
    %ReviewConfig{
      scope_key: "platform",
      version: 2,
      publish_mode: Keyword.get(opts, :publish_mode, :immediate),
      background_check: Keyword.get(opts, :background_check, false),
      ruleset_id: ruleset.id,
      ruleset: ruleset
    }
  end

  defp ruleset(rules, opts \\ []) do
    {:ok, user} = db_insert(:user)

    attrs = %{
      scope_key: "platform",
      version: 2,
      rules: rules,
      created_by_id: user.id,
      operation_ref: Ecto.UUID.generate(),
      provider_profile: Keyword.get(opts, :provider_profile),
      required_modalities: ["text"]
    }

    %RuleSet{}
    |> RuleSet.changeset(attrs)
    |> Repo.insert!()
  end

  defp set_test_provider_profile do
    previous_token = System.get_env("REVIEW_BOT_TEST_TOKEN")
    previous_config = Application.get_env(:groupher_server, :review_bot)
    System.put_env("REVIEW_BOT_TEST_TOKEN", "test-token")

    Application.put_env(:groupher_server, :review_bot,
      profiles: %{
        "test-judge" => %{
          adapter: :judge_http,
          base_url: "https://judge.example.test",
          model: "test",
          credential_env: "REVIEW_BOT_TEST_TOKEN",
          modalities: [:text]
        }
      }
    )

    on_exit(fn ->
      if is_nil(previous_token) do
        System.delete_env("REVIEW_BOT_TEST_TOKEN")
      else
        System.put_env("REVIEW_BOT_TEST_TOKEN", previous_token)
      end

      if is_nil(previous_config) do
        Application.delete_env(:groupher_server, :review_bot)
      else
        Application.put_env(:groupher_server, :review_bot, previous_config)
      end
    end)
  end

  defp target(opts \\ []) do
    %{
      target_key: "article:target",
      trigger: Keyword.get(opts, :trigger, :submit),
      human_epoch: Keyword.get(opts, :human_epoch, 0)
    }
  end

  defp content(body \\ "body") do
    %{content_token: "token-1", title: "Title", body: body, images: []}
  end

  defp word_rule do
    %{
      "id" => "w1",
      "kind" => "word",
      "value" => "badword",
      "category" => "spam",
      "action" => "restrict"
    }
  end

  defp judge_rule do
    %{
      "id" => "j1",
      "kind" => "judge",
      "value" => "review this",
      "category" => "spam",
      "action" => "restrict"
    }
  end
end
