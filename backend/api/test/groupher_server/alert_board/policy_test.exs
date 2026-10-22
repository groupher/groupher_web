defmodule GroupherServer.Test.AlertBoard.PolicyTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{AlertBoard, ReviewBot}

  alias AlertBoard.Policy
  alias ReviewBot.Model.Check

  test "a complete pass releases only the same-scope AI and passed rule holds" do
    check = check(:ai_first, :pass, [%{"rule_id" => "r1", "verdict" => "pass"}])

    restrictions = [
      restriction("ai", :awaiting_ai, "platform", "token-1"),
      restriction("passed", :rule_hit, "platform", "token-1", "rule:r1"),
      restriction("unmatched", :rule_hit, "platform", "token-1", "rule:r2"),
      restriction("manual", :manual_hold, "platform", "token-1", "decision:1"),
      restriction("other-scope", :awaiting_ai, "community:8", "token-1")
    ]

    assert %{action: :pass, add_restrictions: [], end_restriction_ids: ["ai", "passed"]} =
             Policy.review_check(check, restrictions)
  end

  test "a pass on the current token can release the same rule hold created for older content" do
    check = %{
      check(:immediate, :pass, [%{"rule_id" => "r1", "verdict" => "pass"}])
      | content_token: "token-2"
    }

    old_rule_hold = restriction("old-rule", :rule_hit, "platform", "token-1", "rule:r1")
    old_ai_wait = restriction("old-ai", :awaiting_ai, "platform", "token-1")

    assert %{end_restriction_ids: ["old-rule"]} =
             Policy.review_check(check, [old_rule_hold, old_ai_wait])
  end

  test "pass evidence clears resolved rule hits even when another rule still restricts" do
    check =
      check(:immediate, :restrict, [
        %{"rule_id" => "r1", "verdict" => "pass"},
        %{"rule_id" => "r2", "action" => "restrict", "verdict" => "hit"}
      ])

    assert %{action: :restrict, end_restriction_ids: ["old-rule"]} =
             Policy.review_check(check, [
               restriction("old-rule", :rule_hit, "platform", "token-1", "rule:r1")
             ])
  end

  test "AI-first uncertainty replaces awaiting-ai with awaiting-human" do
    check = check(:ai_first, :review, [%{"rule_id" => "r1", "verdict" => "uncertain"}])

    assert %{action: :review, add_restrictions: [restriction], end_restriction_ids: ["ai"]} =
             Policy.review_check(check, [restriction("ai", :awaiting_ai, "platform", "token-1")])

    assert restriction.kind == :awaiting_human
    assert restriction.scope_key == "platform"
    assert restriction.content_token == "token-1"
  end

  test "a failed AI check replaces awaiting-ai with awaiting-human" do
    failed = %{check(:ai_first, nil, []) | state: :failed, result: nil}
    awaiting_ai = restriction("ai", :awaiting_ai, "platform", "token-1")

    assert %{action: :review, add_restrictions: [human], end_restriction_ids: ["ai"]} =
             Policy.review_check(failed, [awaiting_ai])

    assert human.kind == :awaiting_human
    assert human.content_token == "token-1"
  end

  test "human-first pass keeps its human hold and restrictive hits replace only AI wait" do
    pass = check(:human_first, :pass, [%{"rule_id" => "r1", "verdict" => "pass"}])
    awaiting_human = restriction("human", :awaiting_human, "platform", "token-1")

    assert %{action: :review, add_restrictions: [], end_restriction_ids: []} =
             Policy.review_check(pass, [awaiting_human])

    restrict =
      check(:ai_first, :restrict, [
        %{
          "rule_id" => "r2",
          "category" => "spam",
          "action" => "restrict",
          "verdict" => "hit"
        }
      ])

    assert %{action: :restrict, add_restrictions: [rule_hit], end_restriction_ids: ["ai"]} =
             Policy.review_check(restrict, [
               restriction("ai", :awaiting_ai, "platform", "token-1")
             ])

    assert rule_hit.cause_key == "rule:r2"
    assert rule_hit.kind == :rule_hit
    assert rule_hit.check_id == restrict.id
  end

  defp check(mode, result, signals) do
    %Check{
      id: Ecto.UUID.generate(),
      scope_key: "platform",
      content_token: "token-1",
      mode: mode,
      result: result,
      state: :completed,
      signals: %{"items" => signals}
    }
  end

  defp restriction(id, kind, scope_key, content_token, cause_key \\ nil) do
    %{
      id: id,
      kind: kind,
      scope_key: scope_key,
      content_token: content_token,
      cause_key: cause_key,
      source: if(kind == :manual_hold, do: :human, else: :policy),
      ended_at: nil
    }
  end
end
