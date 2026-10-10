defmodule GroupherServer.Accounts.Fans.Commands.Unfollow do
  @moduledoc """
  Owns the atomic unfollow relationship mutation.

      Facade -> Unfollow command -> Persist + Effects -> commit -> delivery
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Fans.{Effects, ErrorCat, Persist}
  alias Accounts.Model.User
  alias Ecto.Multi

  @doc """
  Removes the follower relationship and its account effects.

  ## Examples

      Accounts.Fans.Commands.Unfollow.run(target_user, follower)
  """
  @spec run(User.t(), User.t()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user, %User{} = follower) do
    with {:ok, %{user: user, target_user: target_user}} <- Persist.prepare_pair(user, follower) do
      result =
        Multi.new()
        |> Multi.run(:delete_relationships, fn _, _ ->
          Persist.delete_relationships(target_user, user)
        end)
        |> Multi.run(:update_user_follow_info, fn _, _ ->
          Persist.update_follow_info(target_user, user, :remove)
        end)
        |> Multi.run(:minus_achievement, fn _, _ ->
          Effects.record_achievement(target_user, :dec)
        end)
        |> Repo.transaction()

      case result do
        {:ok, %{update_user_follow_info: target_user}} ->
          Effects.after_commit(:undo_follow, user, target_user)
          Effects.revalidate_users([user, target_user])
          {:ok, target_user}

        {:error, :delete_relationships, _reason, _steps} ->
          {:error, ErrorCat.already_did("already unfollowed")}

        {:error, :minus_achievement, _reason, _steps} ->
          {:error, ErrorCat.react_fails("follow acieve fails")}

        {:error, _step, reason, _steps} ->
          {:error, reason}
      end
    end
  end
end
