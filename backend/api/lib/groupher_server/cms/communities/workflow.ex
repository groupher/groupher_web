defmodule GroupherServer.CMS.Communities.Workflow do
  @moduledoc """
  Coordinates Community operations that combine public read options with writes.

      Communities facade -> Workflow -> Persist
  """

  alias GroupherServer.CMS

  alias CMS.Communities.Persist
  alias CMS.Model.Community

  @doc "Increments the Community view count only when the read options request it."
  @spec maybe_increment_views(Community.t(), keyword()) ::
          {:ok, Community.t()} | {:error, term()}
  def maybe_increment_views(%Community{} = community, opts) when is_list(opts) do
    case Keyword.get(opts, :inc_views) do
      true -> Persist.increment_views(community)
      false -> {:ok, community}
      nil -> {:ok, community}
    end
  end
end
