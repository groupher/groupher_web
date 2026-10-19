defmodule GroupherServer.CommandPipeline.CompiledModules do
  @moduledoc """
  Discovers compiled production modules for the pipeline contract tools.

      compiled BEAM
        -> compiler source path
          -> source belongs to lib/
            -> contracts, coverage, and graph use the same module set

  Test helpers may share the test compile path with production modules, so the
  compile directory alone is not a production boundary. This module makes the
  source-path boundary explicit and keeps every pipeline tool on the same
  definition of production code.
  """

  alias GroupherServer.CommandPipeline.ProjectPaths

  @doc "Returns compiled modules whose compiler source belongs to `lib/`."
  def production do
    ProjectPaths.compile_path()
    |> Path.join("*.beam")
    |> Path.wildcard()
    |> Enum.flat_map(&beam_module/1)
    |> Enum.filter(&production?/1)
    |> Enum.sort_by(&Atom.to_string/1)
  end

  @doc "Returns the compiler source path recorded for a loaded module."
  def source_path(module) when is_atom(module) do
    if Code.ensure_loaded?(module) do
      case module.module_info(:compile)[:source] do
        source when is_list(source) -> List.to_string(source)
        source when is_binary(source) -> source
        _other -> nil
      end
    end
  end

  defp beam_module(path) do
    case :beam_lib.chunks(String.to_charlist(path), [:exports]) do
      {:ok, {module, _chunks}} -> [module]
      _other -> []
    end
  end

  defp production?(module) do
    case source_path(module) do
      source when is_binary(source) -> inside?(source, ProjectPaths.lib_root())
      _other -> false
    end
  end

  defp inside?(path, root) do
    relative = path |> Path.expand() |> Path.relative_to(root)

    relative != ".." and not String.starts_with?(relative, "../") and
      Path.type(relative) == :relative
  end
end
