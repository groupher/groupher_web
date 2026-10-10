defmodule GroupherServer.CMS.Wallpaper.Commands.Publish do
  @moduledoc """
  Publishes one Wallpaper Snapshot through Gate and the shared Command receipt.

      GraphQL -> Wallpaper.Commands.Publish -> Gate -> Wallpaper.Workflow
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Command
  alias CMS.Model.Community
  alias CMS.Wallpaper.Workflow
  alias CMS.Wallpaper.Commands.Confirmation
  alias Helper.T

  @spec execute(Community.t(), map(), User.t()) :: T.domain_res(map())
  def execute(%Community{} = community, input, %User{} = actor) when is_map(input) do
    command_id = get(input, :command_id)

    command = %Command{
      actor: actor,
      command_id: command_id,
      operation: :wallpaper_publish,
      target: community,
      params: input
    }

    with {:ok, confirmation} <-
           Command.execute(command, action: &action/1, confirmation: Confirmation) do
      Confirmation.result(confirmation)
    end
  end

  defp action(%{actor: actor, target: %Community{} = community, params: input, command_id: id}) do
    CMS.Gate.with_community_check(actor, :update, community, fn canonical ->
      input = input |> Map.delete("command_id") |> Map.put(:command_id, id)

      with {:ok, %{version: version}} <- Workflow.run_publish(canonical, input, actor) do
        {:ok, Confirmation.build(Confirmation, canonical.id, version, id)}
      end
    end)
  end

  defp get(map, key) when is_map(map) and is_atom(key) do
    Map.get(map, key) || Map.get(map, Atom.to_string(key))
  end

  defp get(_map, _key), do: nil
end
