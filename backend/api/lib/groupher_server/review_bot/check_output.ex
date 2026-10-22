defmodule GroupherServer.ReviewBot.CheckOutput do
  @moduledoc """
  Strict, non-content result returned by a provider adapter.

      provider JSON -> CheckOutput.validate/2 -> Policy signals
  """

  @enforce_keys [:request_id, :content_token, :coverage, :findings]
  defstruct [:request_id, :content_token, :coverage, :findings, :provider_request_id]

  @type t :: %__MODULE__{
          request_id: String.t(),
          content_token: String.t(),
          coverage: %{optional(:text | :image) => :complete | :unsupported | :failed},
          findings: [%{rule_id: String.t(), verdict: :pass | :hit | :uncertain}],
          provider_request_id: String.t() | nil
        }

  @coverage ~w(complete unsupported failed)a
  @verdicts ~w(pass hit uncertain)a

  @doc "Validates identifiers, exact rule coverage and modality coverage against the request."
  @spec validate(map(), GroupherServer.ReviewBot.CheckInput.t()) ::
          {:ok, t()} | {:error, term()}
  def validate(payload, input) when is_map(payload) do
    with true <-
           MapSet.new(Map.keys(payload)) ==
             MapSet.new([
               "requestId",
               "contentToken",
               "coverage",
               "findings",
               "providerRequestId"
             ]),
         true <- payload["requestId"] == input.request_id,
         true <- payload["contentToken"] == input.content_token,
         true <- is_nil(payload["providerRequestId"]) or is_binary(payload["providerRequestId"]),
         {:ok, coverage} <- validate_coverage(payload["coverage"], input),
         {:ok, findings} <- validate_findings(payload["findings"], input.rules) do
      {:ok,
       %__MODULE__{
         request_id: input.request_id,
         content_token: input.content_token,
         coverage: coverage,
         findings: findings,
         provider_request_id: payload["providerRequestId"]
       }}
    else
      _ -> {:error, :provider_protocol_error}
    end
  end

  def validate(_payload, _input), do: {:error, :provider_protocol_error}

  defp validate_coverage(%{} = coverage, input) do
    valid_keys? = MapSet.new(Map.keys(coverage)) == MapSet.new(["text", "image"])

    normalized =
      Map.new(["text", "image"], fn key ->
        case coverage[key] do
          value when value in ["complete", "unsupported", "failed"] ->
            {String.to_existing_atom(key), String.to_existing_atom(value)}

          _ ->
            {String.to_existing_atom(key), nil}
        end
      end)

    all_values? = Enum.all?(Map.values(normalized), &(&1 in @coverage))
    required_present? = Enum.all?(input.required_modalities, &Map.has_key?(normalized, &1))

    if valid_keys? and all_values? and required_present? do
      {:ok, normalized}
    else
      {:error, :coverage_incomplete}
    end
  end

  defp validate_coverage(_coverage, _input), do: {:error, :provider_protocol_error}

  defp validate_findings(findings, rules) when is_list(findings) do
    expected =
      rules
      |> Enum.map(&Map.get(&1, "id"))
      |> Enum.filter(&is_binary/1)
      |> MapSet.new()

    normalized =
      Enum.map(findings, fn
        %{"ruleId" => rule_id, "verdict" => verdict} = finding
        when map_size(finding) == 2 ->
          %{rule_id: rule_id, verdict: normalize_verdict(verdict)}

        _ ->
          nil
      end)

    ids = Enum.map(normalized, &if(&1, do: &1.rule_id))

    if MapSet.size(expected) == length(rules) and length(normalized) == MapSet.size(expected) and
         Enum.all?(normalized, &valid_finding?(&1, expected)) and
         MapSet.new(ids) == expected do
      {:ok, normalized}
    else
      {:error, :provider_protocol_error}
    end
  end

  defp validate_findings(_findings, _rules), do: {:error, :provider_protocol_error}

  defp normalize_verdict(value) when value in ["pass", "hit", "uncertain"] do
    String.to_existing_atom(value)
  end

  defp normalize_verdict(_value), do: nil

  defp valid_finding?(%{rule_id: id, verdict: verdict}, expected) do
    MapSet.member?(expected, id) and verdict in @verdicts
  end

  defp valid_finding?(_finding, _expected), do: false
end
