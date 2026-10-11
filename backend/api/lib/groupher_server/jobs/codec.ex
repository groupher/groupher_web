defmodule GroupherServer.Jobs.Codec do
  @moduledoc """
  Serializes supported job arguments before they cross the Oban persistence boundary.

  Business position:

      Domain event / scheduler
        -> Oban
        -> Codec
        -> context / service
  """

  @doc """
  Encodes a job argument into a safe persistence string.

  ## Examples

      Jobs.Codec.encode({:refresh, "article-1"})
  """
  @spec encode(term()) :: String.t()
  def encode(term) do
    term
    |> :erlang.term_to_binary()
    |> Base.encode64()
  end

  @doc """
  Decodes a string produced by encode/1.

  ## Examples

      Jobs.Codec.decode(Jobs.Codec.encode({:refresh, "article-1"}))
  """
  @spec decode(String.t()) :: term()
  def decode(encoded) when is_binary(encoded) do
    encoded
    |> Base.decode64!()
    |> :erlang.binary_to_term([:safe])
  end
end
