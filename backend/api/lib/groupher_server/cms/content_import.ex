defmodule GroupherServer.CMS.ContentImport do
  @moduledoc """
  Internal facade for staged bulk Docs imports.

      caller -> GroupherServer.CMS.ContentImport -> result
  """

  alias __MODULE__.{Jobs, Process}

  @doc "Runs `create` through this capability boundary."
  defdelegate create(community, actor, input), to: Jobs
  @doc "Runs `get` through this capability boundary."
  defdelegate get(community, job_ref), to: Jobs
  @doc "Runs `fail` through this capability boundary."
  defdelegate fail(community, job_ref, code, message), to: Jobs
  @doc "Runs `cancel` through this capability boundary."
  defdelegate cancel(community, job_ref), to: Jobs
  @doc "Runs `project` through this capability boundary."
  defdelegate project(job), to: Process
end
