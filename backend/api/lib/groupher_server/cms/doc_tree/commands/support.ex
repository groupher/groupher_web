defmodule GroupherServer.CMS.DocTree.Commands.Support do
  @moduledoc """
  Shares command construction and replay mechanics between concrete DocTree use cases.

      Commands.<BusinessAction>.execute
        -> Support command wrapper
        -> CMS.Command / CommandReplay -> action callback

  This module is infrastructure for the concrete commands and is not a facade-callable
  business action.
  """

  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.CMS
  alias GroupherServer.CMS.Command
  alias CMS.Command.Receipt.Key, as: CommandKey
  alias CMS.ErrorCat
  alias GroupherServer.CMS.DocTree.CommandReplay
  alias GroupherServer.CMS.DocTree.Commands.TreeConfirmation, as: Confirmation

  def run_tree_command(community, target_id, args, user, operation, execute) do
    clean_args = drop_command_id(args)

    case {user, option(args, :command_id), has_option?(args, :command_id)} do
      {%User{} = actor, command_id, true} ->
        with {:ok, command_id} <- CommandKey.validate(command_id) do
          execute_tree_command(
            community,
            target_id,
            clean_args,
            actor,
            command_id,
            operation,
            execute
          )
        end

      {_, nil, true} ->
        {:error, ErrorCat.command_id_required()}

      {_, _command_id, true} ->
        {:error, :command_actor_required}

      _ ->
        {:error, ErrorCat.command_id_required()}
    end
  end

  @doc "Runs an explicitly internal tree operation without a user Receipt."
  def run_tree_operation(_community, args, execute) when is_function(execute, 1) do
    execute.(drop_command_id(args))
  end

  def run_doc_command(community, id, user, operation, opts, confirmation, execute, present) do
    case {option(opts, :command_id), has_option?(opts, :command_id), user} do
      {nil, true, _} ->
        {:error, ErrorCat.command_id_required()}

      {command_id, true, %User{} = actor} ->
        with {:ok, command_id} <- CommandKey.validate(command_id) do
          %Command{
            actor: actor,
            command_id: command_id,
            operation: operation,
            target: {:doc, community.id},
            params: %{id: id, opts: canonical_args(opts)}
          }
          |> Command.execute(action: fn _context -> execute.() end, confirmation: confirmation)
          |> then(fn
            {:ok, value} -> present.(value)
            error -> error
          end)
        end

      {_, true, _} ->
        {:error, :command_actor_required}

      _ ->
        {:error, ErrorCat.command_id_required()}
    end
  end

  @doc "Runs an explicitly internal document operation without a user Receipt."
  def run_doc_operation(_opts, execute, present) when is_function(execute, 0) do
    case execute.() do
      {:ok, result, _receipt_metadata} -> {:ok, result}
      {:ok, value} -> present.(value)
      other -> other
    end
  end

  @doc "Returns whether a caller explicitly supplied the command boundary key."
  def has_option?(opts, key) when is_map(opts), do: Map.has_key?(opts, key)
  def has_option?(opts, key) when is_list(opts), do: Keyword.has_key?(opts, key)
  def has_option?(_opts, _key), do: false

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

  defp execute_tree_command(
         community,
         target_id,
         clean_args,
         actor,
         command_id,
         operation,
         execute
       ) do
    target_key = "#{community.id}:#{target_id}"

    %Command{
      actor: actor,
      command_id: command_id,
      operation: operation,
      target: {:doc_tree, community.id},
      params: %{target_id: target_id, args: canonical_args(clean_args)}
    }
    |> Command.execute(
      action: fn %{params: %{args: command_args}} ->
        with {:ok, result} <- execute.(command_args) do
          {:ok, %Confirmation{data: CommandReplay.tree_confirmation(result, target_key)}}
        end
      end,
      confirmation: Confirmation
    )
    |> then(fn
      {:ok, value} -> CommandReplay.replay_confirmation(value)
      error -> error
    end)
  end
end
