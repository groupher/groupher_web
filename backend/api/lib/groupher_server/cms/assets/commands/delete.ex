defmodule GroupherServer.CMS.Assets.Commands.Delete do
  @moduledoc """
  Deletes one unreferenced asset through the Receipt boundary.

      GraphQL / facade -> Delete -> CMS.Command -> Gate + Persist + Outbox
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Assets.Commands.DeleteAssetConfirmation, as: Confirmation
  alias CMS.Assets.{Effects, Persist, Query}
  alias CMS.Communities.Query, as: CommunitiesQuery
  alias CMS.{Command, ErrorCat}
  alias CMS.Model.{Community, CommunityAsset}

  @spec execute(Community.t(), term(), User.t(), String.t() | nil) ::
          {:ok, CommunityAsset.t()} | {:error, term()}
  def execute(%Community{} = community, asset_id, %User{} = actor, command_id) do
    with {:ok, command_id} <- command_identity(command_id),
         %CommunityAsset{} = asset <-
           Query.asset(community.id, asset_id) do
      command = %Command{
        actor: actor,
        command_id: command_id,
        operation: :asset_delete,
        target: asset,
        params: %{community_id: community.id}
      }

      with {:ok, %Confirmation{} = confirmation} <-
             Command.execute(command, action: &delete_action/1, confirmation: Confirmation) do
        present(confirmation)
      end
    else
      nil -> {:error, ErrorCat.custom("asset not found")}
      {:error, _reason} = error -> error
    end
  end

  def execute(%Community{}, _asset_id, _actor, _command_id) do
    {:error, :asset_actor_required}
  end

  defp delete_action(%{actor: actor, target: %CommunityAsset{} = asset, command_id: command_id}) do
    community = CommunitiesQuery.get(asset.community_id)

    CMS.Gate.with_community_check(actor, :update, community, fn canonical ->
      with {:ok, deleted} <- Persist.delete(canonical, asset.id),
           {:ok, _event} <-
             Effects.enqueue_provider_delete(deleted, {:command, command_id}) do
        {:ok,
         %Confirmation{
           data: %{
             "asset_id" => deleted.id,
             "command_id" => command_id
           }
         }}
      end
    end)
  end

  defp present(%Confirmation{data: %{"asset_id" => asset_id, "command_id" => command_id}}) do
    case Query.asset(asset_id) do
      %CommunityAsset{} = asset -> {:ok, Map.put(asset, :command_id, command_id)}
      nil -> {:error, ErrorCat.command_result_unavailable()}
    end
  end

  defp command_identity(command_id) do
    case Ecto.UUID.cast(command_id) do
      {:ok, command_id} ->
        {:ok, command_id}

      :error ->
        if is_nil(command_id) do
          {:error, ErrorCat.command_id_required()}
        else
          {:error, ErrorCat.command_id_invalid()}
        end
    end
  end
end
