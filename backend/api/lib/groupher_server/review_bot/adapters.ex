defmodule GroupherServer.ReviewBot.Adapters do
  @moduledoc """
  Registry for the provider adapters supported by ReviewBot.

      operator profile
        -> Adapters.fetch/1
        -> provider adapter module
        -> validated CheckOutput
  """

  @adapters %{
    judge_http: GroupherServer.ReviewBot.Adapters.JudgeHTTP,
    openai: GroupherServer.ReviewBot.Adapters.OpenAI
  }

  @doc """
  Returns whether a configured provider adapter is supported.

  ## Examples

      Adapters.supported?(:openai)
      #=> true
  """
  @spec supported?(term()) :: boolean()
  def supported?(adapter), do: Map.has_key?(@adapters, adapter)

  @doc """
  Resolves a configured provider adapter.

  ## Examples

      Adapters.fetch(:judge_http)
      #=> {:ok, GroupherServer.ReviewBot.Adapters.JudgeHTTP}
  """
  @spec fetch(term()) :: {:ok, module()} | :error
  def fetch(adapter), do: Map.fetch(@adapters, adapter)
end
