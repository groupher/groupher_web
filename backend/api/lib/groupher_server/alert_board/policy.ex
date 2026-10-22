defmodule GroupherServer.AlertBoard.Policy do
  @moduledoc """
  Converts a finished Check and current restrictions into a bounded transition plan.

      completed Check + active restrictions
        -> AlertBoard.Policy
        -> additions / releases / human follow-up

  The result is data only. Resource Lifecycle commands apply it atomically with
  the Decision, Case, visibility projections and Outbox event.
  """
  alias GroupherServer.{ReviewBot}

  alias ReviewBot.Model.Check

  @doc """
  Builds the scope-local restriction changes implied by one terminal Check.

  ## Examples

      review_check(%Check{result: :pass, mode: :ai_first}, [])
      #=> %{action: :pass, add_restrictions: [], end_restriction_ids: []}
  """
  @spec review_check(Check.t(), [map()]) :: %{
          action: :pass | :review | :restrict,
          add_restrictions: [map()],
          end_restriction_ids: [term()]
        }
  def review_check(%Check{} = check, active_restrictions) when is_list(active_restrictions) do
    signals = get_in(check.signals || %{}, ["items"]) || []
    result = check.result || if(check.state == :failed, do: :review, else: nil)

    add_restrictions = restriction_additions(result, check, signals)
    end_restriction_ids = restriction_ends(result, check, active_restrictions, signals)

    effective_result =
      if result == :restrict and add_restrictions == [], do: :review, else: result

    action =
      cond do
        effective_result == :restrict -> :restrict
        effective_result in [:review, nil] -> :review
        check.mode == :human_first -> :review
        true -> :pass
      end

    %{
      action: action,
      add_restrictions: add_restrictions,
      end_restriction_ids: end_restriction_ids
    }
  end

  defp restriction_additions(:restrict, check, signals) do
    signals
    |> Enum.filter(&restrictive_hit?/1)
    |> Enum.map(fn signal ->
      rule_id = value(signal, "rule_id")

      %{
        scope_key: check.scope_key,
        content_token: check.content_token,
        cause_key: "rule:#{rule_id}",
        kind: :rule_hit,
        source: :policy,
        check_id: check.id
      }
    end)
    |> Enum.uniq_by(& &1.cause_key)
  end

  defp restriction_additions(:review, %Check{mode: :ai_first} = check, _signals) do
    [
      %{
        scope_key: check.scope_key,
        content_token: check.content_token,
        cause_key: "awaiting_human:#{check.content_token}",
        kind: :awaiting_human,
        source: :policy,
        check_id: check.id
      }
    ]
  end

  defp restriction_additions(_result, _check, _signals), do: []

  defp restriction_ends(result, %Check{mode: mode} = check, restrictions, signals)
       when result in [:pass, :review, :restrict] and mode != :human_first do
    passed_rule_ids =
      signals
      |> Enum.filter(&(value(&1, "verdict") == "pass"))
      |> Enum.map(&value(&1, "rule_id"))
      |> MapSet.new()

    restrictions
    |> Enum.filter(fn restriction ->
      same_scope? = restriction.scope_key == check.scope_key
      active? = is_nil(restriction.ended_at)

      same_submission_wait? =
        restriction.content_token == check.content_token and
          restriction.kind == :awaiting_ai

      passed_policy_rule? =
        restriction.kind == :rule_hit and restriction.source == :policy and
          rule_passed?(restriction.cause_key, passed_rule_ids)

      same_scope? and active? and (same_submission_wait? or passed_policy_rule?)
    end)
    |> Enum.map(& &1.id)
  end

  defp restriction_ends(_result, _check, _restrictions, _signals), do: []

  defp restrictive_hit?(signal) do
    action = value(signal, "action")
    verdict = value(signal, "verdict")

    action == "restrict" and verdict in ["hit", nil]
  end

  defp rule_passed?("rule:" <> rule_id, passed_rule_ids) do
    MapSet.member?(passed_rule_ids, rule_id)
  end

  defp rule_passed?(_cause_key, _passed_rule_ids), do: false

  defp value(map, key) when is_map(map) do
    Map.get(map, key) || Map.get(map, atom_key(key))
  end

  defp value(_map, _key), do: nil

  defp atom_key("action"), do: :action
  defp atom_key("rule_id"), do: :rule_id
  defp atom_key("verdict"), do: :verdict
  defp atom_key(_key), do: nil
end
