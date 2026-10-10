defmodule GroupherServer.Activity.Press do
  @moduledoc """
  Owns Press configuration Activity actions and projections.

      Press command -> Press Activity contract -> PressLog
  """

  alias GroupherServer.{Activity, CMS}
  alias Activity.Event
  alias Activity.Model.PressLog
  alias CMS.Model.PressConfig

  @contracts %{
    config_updated:
      Event.contract(
        [
          :markdown_enabled,
          :feed_enabled,
          :feed_type,
          :feed_count,
          :feed_threads,
          :llms_enabled,
          :sitemap_enabled
        ],
        [:revision],
        [:community_log]
      )
  }

  @doc """
  Returns Press's classified configuration Activity contracts.

  ## Examples

      Activity.Press.contracts()[:config_updated].classification
  """
  def contracts, do: Event.classify_contracts(@contracts)

  @doc """
  Returns the Press Activity log schema.

  ## Examples

      Activity.Press.schema()
  """
  def schema, do: PressLog

  @doc """
  Returns the field used as the Press Activity stream reference.

  ## Examples

      Activity.Press.stream_field()
  """
  def stream_field, do: :press_ref

  @doc """
  Returns the public resource type used by Press Activity filters.

  ## Examples

      Activity.Press.resource_type()
  """
  def resource_type, do: :press

  @doc """
  Builds and persists a Press Activity event.

  ## Examples

      Activity.Press.log(config, :config_updated, actor: actor)
  """
  def log(resource, action, opts), do: Event.log(__MODULE__, resource, action, opts)

  @doc """
  Projects a Press Activity row for a public surface.

  ## Examples

      Activity.Press.project(log, :community_log)
  """
  def project(log, surface), do: Event.project(__MODULE__, log, surface)

  @doc """
  Lists the Press actions exposed on a public Activity surface.

  ## Examples

      Activity.Press.surface_actions(:community_log)
  """
  def surface_actions(surface), do: Event.surface_actions(__MODULE__, surface)

  @doc """
  Describes a Press configuration for an Activity event envelope.

  ## Examples

      Activity.Press.describe(config, :config_updated, [])
  """
  def describe(%PressConfig{} = config, _action, opts) do
    ref = Keyword.get(opts, :stream_ref, config.community_id)
    {:ok, descriptor(config.community_id, ref, config)}
  end

  def describe(%{activity_type: :press, community_id: id, ref: ref} = resource, _action, _opts) do
    {:ok, descriptor(id, ref, resource)}
  end

  def describe(_, _, _), do: {:error, Event.error("invalid Activity Press resource")}

  defp descriptor(id, ref, resource) do
    snapshot = Event.snapshot(resource, [:revision])

    %{
      community_id: id,
      press_ref: Event.stringify(ref),
      stream_snapshot: snapshot,
      subject_type: "press_config",
      subject_ref: Event.stringify(ref),
      subject_snapshot: snapshot,
      target_type: nil,
      target_ref: nil,
      target_snapshot: %{}
    }
  end
end
