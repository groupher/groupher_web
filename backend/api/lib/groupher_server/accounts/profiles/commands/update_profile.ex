defmodule GroupherServer.Accounts.Profiles.Commands.UpdateProfile do
  @moduledoc """
  Owns the atomic user-profile mutation.

      UpdateProfile -> Persist -> commit -> Effects
  """

  alias GroupherServer.{Accounts, Repo}
  alias Accounts.Model.User
  alias Accounts.Profiles.{Effects, Persist}

  @doc """
  Updates editable profile and optional social fields.

  ## Examples

      Accounts.Profiles.Commands.UpdateProfile.run(user, %{nickname: "Alice"})
  """
  @spec run(User.t(), map()) :: {:ok, User.t()} | {:error, term()}
  def run(%User{} = user, attrs) do
    case Repo.transaction(fn ->
           case Persist.update_profile(user, attrs) do
             {:ok, user} -> user
             {:error, reason} -> Repo.rollback(reason)
           end
         end) do
      {:ok, user} ->
        Effects.revalidate_user(user)
        Effects.maybe_preload_social({:ok, user}, attrs)

      {:error, reason} ->
        {:error, reason}
    end
  end
end
