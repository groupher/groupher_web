defmodule GroupherServer.PublicCache.DeliveryConfig do
  @moduledoc """
  Runtime configuration for bounded Cloudflare purge delivery.

  DeliveryConfig owns timeout, retry, lease, and backlog SLO values. It does
  not make an actor-aware allow/deny decision and is therefore not a Policy.

      Application env -> DeliveryConfig -> cache delivery workflow
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

      DeliveryConfig.timeout_ms()
      #=> 5_000
  """
  @spec timeout_ms() :: pos_integer()
  def timeout_ms, do: value(:timeout_ms)

  @doc """
  Returns the maximum number of delivery attempts.

  ## Examples

      DeliveryConfig.max_attempts()
      #=> 8
  """
  @spec max_attempts() :: pos_integer()
  def max_attempts, do: value(:max_attempts)

  @doc """
  Returns the base retry delay in seconds.

  ## Examples

      DeliveryConfig.retry_base_delay_seconds()
      #=> 1
  """
  @spec retry_base_delay_seconds() :: non_neg_integer()
  def retry_base_delay_seconds, do: value(:retry_base_delay_seconds)

  @doc """
  Returns the maximum retry delay in seconds.

  ## Examples

      DeliveryConfig.max_retry_delay_seconds()
      #=> 60
  """
  @spec max_retry_delay_seconds() :: pos_integer()
  def max_retry_delay_seconds, do: value(:max_retry_delay_seconds)

  @doc """
  Returns the maximum number of tags in one purge request.

  ## Examples

      DeliveryConfig.max_tags_per_request()
      #=> 100
  """
  @spec max_tags_per_request() :: pos_integer()
  def max_tags_per_request, do: value(:max_tags_per_request)

  @doc """
  Returns the delivery lease duration in seconds.

  ## Examples

      DeliveryConfig.delivery_lease_seconds()
      #=> 120
  """
  @spec delivery_lease_seconds() :: pos_integer()
  def delivery_lease_seconds, do: value(:delivery_lease_seconds)

  @doc """
  Returns the pending-delivery SLO in seconds.

  ## Examples

      DeliveryConfig.pending_slo_seconds()
      #=> 600
  """
  @spec pending_slo_seconds() :: pos_integer()
  def pending_slo_seconds, do: value(:pending_slo_seconds)

  defp value(key) do
    Application.get_env(:groupher_server, __MODULE__, @defaults)
    |> Keyword.get(key, Keyword.fetch!(@defaults, key))
  end
end
