defmodule GroupherServer.Accounts.Fans.Effects do
  @moduledoc """
  Applies follow side effects after the relationship transaction commits.

      committed follow relationship
          -> achievement update
          -> account event delivery
          -> user cache revalidation
  """

  alias GroupherServer.{Accounts, FrontDesk, Jobs}
  alias Accounts.{Achievements, Events, Model}
  alias Model.User

  @doc """
  Records the follow achievement inside the command's transaction boundary.

  ## Examples

      Accounts.Fans.Effects.record_achievement(target_user, :inc)
  """
  @spec record_achievement(User.t(), :inc | :dec) :: {:ok, term()} | {:error, term()}
  def record_achievement(%User{} = target_user, operation) do
    Achievements.achieve(%User{id: target_user.id}, operation, :follow)
  end

  @doc """
  Enqueues a semantic follow event in the caller's transaction.

  ## Examples

      Accounts.Fans.Effects.enqueue_event(:follow, follower, target_user)
  """
  @spec enqueue_event(:follow | :undo_follow, User.t(), User.t()) ::
          {:ok, term()} | {:error, term()}
  def enqueue_event(event, %User{} = user, %User{} = target_user) do
    Jobs.enqueue_later({Events, :emit, [event, %{user: user, from_user: target_user}]})
  end

  @doc """
  Revalidates both users after a follow transaction commits.

  ## Examples

      Accounts.Fans.Effects.revalidate_users([follower, target_user])
  """
  @spec revalidate_users([User.t()]) :: {:ok, :pass}
  def revalidate_users(users) when is_list(users) do
    users
    |> Enum.map(& &1.login)
    |> Enum.reject(&is_nil/1)
    |> Enum.uniq()
    |> FrontDesk.revalidate_users()

    {:ok, :pass}
  end
end
