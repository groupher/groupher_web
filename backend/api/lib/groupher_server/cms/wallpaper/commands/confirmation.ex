defmodule GroupherServer.CMS.Wallpaper.Commands.Confirmation do
  @moduledoc """
  Receipt codec for Wallpaper publish and restore commands.

      Wallpaper Command -> Confirmation -> CMS.Command receipt recovery
  """

  use GroupherServer.CMS.Command.ConfirmationDefinition,
    operation: :wallpaper_publish,
    operations: [:wallpaper_publish, :wallpaper_restore_snapshot],
    data_keys: ["community_id", "version", "command_id"],
    field_types: %{
      "community_id" => :integer,
      "version" => :integer,
      "command_id" => :string
    }

  alias GroupherServer.CMS

  alias CMS.Wallpaper.Query

  @doc "Builds the stable result stored in the shared Command receipt."
  def build(module, community_id, version, command_id) when is_atom(module) do
    struct(module,
      data: %{
        "community_id" => community_id,
        "version" => version,
        "command_id" => command_id
      }
    )
  end

  @doc "Presents a recovered or freshly executed Wallpaper result."
  def result(%__MODULE__{data: %{"community_id" => community_id, "version" => version}}) do
    current_version = Query.wallpaper(community_id).version
    {:ok, %{version: max(current_version, version)}}
  end
end
