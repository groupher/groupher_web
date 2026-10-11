defmodule GroupherServer.CMS.Press.Effects do
  @moduledoc """
  Schedules rebuildable Press projections after a committed config command.

      committed Press Command
        -> Press.Effects
        -> Press.Invalidation
  """

  alias GroupherServer.CMS

  alias CMS.Press.Invalidation
  alias Helper.Later

  @doc "Schedules best-effort invalidation after the caller's transaction commits."
  def schedule_invalidation(community_slug) when is_binary(community_slug) do
    Later.run({Invalidation, :invalidate, [community_slug]})
    {:ok, :pass}
  end
end
