defmodule GroupherServer.CMS.CommunityApplications.Commands.Cancel do
  @moduledoc """
  Receipt-backed applicant cancellation Command.

      GraphQL -> Cancel Command -> Application Gate -> Persist / Lifecycle -> Receipt result
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.{Command, Gate}
  alias Ecto.Multi
  alias CMS.Communities.{ErrorCat, SlugClaims}
  alias CMS.CommunityApplications.{Commands.Confirmation, Commands.Support, Lifecycle}
  alias Helper.{T, Transaction}

  @spec execute(String.t(), User.t(), integer(), Ecto.UUID.t()) :: T.domain_res(term())
  def execute(public_ref, %User{} = actor, expected_version, command_id) do
    with {:ok, application} <- Support.application(public_ref) do
      command = %Command{
        actor: actor,
        command_id: command_id,
        operation: :community_application_cancel,
        target: application,
        params: %{expected_version: expected_version}
      }

      with {:ok, confirmation} <-
             Command.execute(command, action: &action/1, confirmation: Confirmation) do
        Support.result(confirmation)
      end
    end
  end

  defp action(%{
         actor: actor,
         target: application,
         params: %{expected_version: version},
         command_id: id
       }) do
    with {:ok, _} <-
           Gate.with_application_check(actor, :application_cancel, application, fn canonical ->
             cancel_application(canonical, actor, version)
           end) do
      {:ok, Support.confirmation(Confirmation, application.id, id)}
    end
  end

  defp cancel_application(application, actor, expected_version) do
    now = DateTime.utc_now(:second)

    with {:ok, _} <- expected_version(application, expected_version),
         {:ok, %{application: updated}} <-
           Multi.new()
           |> Lifecycle.add(
             :application,
             :event,
             application,
             :cancelled,
             %{cancelled_at: now, expires_at: nil},
             %{type: :applicant, id: actor.id, occurred_at: now}
           )
           |> SlugClaims.release_application(:claim, application, now)
           |> Transaction.run() do
      {:ok, updated}
    end
  end

  defp expected_version(%{version: version}, version), do: {:ok, :pass}
  defp expected_version(_, _), do: {:error, ErrorCat.application_state_conflict()}
end
