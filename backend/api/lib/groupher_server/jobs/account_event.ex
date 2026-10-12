defmodule GroupherServer.Jobs.AccountEvent do
  @moduledoc """
  Executes the finite set of durable Accounts event contracts.

      Accounts effect intent -> AccountEvent Worker -> Accounts Facade
  """
  use Oban.Worker,
    queue: GroupherServer.Jobs.Config.queue(:later),
    max_attempts: GroupherServer.Jobs.Config.max_attempts(:later)

  @types ~w(follow undo_follow)
  @doc """
  Delivers one typed Account event.

  ## Examples

      AccountEvent.perform(%Oban.Job{
        args: %{
          "type" => "follow",
          "version" => 1,
          "user_id" => target_user_id,
          "from_user_id" => follower_id
        }
      })
  """
  @impl Oban.Worker
  def perform(%Oban.Job{
        args: %{
          "type" => type,
          "version" => 1,
          "user_id" => user_id,
          "from_user_id" => from_user_id
        }
      })
      when type in @types do
    GroupherServer.Accounts.fans_deliver_event(
      String.to_existing_atom(type),
      user_id,
      from_user_id
    )
  end
end
