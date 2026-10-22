defmodule GroupherServer.ReviewBot.Policy do
  @moduledoc """
  Normalizes validated provider findings into a safe Check outcome.

      CheckOutput + pinned rules
        -> ReviewBot.Policy
        -> pass | review | restrict + bounded signals

  This module does not alter resource visibility; AlertBoard/CMS decisions own
  restriction transitions.
  """
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.CheckOutput

  @doc """
  Aggregates rule actions and required modality coverage using fail-closed precedence.

  ## Examples

      output = %CheckOutput{
        request_id: "request-1",
        content_token: "token-1",
        coverage: %{text: :complete, image: :complete},
        findings: [%{rule_id: "r1", verdict: :hit}]
      }
      Policy.evaluate(output, [%{"id" => "r1", "action" => "restrict"}], ["text"])
      #=> %{action: :restrict, signals: [%{action: "restrict", category: nil, rule_id: "r1", verdict: :hit}]}
  """
  @spec evaluate(CheckOutput.t(), [map()], [String.t()]) :: %{
          action: :pass | :review | :restrict,
          signals: [map()]
        }
  def evaluate(%CheckOutput{} = output, rules, required_modalities)
      when is_list(rules) and is_list(required_modalities) do
    rule_by_id = Map.new(rules, &{Map.get(&1, "id"), &1})

    signals =
      Enum.map(output.findings, fn finding ->
        rule = Map.get(rule_by_id, finding.rule_id, %{})

        %{
          rule_id: finding.rule_id,
          category: Map.get(rule, "category"),
          action: Map.get(rule, "action"),
          verdict: finding.verdict
        }
      end)

    action =
      cond do
        Enum.any?(signals, &(&1.verdict == :hit and &1.action == "restrict")) ->
          :restrict

        Enum.any?(signals, &(&1.verdict in [:hit, :uncertain])) ->
          :review

        Enum.any?(required_modalities, fn modality ->
          Map.get(output.coverage, String.to_existing_atom(modality)) != :complete
        end) ->
          :review

        true ->
          :pass
      end

    %{action: action, signals: signals}
  end
end
