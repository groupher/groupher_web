defmodule GroupherServer.PublicCache.Policy do
  @moduledoc """
  Runtime policy for bounded Cloudflare purge delivery.

  Business position:

      purge delivery -> Policy -> timeout, retry, and tag-count bounds
  """

  @defaults [
    timeout_ms: 5_000,
    max_attempts: 8,
    retry_base_delay_seconds: 1,
    max_retry_delay_seconds: 60,
    max_tags_per_request: 100,
    delivery_lease_seconds: 120,
    pending_slo_seconds: 600
  ]

  @doc """
  Returns the external purge request timeout in milliseconds.

  ## Examples

      PublicCache.Policy.timeout_ms()
  """
  def timeout_ms, do: value(:timeout_ms)

  @doc """
  Returns the maximum number of delivery attempts.

  ## Examples

      PublicCache.Policy.max_attempts()
  """
  def max_attempts, do: value(:max_attempts)

  @doc """
  Returns the base retry delay in seconds.

  ## Examples

      PublicCache.Policy.retry_base_delay_seconds()
  """
  def retry_base_delay_seconds, do: value(:retry_base_delay_seconds)

  @doc """
  Returns the maximum retry delay in seconds.

  ## Examples

      PublicCache.Policy.max_retry_delay_seconds()
  """
  def max_retry_delay_seconds, do: value(:max_retry_delay_seconds)

  @doc """
  Returns the maximum number of tags in one purge request.

  ## Examples

      PublicCache.Policy.max_tags_per_request()
  """
  def max_tags_per_request, do: value(:max_tags_per_request)

  @doc """
  Returns the delivery lease duration in seconds.

  ## Examples

      PublicCache.Policy.delivery_lease_seconds()
  """
  def delivery_lease_seconds, do: value(:delivery_lease_seconds)

  @doc """
  Returns the pending-delivery SLO in seconds.

  ## Examples

      PublicCache.Policy.pending_slo_seconds()
  """
  def pending_slo_seconds, do: value(:pending_slo_seconds)

  defp value(key) do
    Application.get_env(:groupher_server, __MODULE__, @defaults)
    |> Keyword.get(key, Keyword.fetch!(@defaults, key))
  end
end
