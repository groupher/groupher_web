defmodule GroupherServer.CMS.Dashboard.Pagination do
  @moduledoc """
  Owns Dashboard-backed pagination surface storage and lookup.

      CommunityDashboard.pagination
        -> Pagi.Config.normalize/1
        -> EffectiveConfig.config
        -> Articles.Pagination / ORM.pagi

  The module deliberately stores only normalized surface maps. A missing
  surface remains missing so reads can apply the platform default without
  manufacturing per-surface configuration rows.
  """

  import Ecto.Query, warn: false

  alias GroupherServer.{CMS, Pagi, Repo}
  alias GroupherServer.Pagi.EffectiveConfig
  alias CMS.Model.{Community, CommunityDashboard}
  alias Helper.Cache

  @surfaces [:posts, :changelogs, :comments]

  @doc """
  Returns the supported Dashboard pagination surface keys.

  ## Examples

      [:posts, :changelogs, :comments] = GroupherServer.CMS.Dashboard.Pagination.surfaces()
  """
  @spec surfaces() :: [atom()]
  def surfaces, do: @surfaces

  @doc "Normalizes all supplied Dashboard surfaces and rejects unknown keys."
  @spec normalize(nil | map()) :: {:ok, nil | map()} | {:error, term()}
  def normalize(nil), do: {:ok, nil}

  def normalize(%{} = raw) do
    with {:ok, entries} <- canonical_entries(raw),
         {:ok, normalized} <- normalize_entries(entries) do
      {:ok, normalized}
    end
  end

  def normalize(_raw), do: {:error, :invalid_config}

  @doc """
  Resolves one surface from stored Dashboard data or the platform default.

  ## Examples

      {:ok, %EffectiveConfig{mode: :page}} =
        GroupherServer.CMS.Dashboard.Pagination.effective(nil, :posts)
  """
  @spec effective(nil | map(), atom()) :: {:ok, EffectiveConfig.t()} | {:error, term()}
  def effective(raw, surface) when surface in @surfaces do
    Pagi.normalize(surface_config(raw, surface))
  end

  def effective(_raw, _surface), do: {:error, :invalid_config}

  @cache_pool :common
  @cache_ttl_seconds 60

  @doc "Loads one effective surface config by Community slug through the canonical config cache."
  @spec for_community(String.t() | nil, atom(), keyword()) ::
          {:ok, EffectiveConfig.t()} | {:error, term()}
  def for_community(community_slug, surface, opts \\ [])

  def for_community(community_slug, surface, opts) when is_binary(community_slug) do
    cache_key = cache_key(community_slug, surface)

    with {:ok, config} <- cached_for_community(cache_key, community_slug, surface) do
      maybe_refresh_stale(config, cache_key, community_slug, surface, opts)
    end
  end

  def for_community(_community_slug, surface, _opts), do: effective(nil, surface)

  @doc "Evicts one community surface after its revision changes."
  @spec invalidate(String.t(), atom()) :: {:ok, boolean()} | {:error, term()}
  def invalidate(community_slug, surface)
      when is_binary(community_slug) and surface in @surfaces do
    Cache.delete(@cache_pool, cache_key(community_slug, surface))
  end

  @doc "Builds the next normalized surface config under an expected revision."
  @spec next_config(nil | map(), atom(), map(), non_neg_integer()) ::
          {:ok, map()} | {:error, term()}
  def next_config(raw, surface, attrs, expected_revision)
      when surface in @surfaces and is_map(attrs) do
    with {:ok, current} <- normalize(raw),
         {:ok, current_revision} <- current_revision(current, surface),
         {:ok, :pass} <- validate_expected_revision(expected_revision, current_revision),
         false <- Map.has_key?(attrs, :revision) or Map.has_key?(attrs, "revision"),
         {:ok, %EffectiveConfig{} = config} <-
           attrs
           |> Map.put(:revision, current_revision + 1)
           |> Pagi.normalize() do
      normalized = current || %{}
      {:ok, Map.put(normalized, surface, serialize(config))}
    else
      true -> {:error, Pagi.invalid_config()}
      {:error, _reason} = error -> error
    end
  end

  def next_config(_raw, _surface, _attrs, _expected_revision) do
    {:error, Pagi.invalid_config()}
  end

  defp load_for_community(community_slug, surface) do
    pagination =
      from(community in Community,
        left_join: dashboard in CommunityDashboard,
        on: dashboard.community_id == community.id,
        where: community.slug == ^community_slug,
        select: dashboard.pagination
      )
      |> Repo.one()

    effective(pagination, surface)
  end

  defp cached_for_community(cache_key, community_slug, surface) do
    Cache.get_or_fetch(@cache_pool, cache_key, [expire_sec: @cache_ttl_seconds], fn ->
      load_for_community(community_slug, surface)
    end)
  end

  defp maybe_refresh_stale(config, cache_key, community_slug, surface, opts) do
    expected_revision = Keyword.get(opts, :expected_revision)

    if is_integer(expected_revision) and config.config.revision != expected_revision do
      with {:ok, _deleted?} <- Cache.delete(@cache_pool, cache_key) do
        cached_for_community(cache_key, community_slug, surface)
      end
    else
      {:ok, config}
    end
  end

  @doc "Returns the normalized map accepted by CommunityDashboard changesets."
  @spec normalize_for_changeset(nil | map()) :: {:ok, nil | map()} | {:error, term()}
  def normalize_for_changeset(raw), do: normalize(raw)

  defp canonical_entries(raw) do
    Enum.reduce_while(raw, {:ok, %{}}, fn {key, value}, {:ok, acc} ->
      with {:ok, surface} <- canonical_surface(key),
           true <- not Map.has_key?(acc, surface) do
        {:cont, {:ok, Map.put(acc, surface, value)}}
      else
        _ -> {:halt, {:error, :invalid_config}}
      end
    end)
  end

  defp canonical_surface(surface) when surface in @surfaces, do: {:ok, surface}

  defp canonical_surface(surface) when is_binary(surface) do
    case Enum.find(@surfaces, &(Atom.to_string(&1) == surface)) do
      nil -> {:error, :invalid_config}
      value -> {:ok, value}
    end
  end

  defp canonical_surface(_surface), do: {:error, :invalid_config}

  defp normalize_entries(entries) do
    Enum.reduce_while(entries, {:ok, %{}}, fn {surface, raw}, {:ok, acc} ->
      case Pagi.normalize(raw) do
        {:ok, %EffectiveConfig{} = config} ->
          {:cont, {:ok, Map.put(acc, surface, serialize(config))}}

        {:error, _reason} = error ->
          {:halt, error}
      end
    end)
  end

  defp current_revision(raw, surface) do
    with {:ok, %EffectiveConfig{config: config}} <- effective(raw, surface) do
      {:ok, config.revision}
    end
  end

  defp validate_expected_revision(expected, current)
       when is_integer(expected) and expected >= 0 do
    if expected == current,
      do: {:ok, :pass},
      else: {:error, Pagi.config_mismatch(%{mismatch: :revision})}
  end

  defp validate_expected_revision(_expected, _current) do
    {:error, Pagi.invalid_config_context()}
  end

  defp cache_key(community_slug, surface) do
    "dashboard-pagination:#{community_slug}:#{surface}"
  end

  defp surface_config(raw, surface) when is_map(raw) do
    Map.get(raw, surface) || Map.get(raw, Atom.to_string(surface))
  end

  defp surface_config(_raw, _surface), do: nil

  defp serialize(%EffectiveConfig{config: config, mode: mode, schema_version: version}) do
    %{
      schema_version: version,
      api: config.api,
      mode: mode,
      revision: config.revision,
      default_size: config.default_size,
      max_size: config.max_size
    }
  end
end
