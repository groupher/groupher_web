defmodule GroupherServer.CMS.PipelineStaticCheckTest do
  use ExUnit.Case, async: false

  alias GroupherServer.CommandPipeline
  alias GroupherServer.Test
  alias CommandPipeline.{CompiledModules, ProjectPaths}
  alias Mix.Tasks.Cms.Pipeline.Check
  alias Mix.Tasks.Cms.Command.Pipeline, as: CommandPipelineTask

  alias Test.PipelinePurityFixtures.{
    CrossModuleBuilder,
    DynamicBuilder,
    MacroWriteBuilder,
    PureBuilder
  }

  test "allows a compiled local pure rejection builder" do
    assert {:ok, :pass} = Check.validate_rejection_builders!([contract(PureBuilder)])
  end

  test "rejects a compiled cross-module helper" do
    assert_raise ArgumentError, ~r/untrusted rejection call/, fn ->
      Check.validate_rejection_builders!([contract(CrossModuleBuilder)])
    end
  end

  test "rejects a local macro whose compiled expansion writes to the database" do
    assert_raise ArgumentError, ~r/GroupherServer.Repo.*insert/, fn ->
      Check.validate_rejection_builders!([contract(MacroWriteBuilder)])
    end
  end

  test "rejects a CMS pipeline module that uses a non-CMS adapter" do
    assert_raise Mix.Error, ~r/must use GroupherServer\.CMS\.CommandPipelineAdapter/, fn ->
      Check.validate_cms_adapter_ownership!([
        GroupherServer.CMS.Test.PipelineDefaultAdapterFixture
      ])
    end
  end

  test "rejects apply/3 from the compiled builder graph" do
    assert_raise ArgumentError, ~r/apply\/3/, fn ->
      Check.validate_rejection_builders!([contract(DynamicBuilder)])
    end
  end

  test "production discovery excludes compiled test fixtures" do
    modules = CompiledModules.production()

    refute GroupherServer.Test.PipelineGraphFixtures.GateInChange in modules
    refute GroupherServer.Test.PipelinePurityFixtures.PureBuilder in modules

    assert Enum.all?(modules, fn module ->
             module
             |> CompiledModules.source_path()
             |> Path.expand()
             |> Path.relative_to(ProjectPaths.lib_root())
             |> then(&(&1 != ".." and not String.starts_with?(&1, "../")))
           end)
  end

  test "project paths and production discovery do not depend on the working directory" do
    root = Mix.Project.project_file() |> Path.expand() |> Path.dirname()

    File.cd!(ProjectPaths.lib_root(), fn ->
      assert ProjectPaths.root() == root

      assert ProjectPaths.expand("priv/pipeline_contracts.json") ==
               Path.join(root, "priv/pipeline_contracts.json")

      assert CompiledModules.production() != []
    end)
  end

  test "checked pipeline artifacts describe the same production pipelines" do
    contracts = read_manifest("pipeline_contracts.json")
    coverage = read_manifest("pipeline_coverage.json")
    graph = CommandPipelineTask.build_current_report()

    contract_rows =
      Enum.map(
        contracts["pipelines"],
        &{&1["module"], &1["name"], &1["arity"], &1["pipeline"]}
      )

    coverage_rows =
      coverage["commands"]
      |> Enum.flat_map(fn command ->
        Enum.map(
          command["pipelines"],
          &{command["module"], &1["name"], &1["arity"], &1["pipeline"]}
        )
      end)

    graph_rows =
      Enum.map(
        graph["pipelines_reached"],
        &{&1["module"], &1["function"], &1["arity"], &1["pipeline"]}
      )

    contract_pipelines = MapSet.new(contract_rows)
    coverage_pipelines = MapSet.new(coverage_rows)
    graph_pipelines = MapSet.new(graph_rows)

    assert length(contract_rows) == MapSet.size(contract_pipelines)
    assert length(coverage_rows) == MapSet.size(coverage_pipelines)
    assert length(graph_rows) == MapSet.size(graph_pipelines)
    assert length(contract_rows) == length(coverage_rows)
    assert length(contract_rows) == length(graph_rows)
    assert contract_pipelines == coverage_pipelines
    assert contract_pipelines == graph_pipelines

    refute Enum.any?(contract_pipelines, fn {module, _name, _arity, _pipeline} ->
             String.contains?(module, ".Test.")
           end)
  end

  defp contract(module), do: %{module: module, rejection_builder: {module, :build, 1}}

  defp read_manifest(name) do
    ProjectPaths.expand(Path.join("priv", name))
    |> File.read!()
    |> Jason.decode!()
  end
end
