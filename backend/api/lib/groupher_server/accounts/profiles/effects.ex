defmodule GroupherServer.Accounts.Profiles.Effects do
  @moduledoc """
  Applies profile post-commit cache effects and response shaping.

      committed profile row -> Effects -> FrontDesk / response preload
  """

  alias GroupherServer.{Accounts, FrontDesk, Jobs, Messaging, Repo}
  alias Accounts.Model.User
  alias Accounts.Profiles.Persist

  @doc """
  Enqueues one durable, idempotent Profile visit without changing the read result.

  ## Examples

      Profiles.Effects.record_visit(user.id, visit_id)
  """
  @spec record_visit(integer(), Ecto.UUID.t()) :: {:ok, :pass}
  def record_visit(profile_id, visit_id) when is_integer(profile_id) and is_binary(visit_id) do
    Jobs.enqueue_best_effort(:profile_visit, profile_id, fn ->
      Jobs.profile_visit(profile_id, visit_id)
    end)
  end

  @doc """
  Reloads a Profile, records one visit, and invalidates its public cache.

  ## Examples

      Profiles.Effects.deliver_visit(user.id)
  """
  @spec deliver_visit(integer()) :: {:ok, User.t()} | {:error, term()}
  def deliver_visit(profile_id) when is_integer(profile_id) do
    with {:ok, user} <- Accounts.FrontDesk.fresh_user(profile_id),
         {:ok, user} <- Persist.increment_views(user),
         {:ok, :pass} <- revalidate_user(user) do
      {:ok, user}
    end
  end

  @doc """
  Revalidates a user's profile cache after a mutation.

  ## Examples

      Accounts.Profiles.Effects.revalidate_user(user)
  """
  @spec revalidate_user(User.t()) :: {:ok, :pass}
  def revalidate_user(%User{login: login}) when is_binary(login) do
    FrontDesk.revalidate_user(login)
    {:ok, :pass}
  end

  def revalidate_user(%User{}), do: {:ok, :pass}

  @doc """
  Applies post-commit effects for a newly registered OAuth account.

  ## Examples

      Accounts.Profiles.Effects.oauth_registration_completed(user)
  """
  @spec oauth_registration_completed(User.t()) :: {:ok, :pass}
  def oauth_registration_completed(%User{} = user) do
    FrontDesk.revalidate_user(user.login)

    Messaging.notify(:welcome_new_register, %{
      user_id: user.id,
      login: user.login,
      nickname: user.nickname,
      email: user.email
    })

    Messaging.notify(:notify_admin_new_register, %{
      user_id: user.id,
      login: user.login,
      nickname: user.nickname,
      email: user.email
    })

    {:ok, :pass}
  end

  @doc """
  Preloads an updated social projection when the request changed social fields.

  ## Examples

      Accounts.Profiles.Effects.maybe_preload_social({:ok, user}, %{social: %{github: "x"}})
  """
  @spec maybe_preload_social({:ok, User.t()} | {:error, term()}, map()) ::
          {:ok, User.t()} | {:error, term()}
  def maybe_preload_social({:ok, %User{} = user}, %{social: _}) do
    {:ok, Repo.preload(user, :social, force: true)}
  end

  def maybe_preload_social(response, _attrs), do: response
end
