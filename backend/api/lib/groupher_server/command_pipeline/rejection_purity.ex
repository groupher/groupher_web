defmodule GroupherServer.CommandPipeline.RejectionPurity do
  @moduledoc """
  Applies the rejection-builder purity policy to the shared compiled graph.

  Each declared builder is a graph root. Local helpers are traversed, a small
  exact set of pure library calls is accepted, and all other cross-module or
  unresolved calls fail closed. This proves that Commands only construct
  rejection data and cannot perform the audit write themselves.

      rejection builder MFA
        -> shared compiled call graph
        -> purity policy
        -> accepted pure data builder or compile/check failure

  Purity means the builder cannot perform effects; it does not mean the
  builder is total. An allowed pure call such as `Map.fetch!/2` can still
  raise. The runner contains builder raise/throw, emits telemetry, skips the
  rejection write, and preserves the original business error.
  """

  @safe_mfas MapSet.new([
               {Keyword, :get, 2},
               {Keyword, :get, 3},
               {Map, :get, 2},
               {Map, :get, 3},
               {Map, :fetch, 2},
               {Map, :fetch!, 2},
               {String, :to_atom, 1},
               {String, :to_existing_atom, 1},
               {String, :to_integer, 1},
               {String, :trim, 1},
               {String, :downcase, 1},
               {Atom, :to_string, 1},
               {Integer, :to_string, 1}
             ])

  @doc false
  def validate!(graph, contracts) when is_map(graph) and is_list(contracts) do
    contracts
    |> Enum.map(&Map.get(&1, :rejection_builder))
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
    |> Enum.each(&validate_builder!(graph, &1))

    {:ok, :pass}
  end

  defp validate_builder!(graph, {module, name, arity} = builder)
       when is_atom(module) and is_atom(name) and is_integer(arity) do
    unless MapSet.member?(graph.function_keys, builder) do
      raise ArgumentError, "rejection builder #{inspect(builder)} is missing from compiled graph"
    end

    walk_builder!(graph, module, [builder], MapSet.new())
  end

  defp validate_builder!(_graph, builder) do
    raise ArgumentError, "invalid rejection builder MFA #{inspect(builder)}"
  end

  defp walk_builder!(_graph, _module, [], _visited), do: {:ok, :pass}

  defp walk_builder!(graph, module, [current | rest], visited) do
    if MapSet.member?(visited, current) do
      walk_builder!(graph, module, rest, visited)
    else
      next =
        graph.edges
        |> Enum.filter(&(&1.from == current))
        |> Enum.flat_map(&validate_edge!(graph, module, &1))

      walk_builder!(graph, module, rest ++ next, MapSet.put(visited, current))
    end
  end

  defp validate_edge!(graph, module, %{to: {module, _name, _arity} = target} = edge) do
    if MapSet.member?(graph.function_keys, target) do
      [target]
    else
      fail!(edge, "local target is not present in compiled graph")
    end
  end

  defp validate_edge!(_graph, _module, %{to: target} = edge) do
    if MapSet.member?(@safe_mfas, target) do
      []
    else
      fail!(edge, "untrusted rejection call #{inspect(target)}")
    end
  end

  defp validate_edge!(_graph, _module, edge) do
    fail!(edge, Map.get(edge, :reason, "unresolved rejection call"))
  end

  defp fail!(edge, reason) do
    raise ArgumentError,
          "rejection builder purity failed at #{inspect(edge.from)} line #{edge.line}: #{reason}"
  end
end
