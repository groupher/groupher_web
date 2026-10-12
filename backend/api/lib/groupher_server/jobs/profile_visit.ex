defmodule GroupherServer.Jobs.ProfileVisit do
  @moduledoc """
  Delivers a durable Profile visit through the Accounts Context boundary.

      Profile request -> typed Job -> Accounts Profile Effects
  """

  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:later),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:later),
    unique: [period: :infinity, keys: [:visit_id], states: :all]

  @doc """
  Delivers one typed Profile visit.

  ## Examples

      ProfileVisit.perform(job)
  """
  @impl Oban.Worker
  def perform(%Oban.Job{
        args: %{
          "type" => "profile_visit",
          "version" => 1,
          "profile_id" => profile_id,
          "visit_id" => visit_id
        }
      })
      when is_integer(profile_id) and is_binary(visit_id) do
    GroupherServer.Accounts.profiles_deliver_visit(profile_id)
  end
end
