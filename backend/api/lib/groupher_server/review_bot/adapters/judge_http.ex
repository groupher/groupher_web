defmodule GroupherServer.ReviewBot.Adapters.JudgeHTTP do
  @moduledoc """
  Calls an operator-hosted judge endpoint using the stable ReviewBot wire contract.

      ReviewBot.CheckInput -> HTTPS /v1/judge -> strict CheckOutput
  """
  alias GroupherServer.{ReviewBot}

  @behaviour GroupherServer.ReviewBot.Adapter

  alias ReviewBot.{CheckInput, CheckOutput, ErrorCat}

  @timeout 15_000
  @max_body_bytes 2 * 1024 * 1024

  @doc "Submits one pinned check snapshot to the configured judge service."
  @impl true
  @spec check(CheckInput.t(), map()) :: {:ok, CheckOutput.t()} | {:error, term()}
  def check(%CheckInput{} = input, %{base_url: base_url, credential: credential, model: model}) do
    with {:ok, :pass} <- validate_size(input),
         {:ok, response} <- post(base_url, credential, request_body(input, model)),
         {:ok, output} <- CheckOutput.validate(response, input) do
      {:ok, output}
    end
  end

  def check(_input, _profile), do: {:error, ErrorCat.invalid_config()}

  @doc "Builds the exact provider-neutral JSON request body."
  @spec request_body(CheckInput.t(), String.t()) :: map()
  def request_body(%CheckInput{} = input, model) do
    %{
      "requestId" => input.request_id,
      "checkId" => input.check_id,
      "contentToken" => input.content_token,
      "model" => model,
      "rules" => input.rules,
      "prompt" => input.prompt,
      "text" => %{"title" => input.text.title, "body" => input.text.body},
      "images" => Enum.map(input.images || [], &image_payload/1),
      "requiredModalities" => Enum.map(input.required_modalities, &Atom.to_string/1)
    }
  end

  defp image_payload(image) do
    %{
      "assetId" => Map.get(image, :asset_id),
      "immutableVersion" => Map.get(image, :immutable_version),
      "signedReadUrl" => Map.get(image, :signed_read_url)
    }
  end

  defp validate_size(input) do
    body = Jason.encode!(request_body(input, "model"))

    if byte_size(body) <= @max_body_bytes and length(input.images || []) <= 10 and
         Enum.all?(input.images || [], &valid_image?/1) do
      {:ok, :pass}
    else
      {:error, ErrorCat.coverage_incomplete()}
    end
  end

  defp valid_image?(image) when is_map(image) do
    url = Map.get(image, :signed_read_url)

    case URI.parse(url || "") do
      %URI{scheme: "https", host: host, userinfo: nil} when is_binary(host) and host != "" ->
        is_binary(Map.get(image, :immutable_version))

      _ ->
        false
    end
  end

  defp valid_image?(_image), do: false

  defp post(base_url, credential, body) do
    client =
      Tesla.client(
        [
          {Tesla.Middleware.BaseUrl, base_url},
          Tesla.Middleware.JSON,
          {Tesla.Middleware.Headers, [{"authorization", "Bearer " <> credential}]}
        ],
        {Tesla.Adapter.Hackney, recv_timeout: @timeout, timeout: @timeout}
      )

    case Tesla.post(client, "/v1/judge", body) do
      {:ok, %Tesla.Env{status: status, body: response}}
      when status in 200..299 and is_map(response) ->
        {:ok, response}

      {:ok, %Tesla.Env{status: status}} when status == 429 or status >= 500 ->
        {:error, ErrorCat.provider_unavailable()}

      {:ok, %Tesla.Env{status: status}} when status in 200..299 ->
        {:error, ErrorCat.provider_protocol_error()}

      {:ok, %Tesla.Env{}} ->
        {:error, ErrorCat.provider_protocol_error()}

      {:error, _reason} ->
        {:error, ErrorCat.provider_unavailable()}
    end
  end
end
