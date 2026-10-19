defmodule GroupherServer.CommandPipeline.ProjectPaths do
  @moduledoc """
  Resolves filesystem paths used by the pipeline analysis tools.

      Mix project file
        -> project root
          -> lib sources, manifests, and relative report paths

  After Mix has loaded the project, analysis must not depend on changes to the
  task process's current working directory. Every pipeline task uses this
  module so module discovery, source parsing, and generated artifacts share one
  project boundary. This module does not make Mix discover a project when a
  command starts outside the directory containing `mix.exs`.
  """

  @doc "Returns the directory containing the active project's `mix.exs`."
  def root do
    Mix.Project.project_file()
    |> Path.expand()
    |> Path.dirname()
  end

  @doc "Returns the active project's production source root."
  def lib_root, do: Path.join(root(), "lib")

  @doc "Returns the compile path with the configured build path anchored to the project root."
  def compile_path do
    config = Mix.Project.config()
    build_path = config |> Keyword.get(:build_path, "_build") |> expand()

    config
    |> Keyword.put(:build_path, build_path)
    |> Mix.Project.compile_path()
  end

  @doc "Expands a project-relative path against the active project root."
  def expand(path), do: Path.expand(path, root())

  @doc "Makes a path relative to the active project root."
  def relative(path), do: Path.relative_to(path, root())
end
