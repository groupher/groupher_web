defmodule GroupherServer.CMS.Dashboard.PagiMode do
  @moduledoc """
  Validates community-wide desktop/mobile interactions and owns the server default policy.
  Clients select the viewport preference and send explicit Pagi input. Requests without
  viewport context use the desktop default; limits and revision stay server-owned.

  Business position:

      Dashboard preference mutation
        -> Persist revisioned desktop/mobile modes
        -> shared cached policy
        -> list request resolves explicit offset or cursor behavior
  """
  import Ecto.Query
  alias GroupherServer.{Pagi, Repo}
  alias GroupherServer.{CMS}
  alias CMS.Model.{Community, CommunityDashboard}
  alias Helper.Cache

  @modes [:page, :load_more, :infinite_scroll]
  @cache_pool :common

  @doc "Resolves one stored preference into the canonical execution policy."
  def effective(mode, revision \\ 0) do
    with {:ok, mode} <- normalize(mode) do
      Pagi.normalize(%{
        api: if(mode == :page, do: :offset, else: :cursor),
        mode: mode,
        revision: revision,
        schema_version: 1,
        default_size: 20,
        max_size: 100
      })
    end
  end

  @doc "Validates the three supported product interactions."
  def normalize(mode) when mode in @modes, do: {:ok, mode}

  def normalize(mode) when is_binary(mode) do
    case Enum.find(@modes, &(Atom.to_string(&1) == mode)) do
      nil -> {:error, Pagi.invalid_config()}
      mode -> {:ok, mode}
    end
  end

  def normalize(_mode), do: {:error, Pagi.invalid_config()}

  @doc "Loads the shared community policy, refreshing on a revision mismatch."
  def for_community(slug, opts \\ [])

  def for_community(slug, opts) when is_binary(slug) do
    with {:ok, effective} <- cached(slug) do
      expected = Keyword.get(opts, :expected_revision)

      if is_integer(expected) and effective.config.revision != expected do
        with {:ok, _} <- invalidate(slug), do: cached(slug)
      else
        {:ok, effective}
      end
    end
  end

  def for_community(_, _), do: effective(:page)

  @doc "Invalidates the single policy shared by every list surface."
  def invalidate(slug), do: Cache.delete(@cache_pool, cache_key(slug))

  defp cached(slug) do
    Cache.get_or_fetch(@cache_pool, cache_key(slug), [expire_sec: 60], fn ->
      stored =
        from(community in Community,
          left_join: dashboard in CommunityDashboard,
          on: dashboard.community_id == community.id,
          where: community.slug == ^slug,
          select: {dashboard.pagi_mode, dashboard.pagi_revision}
        )
        |> Repo.one()

      case stored do
        {mode, revision} -> effective(mode || :page, revision || 0)
        nil -> effective(:page)
      end
    end)
  end

  defp cache_key(slug), do: "dashboard-pagi-mode:#{slug}"
end
