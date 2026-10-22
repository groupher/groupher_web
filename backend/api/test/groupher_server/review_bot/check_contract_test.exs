defmodule GroupherServer.Test.ReviewBot.CheckContractTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.{CheckInput, CheckOutput}

  test "runtime profiles require operator credentials and use fixed provider IDs" do
    profiles =
      GroupherServer.ReviewBot.Config.profiles_from_env(%{
        "REVIEW_BOT_JUDGE_URL" => "https://judge.example.test",
        "REVIEW_BOT_JUDGE_TOKEN" => "judge-secret",
        "REVIEW_BOT_OPENAI_MODEL" => "gpt-test"
      })

    assert profiles["judge_http"] == %{
             adapter: :judge_http,
             base_url: "https://judge.example.test",
             model: "default",
             credential_env: "REVIEW_BOT_JUDGE_TOKEN",
             modalities: [:text, :image]
           }

    refute Map.has_key?(profiles, "openai")

    openai_profiles =
      GroupherServer.ReviewBot.Config.profiles_from_env(%{
        "REVIEW_BOT_OPENAI_TOKEN" => "openai-secret",
        "REVIEW_BOT_OPENAI_MODEL" => "gpt-test"
      })

    assert openai_profiles["openai"].model == "gpt-test"
    assert openai_profiles["openai"].base_url == "https://api.openai.com/v1/responses"
    refute Map.has_key?(openai_profiles, "judge_http")
  end

  test "provider routing rejects unknown profiles and adapter identifiers" do
    assert {:error, _reason} = GroupherServer.ReviewBot.check(input(), "missing-profile")
    assert {:error, _reason} = GroupherServer.ReviewBot.Config.adapter(%{adapter: :unknown})

    assert {:ok, GroupherServer.ReviewBot.Adapters.JudgeHTTP} =
             GroupherServer.ReviewBot.Config.adapter(%{adapter: :judge_http})

    assert {:ok, GroupherServer.ReviewBot.Adapters.OpenAI} =
             GroupherServer.ReviewBot.Config.adapter(%{adapter: :openai})
  end

  test "OpenAI adapter emits Responses API text, image and strict output contract" do
    input = %CheckInput{
      input()
      | required_modalities: [:text, :image],
        images: [
          %{signed_read_url: "https://assets.example/read/short-lived", immutable_version: "v7"}
        ]
    }

    request = GroupherServer.ReviewBot.Adapters.OpenAI.request_body(input, "gpt-5-mini")

    assert request["model"] == "gpt-5-mini"

    assert request["input"] |> hd() |> Map.fetch!("content") |> Enum.map(& &1["type"]) ==
             ["input_text", "input_image"]

    assert request["text"]["format"]["strict"]
    assert request["text"]["format"]["schema"]["additionalProperties"] == false
  end

  test "provider output must match the pinned request and cover each rule exactly once" do
    input = input()

    assert {:ok, output} =
             CheckOutput.validate(
               %{
                 "requestId" => input.request_id,
                 "contentToken" => input.content_token,
                 "providerRequestId" => "provider-123",
                 "coverage" => %{"text" => "complete", "image" => "unsupported"},
                 "findings" => [%{"ruleId" => "platform-1", "verdict" => "pass"}]
               },
               input
             )

    assert output.findings == [%{rule_id: "platform-1", verdict: :pass}]
    assert output.coverage == %{text: :complete, image: :unsupported}

    assert {:error, :provider_protocol_error} =
             CheckOutput.validate(
               %{
                 "requestId" => input.request_id,
                 "contentToken" => "stale-token",
                 "providerRequestId" => "provider-123",
                 "coverage" => %{"text" => "complete", "image" => "unsupported"},
                 "findings" => [%{"ruleId" => "platform-1", "verdict" => "pass"}]
               },
               input
             )
  end

  test "provider output rejects missing or duplicate rule findings" do
    input = input()
    payload = payload(input)

    assert {:error, :provider_protocol_error} =
             CheckOutput.validate(%{payload | "findings" => []}, input)

    assert {:error, :provider_protocol_error} =
             CheckOutput.validate(
               %{
                 payload
                 | "findings" => [
                     %{"ruleId" => "platform-1", "verdict" => "pass"},
                     %{"ruleId" => "platform-1", "verdict" => "hit"}
                   ]
               },
               input
             )
  end

  test "provider output rejects undeclared coverage and finding fields" do
    input = input()
    payload = payload(input)

    assert {:error, :provider_protocol_error} =
             CheckOutput.validate(
               %{
                 payload
                 | "coverage" => %{
                     "text" => "complete",
                     "image" => "unsupported",
                     "audio" => "complete"
                   }
               },
               input
             )

    assert {:error, :provider_protocol_error} =
             CheckOutput.validate(
               %{
                 payload
                 | "findings" => [
                     %{"ruleId" => "platform-1", "verdict" => "pass", "reason" => "text"}
                   ]
               },
               input
             )
  end

  test "outcome policy gives explicit restrictions precedence and fails closed on gaps" do
    restricted = %CheckOutput{
      request_id: Ecto.UUID.generate(),
      content_token: "token-1",
      coverage: %{text: :complete, image: :unsupported},
      findings: [%{rule_id: "r1", verdict: :hit}]
    }

    assert %{action: :restrict, signals: [%{category: "spam", action: "restrict"}]} =
             GroupherServer.ReviewBot.Policy.evaluate(
               restricted,
               [%{"id" => "r1", "category" => "spam", "action" => "restrict"}],
               ["text", "image"]
             )

    pass = %CheckOutput{restricted | findings: [], coverage: %{text: :complete, image: :complete}}

    assert %{action: :pass, signals: []} =
             GroupherServer.ReviewBot.Policy.evaluate(pass, [], ["text", "image"])

    incomplete = %CheckOutput{pass | coverage: %{text: :complete, image: :failed}}

    assert %{action: :review, signals: []} =
             GroupherServer.ReviewBot.Policy.evaluate(incomplete, [], ["text", "image"])
  end

  defp input do
    {:ok, input} =
      CheckInput.new(%{
        request_id: Ecto.UUID.generate(),
        check_id: Ecto.UUID.generate(),
        content_token: "article:9:revision:4",
        rules: [%{"id" => "platform-1"}],
        text: %{title: "title", body: "body"},
        required_modalities: [:text]
      })

    input
  end

  defp payload(input) do
    %{
      "requestId" => input.request_id,
      "contentToken" => input.content_token,
      "providerRequestId" => "provider-123",
      "coverage" => %{"text" => "complete", "image" => "unsupported"},
      "findings" => [%{"ruleId" => "platform-1", "verdict" => "pass"}]
    }
  end
end
