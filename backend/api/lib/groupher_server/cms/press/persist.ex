defmodule GroupherServer.CMS.Press.Persist do
  @moduledoc """
  Owns Press configuration row mechanics inside a caller-owned transaction.

  The Command owns Gate admission, Activity, command identity and the
  transaction boundary. Post-commit cache invalidation belongs to Effects.

      Press.Commands.UpdateConfig
        -> Press.Persist
        -> press_configs
  """

  alias GroupherServer.{CMS, Repo}

  alias CMS.Model.{Community, PressConfig}

  @doc "Builds the insert/update changeset for one Community Press config."
  def changeset(%Community{} = community, current, attrs) when is_map(attrs) do
    attrs = normalize_attrs(attrs)

    case current do
      %PressConfig{} = config ->
        PressConfig.changeset(config, Map.put(attrs, :revision, config.revision + 1))

      _ ->
        PressConfig.changeset(
          %PressConfig{},
          current
          |> Map.take(config_fields())
          |> Map.merge(attrs)
          |> Map.merge(%{community_id: community.id, revision: 1})
        )
    end
  end

  @doc "Persists one already-prepared Press config changeset."
  def insert_or_update(%Ecto.Changeset{} = changeset), do: Repo.insert_or_update(changeset)

  defp normalize_attrs(attrs) do
    case Map.fetch(attrs, :feed_threads) do
      {:ok, threads} -> Map.put(attrs, :feed_threads, Enum.map(threads, &to_string/1))
      :error -> attrs
    end
  end

  defp config_fields do
    [
      :markdown_enabled,
      :feed_enabled,
      :feed_type,
      :feed_count,
      :feed_threads,
      :llms_enabled,
      :sitemap_enabled
    ]
  end
end
