defmodule GroupherServer.Accounts.Fans.Commands.Follow do
  @moduledoc """
  Owns the atomic follow relationship mutation.

      Facade -> Follow command -> Persist + Effects -> commit -> delivery
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Fans.{Effects, ErrorCat, Persist}
  alias Accounts.Model.User
  alias Ecto.Multi

  @doc """
  Creates the follower relationship and its account effects.

  ## Examples

      Accounts.Fans.Commands.Follow.run(follower, target_user)
  """
  @spec run(User.t(), User.t()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user, %User{} = follower) do
    with {:ok, %{user: user, target_user: target_user}} <- Persist.prepare_pair(user, follower) do
      result =
        Multi.new()
        |> Multi.run(:create_relationships, fn _, _ ->
          Persist.insert_relationships(target_user, user)
        end)
        |> Multi.run(:update_user_follow_info, fn _, _ ->
          Persist.update_follow_info(target_user, user, :add)
        end)
        |> Multi.run(:add_achievement, fn _, _ ->
          Effects.record_achievement(target_user, :inc)
        end)
        |> Multi.run(:enqueue_event, fn _, _ ->
          Effects.enqueue_event(:follow, user, target_user)
        end)
        |> Repo.transaction()

      case result do
        {:ok, %{update_user_follow_info: target_user}} ->
          Effects.revalidate_users([user, target_user])
          {:ok, target_user}

        {:error, :create_relationships, {:insert_follower_failed, _reason}, _steps} ->
          {:error, ErrorCat.already_did("already followed")}

        {:error, :create_relationships, {_step, reason}, _steps} ->
          {:error, reason}

        {:error, :add_achievement, _reason, _steps} ->
          {:error, ErrorCat.react_fails("follow acieve fails")}

        {:error, _step, reason, _steps} ->
          {:error, reason}
      end
    end
  end
end
