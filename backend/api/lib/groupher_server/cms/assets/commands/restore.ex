defmodule GroupherServer.CMS.Assets.Commands.Restore do
  @moduledoc """
  Restores one archived asset through the Receipt-backed CMS command boundary.

      GraphQL / facade -> Restore -> CMS.Command -> Gate -> Persist -> Confirmation
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Assets.Commands.RestoreAssetConfirmation, as: Confirmation
  alias CMS.{Command, ErrorCat}
  alias CMS.Assets.{Persist, Query}
  alias CMS.Communities.Query, as: CommunitiesQuery
  alias CMS.Model.{Community, CommunityAsset}

  @spec execute(Community.t(), term(), User.t(), String.t() | nil) ::
          {:ok, CommunityAsset.t()} | {:error, term()}
  def execute(%Community{} = community, asset_id, %User{} = user, command_id) do
    with {:ok, command_id} <- command_identity(command_id),
         %CommunityAsset{} = asset <-
           Query.asset(community.id, asset_id),
         {:ok, %Confirmation{} = confirmation} <-
           Command.execute(
             %Command{
               actor: user,
               command_id: command_id,
               operation: :asset_restore,
               target: asset,
               params: %{community_id: community.id}
             },
             action: &restore_action/1,
             confirmation: Confirmation
           ) do
      present(confirmation)
    else
      nil -> {:error, ErrorCat.custom("asset not found")}
      {:error, _reason} = error -> error
    end
  end

  def execute(%Community{}, _asset_id, _user, _command_id), do: {:error, :asset_actor_required}

  defp restore_action(%{actor: actor, target: %CommunityAsset{} = asset, command_id: command_id}) do
    community = CommunitiesQuery.get(asset.community_id)

    CMS.Gate.with_community_check(actor, :update, community, fn canonical ->
      with {:ok, restored} <- Persist.restore(canonical, asset.id) do
        {:ok, %Confirmation{data: %{"asset_id" => restored.id, "command_id" => command_id}}}
      end
    end)
  end

  defp present(%Confirmation{data: %{"asset_id" => asset_id, "command_id" => command_id}}) do
    case Query.asset(asset_id) do
      %CommunityAsset{} = asset -> {:ok, Map.put(asset, :command_id, command_id)}
      nil -> {:error, ErrorCat.custom("asset result unavailable")}
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
