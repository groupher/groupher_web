defmodule GroupherServer.Test.ReviewBot.WordRulesTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{AlertBoard, ReviewBot}

  alias AlertBoard.Model.RuleSet
  alias ReviewBot.WordRules

  test "matches NFKC casefolded literals and returns evidence without matched text" do
    rules = %RuleSet{
      rules: %{
        "items" => [
          %{
            "id" => "rule-1",
            "kind" => "word",
            "value" => "STRASSE",
            "category" => "spam",
            "action" => "restrict"
          },
          %{
            "id" => "judge-1",
            "kind" => "judge",
            "value" => "model check",
            "category" => "policy",
            "action" => "review"
          }
        ]
      }
    }

    assert {:ok, result} = WordRules.check("Title", "Straße", rules)
    assert result.matches == [%{rule_id: "rule-1", category: "spam", action: "restrict"}]
    assert result.coverage == %{"text" => true, "image" => false}
    refute inspect(result) =~ "Straße"
  end

  test "checks both title and body and rejects malformed rulesets" do
    rules = %RuleSet{
      rules: %{
        "items" => [
          %{
            "id" => "rule-2",
            "kind" => "word",
            "value" => "ＡＢＣ",
            "category" => "restricted",
            "action" => "review"
          }
        ]
      }
    }

    assert {:ok, %{matches: [%{rule_id: "rule-2"}]}} = WordRules.check("abc", "safe", rules)
    assert {:error, _} = WordRules.check("title", "body", %RuleSet{rules: %{}})
  end
end
