defmodule GroupherServer.ReviewBot.WordRules do
  @moduledoc """
  Applies deterministic literal word rules to canonical plain text.

      Title + canonical plain_text + immutable rules
        -> NFKC casefold
        -> matched rule IDs/categories/actions

  Match results never contain the matched text itself.
  """
  alias GroupherServer.{AlertBoard}

  alias AlertBoard.Model.RuleSet

  @type match :: %{rule_id: String.t(), category: String.t(), action: String.t()}

  @doc "Checks canonical title/body text against one immutable word ruleset."
  @spec check(String.t(), String.t(), RuleSet.t()) ::
          {:ok, %{matches: [match()], coverage: map()}} | {:error, term()}
  def check(title, plain_text, %RuleSet{rules: %{"items" => rules}})
      when is_binary(title) and is_binary(plain_text) and is_list(rules) do
    content = normalize(title <> "\n" <> plain_text)

    matches =
      rules
      |> Enum.filter(&(Map.get(&1, "kind") == "word"))
      |> Enum.reduce([], fn rule, acc ->
        word = normalize(Map.get(rule, "value", ""))

        if word != "" and String.contains?(content, word) do
          [
            %{
              rule_id: Map.fetch!(rule, "id"),
              category: Map.fetch!(rule, "category"),
              action: Map.fetch!(rule, "action")
            }
            | acc
          ]
        else
          acc
        end
      end)

    {:ok, %{matches: Enum.reverse(matches), coverage: %{"text" => true, "image" => false}}}
  end

  def check(_title, _plain_text, _rule_set) do
    {:error, GroupherServer.ReviewBot.ErrorCat.invalid_config()}
  end

  defp normalize(value) do
    value
    |> String.normalize(:nfkc)
    |> String.to_charlist()
    |> :string.casefold()
    |> List.to_string()
  end
end
