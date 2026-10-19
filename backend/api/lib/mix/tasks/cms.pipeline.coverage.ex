defmodule Mix.Tasks.Cms.Pipeline.Coverage do
  @shortdoc "Validate concrete CMS Command pipeline coverage"

  @moduledoc """
  Builds the fail-closed coverage report for concrete CMS Command modules.

      CMS command source -> compiled execute exports -> pipeline metadata
                                      |
                                      `-> covered or uncovered contract

  Every concrete Command must declare at least one pipeline. The separate graph
  task proves resolver/facade reachability and topology.
  """

  use Mix.Task

  alias GroupherServer.CommandPipeline.{CompiledModules, ProjectPaths}
  alias Mix.Tasks.Cms.Pipeline.Check

  @switches [check: :boolean, output: :string]
  @manifest "priv/pipeline_coverage.json"

  @doc "Builds the deterministic Command migration manifest for compiled modules."
  def build_manifest(modules) when is_list(modules) do
    commands =
      modules
      |> Enum.filter(&concrete_command?/1)
      |> Enum.map(&manifest_command/1)
      |> Enum.sort_by(& &1["module"])

    covered = Enum.count(commands, &(&1["status"] == "covered"))

    %{
      "app" => Atom.to_string(Mix.Project.config()[:app]),
      "commands" => commands,
      "schema_version" => 3,
      "scope" => "cms/**/commands modules exporting execute/*",
      "totals" => %{
        "commands" => length(commands),
        "covered" => covered,
        "uncovered" => length(commands) - covered
      }
    }
  end

  @impl true
  def run(args) do
    Mix.Task.run("compile", [])
    {opts, _argv, invalid} = OptionParser.parse(args, strict: @switches)

    if invalid != [] do
      Mix.raise("invalid options: #{inspect(invalid)}")
    end

    check? = Keyword.get(opts, :check, false)
    path = ProjectPaths.expand(Keyword.get(opts, :output, @manifest))
    modules = CompiledModules.production()
    Check.validate_cms_adapter_ownership!(modules)
    manifest = build_manifest(modules)
    assert_complete!(manifest)
    json = Jason.encode!(manifest, pretty: true) <> "\n"

    if check? do
      check_fresh!(path, json)
    else
      File.mkdir_p!(Path.dirname(path))
      File.write!(path, json)
      Mix.shell().info("Wrote CMS pipeline coverage: #{path}")
    end
  end

  defp concrete_command?(module) do
    source = CompiledModules.source_path(module)

    is_binary(source) and command_source?(source) and pipeline_module?(module)
  end

  defp pipeline_module?(module),
    do:
      function_exported?(module, :__pipeline_contracts__, 0) and
        module.__pipeline_contracts__() != []

  defp command_source?(source) do
    parts = source |> Path.expand() |> Path.split()
    "cms" in parts and "commands" in parts
  end

  defp manifest_command(module) do
    pipelines =
      if function_exported?(module, :__pipeline_contracts__, 0) do
        Enum.map(module.__pipeline_contracts__(), &manifest_pipeline/1)
      else
        []
      end

    %{
      "execute_arities" => execute_arities(module),
      "module" => inspect(module),
      "pipelines" => pipelines,
      "source" => relative_source(CompiledModules.source_path(module)),
      "status" => if(pipelines == [], do: "uncovered", else: "covered")
    }
  end

  defp manifest_pipeline(contract) do
    %{
      "access" => contract[:access] && Atom.to_string(contract.access),
      "arity" => contract.arity,
      "confirmation" => contract[:confirmation] && inspect(contract.confirmation),
      "pipeline" => Atom.to_string(contract.pipeline),
      "name" => Atom.to_string(contract.name),
      "operation" => contract[:operation] && Atom.to_string(contract.operation),
      "stages" => Enum.map(contract[:stages] || [], &Atom.to_string/1),
      "target" => contract[:target] && Atom.to_string(contract.target)
    }
    |> Enum.reject(fn {_key, value} -> is_nil(value) end)
    |> Map.new()
  end

  defp execute_arities(module) do
    module.module_info(:exports)
    |> Enum.filter(&(elem(&1, 0) == :execute))
    |> Enum.map(&elem(&1, 1))
    |> Enum.sort()
  end

  defp relative_source(nil), do: nil
  defp relative_source(source), do: ProjectPaths.relative(source)

  defp check_fresh!(path, expected) do
    case File.read(path) do
      {:ok, ^expected} ->
        Mix.shell().info("CMS pipeline coverage is fresh: #{path}")

      {:ok, _other} ->
        Mix.raise("CMS pipeline coverage is stale: #{path}")

      {:error, :enoent} ->
        Mix.raise("CMS pipeline coverage is missing: #{path}")

      {:error, reason} ->
        Mix.raise("cannot read CMS pipeline coverage #{path}: #{inspect(reason)}")
    end
  end

  defp assert_complete!(%{"commands" => commands, "totals" => %{"uncovered" => count}})
       when count > 0 do
    modules = commands |> Enum.filter(&(&1["status"] == "uncovered")) |> Enum.map(& &1["module"])
    Mix.raise("concrete CMS Commands without pipeline contracts: #{inspect(modules)}")
  end

  defp assert_complete!(_manifest), do: {:ok, :pass}
end
