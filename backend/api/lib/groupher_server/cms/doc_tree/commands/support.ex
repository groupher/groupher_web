defmodule GroupherServer.CMS.DocTree.Commands.Support do
  @moduledoc """
  Shares argument normalization and command identity helpers between concrete DocTree use cases.

      DocTree command
        -> pipeline entry
        -> Support argument helper

  This module is infrastructure for the concrete commands and is not a facade-callable
  business action.
  """

  alias GroupherServer.CMS
  alias CMS.Command.Receipt.Key, as: CommandKey

  @doc false
  def require_command_id(opts) do
    opts
    |> option(:command_id)
    |> CommandKey.validate()
  end

  def actor(args, fallback \\ nil), do: fallback || option(args, :actor)

  def option(opts, key) when is_map(opts), do: Map.get(opts, key)
  def option(opts, key) when is_list(opts), do: Keyword.get(opts, key)
  def option(_opts, _key), do: nil

  def drop_command_id(opts) when is_map(opts), do: Map.delete(opts, :command_id)
  def drop_command_id(opts) when is_list(opts), do: Keyword.delete(opts, :command_id)
  def drop_command_id(opts), do: opts

  def canonical_args(opts) when is_map(opts), do: Map.delete(opts, :command_id)

  def canonical_args(opts) when is_list(opts) do
    opts |> Keyword.delete(:command_id) |> Map.new()
  end
end
