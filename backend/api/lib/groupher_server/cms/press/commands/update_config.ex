defmodule GroupherServer.CMS.Press.Commands.UpdateConfig do
  @moduledoc """
  Updates one Community's Press configuration through the Receipt boundary.

      commandId -> UpdateConfig -> Receipt -> Gate -> Persist -> Activity -> Effects
  """

  alias GroupherServer.{Accounts, CMS, Activity}

  alias CMS.{Command, Gate}
  alias CMS.Command.ConfirmationDefinition
  alias CMS.Model.{Community, PressConfig}
  alias CMS.Press.{Effects, Persist, Query}
  alias Accounts.Model.User
  alias Helper.T

  defmodule Confirmation do
    @moduledoc """
    Recovers the stable Press config community and revision after a lost response.

        Press config mutation -> Confirmation -> Press.Query.config
    """

    use ConfirmationDefinition,
      operation: :press_config_update,
      data_keys: ["community", "revision", "command_id"],
      field_types: %{
        "community" => :string,
        "revision" => :integer,
        "command_id" => :string
      }
  end

  @spec execute(Community.t() | String.t(), map(), User.t(), Ecto.UUID.t()) ::
          T.domain_res(PressConfig.t() | map())
  def execute(community_ref, attrs, %User{} = actor, command_id) do
    with {:ok, community} <- Query.internal_community(community_ref) do
      command = %Command{
        actor: actor,
        command_id: command_id,
        operation: :press_config_update,
        target: community,
        params: attrs
      }

      with {:ok, confirmation} <-
             Command.execute(command, action: &action/1, confirmation: Confirmation) do
        present(confirmation)
      end
    end
  end

  defp action(%{
         actor: actor,
         target: %Community{} = community,
         params: attrs,
         command_id: command_id
       }) do
    with {:ok, config} <-
           Gate.with_community_check(actor, :update, community, fn canonical ->
             with {:ok, current} <- Query.config(canonical),
                  changeset = Persist.changeset(canonical, current, attrs),
                  {:ok, config} <- Persist.insert_or_update(changeset),
                  changed_payload = Map.take(changeset.changes, config_fields()),
                  {:ok, _activity} <-
                    Activity.log(config, :config_updated,
                      actor: actor,
                      source: :admin,
                      operation_ref: command_id,
                      stream_ref: canonical.slug,
                      occurred_at: config.updated_at,
                      payload: changed_payload,
                      changed_fields: Map.keys(changed_payload),
                      metadata: %{revision: config.revision}
                    ),
                  {:ok, _effect} <- Effects.enqueue_invalidation(canonical, command_id) do
               {:ok, config}
             end
           end),
         %PressConfig{revision: revision} <- config do
      {:ok,
       %Confirmation{
         data: %{
           "community" => community.slug,
           "revision" => revision,
           "command_id" => command_id
         }
       }}
    end
  end

  defp present(%Confirmation{data: %{"community" => community}}),
    do: Query.config(community)

  defp present(_confirmation), do: {:error, CMS.ErrorCat.command_result_unavailable()}

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
