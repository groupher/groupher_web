defmodule GroupherServer.AlertWall.Commands.Resolve do
  @moduledoc """
  Resolves one Wall item without changing its CMS or Accounts resource.

  Business position:

      GraphQL reviewer action
        -> Resolve CommandPipeline + Receipt
          -> AlertWall authorization
            -> Persist item action
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{AlertWall, CMS, Repo}
  alias AlertWall.Model.Item
  alias CMS.Command.ConfirmationDefinition
  alias CMS.Model.Community

  @pipeline operation: :alert_wall_resolve_item,
            access: :user,
            target: :item_id,
            params: [:resolution],
            confirmation: __MODULE__.Confirmation

  defmodule Confirmation do
    @moduledoc """
    Receipt confirmation containing the canonical command result.

    Business position:

        Resolve CommandPipeline -> Receipt -> canonical AlertWall item result
    """

    use ConfirmationDefinition,
      operation: :alert_wall_resolve_item,
      data_keys: ["item_id", "resolution"],
      field_types: %{"item_id" => :integer, "resolution" => :string}
  end

  @doc "Resolves one item through the shared CommandPipeline Receipt."
  def execute(item_id, resolution, actor, command_id)
      when is_integer(item_id) and item_id > 0 and is_binary(resolution) and
             byte_size(resolution) > 0 do
    execute_pipeline(item_id, resolution, actor, command_id)
  end

  def execute(_item_id, _resolution, _actor, _command_id) do
    {:error, AlertWall.ErrorCat.invalid_item()}
  end

  receipt_pipeline execute_pipeline(item_id, resolution, actor, command_id) do
    prepare(fn -> prepare(item_id, resolution) end)
    gate(fn prepared -> authorize(prepared, actor) end)
    change(fn prepared -> resolve(prepared, resolution, actor, command_id) end)
    confirm(fn confirmation -> {:ok, confirmation} end)
    present(fn confirmation -> {:ok, confirmation} end)
  end

  defp prepare(item_id, resolution) do
    case Repo.get(Item, item_id) do
      %Item{} = item ->
        {:ok, %{item: item, resolution: resolution},
         target: {:alert_item, item.id}, params: %{resolution: resolution}}

      nil ->
        {:error, AlertWall.ErrorCat.item_not_found()}
    end
  end

  defp authorize(%{item: %Item{community_id: nil}}, actor) do
    authorize_permission(actor, "review.platform.decide")
  end

  defp authorize(%{item: %Item{community_id: community_id}}, actor) do
    case Repo.get(Community, community_id) do
      %Community{slug: slug} ->
        authorize_permission(actor, "review.decide", %{community: slug})

      nil ->
        {:error, AlertWall.ErrorCat.item_not_found()}
    end
  end

  defp authorize_permission(actor, permission, params \\ %{}) do
    case CMS.passport_authorization_check(actor, permission, params) do
      {:ok, true} -> {:ok, :pass}
      {:error, _reason} = error -> error
      _ -> {:error, CMS.passport_error_cat_permission_denied()}
    end
  end

  defp resolve(%{item: item}, resolution, actor, command_id) do
    with {:ok, updated} <-
           AlertWall.Persist.resolve_in_transaction(item.id, resolution, command_id, actor) do
      {:ok,
       %Confirmation{
         data: %{"item_id" => updated.id, "resolution" => updated.resolution}
       }}
    end
  end
end
