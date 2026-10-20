defmodule GroupherServer.CMS.CommunityApplications.Admission do
  @moduledoc """
  Explicit admission orchestration for Community Application actions.

      Config + named Query
        -> Policy.Input
        -> pure Policy decision
        -> domain ErrorCat or reusable Decision
  """

  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.CMS.CommunityApplications.{Config, Decision, Policy, Query}
  alias GroupherServer.CMS.Communities.ErrorCat

  @doc """
  Runs one application admission with one config read and one blocking query.

  This returns the typed Decision so read facades and the Submit pipeline can
  reuse the same decision projection.

  ## Examples

      Admission.evaluate(:application_create, %User{id: 1})
      #=> {:ok, %CommunityApplications.Decision{
      #     allowed: true,
      #     reason_code: nil,
      #     retry_at: nil,
      #     metadata: %{}
      #   }}
  """
  @spec evaluate(atom(), User.t()) ::
          {:ok, Decision.t()} | {:error, Decision.t()} | {:error, term()}
  def evaluate(action, %User{id: user_id} = actor)
      when is_atom(action) and is_integer(user_id) do
    with {:ok, config} <- Config.application_admission(),
         {:ok, active_application_exists} <- Query.active_application_exists(user_id) do
      input = %Policy.Input{
        feature_enabled: config.enabled,
        active_application_exists: active_application_exists
      }

      Policy.check(actor, action, input)
    end
  end

  def evaluate(_action, %User{}), do: {:error, :invalid_actor}
  def evaluate(_action, _actor), do: {:error, :invalid_actor}

  @doc """
  Runs admission and maps intentional denials to the domain ErrorCat contract.

  ## Examples

      Admission.check(:application_create, %User{id: 1})
      #=> {:ok, %CommunityApplications.Decision{
      #     allowed: true,
      #     reason_code: nil,
      #     retry_at: nil,
      #     metadata: %{}
      #   }}
  """
  @spec check(atom(), User.t()) ::
          {:ok, Decision.t()} | {:error, ErrorCat.error() | term()}
  def check(action, %User{} = actor) when is_atom(action) do
    case evaluate(action, actor) do
      {:ok, %Decision{} = decision} -> {:ok, decision}
      {:error, %Decision{} = decision} -> {:error, denial_error(decision)}
      {:error, _reason} = error -> error
    end
  end

  def check(_action, _actor), do: {:error, :invalid_actor}

  defp denial_error(%Decision{reason_code: :active_application_exists}),
    do: ErrorCat.active_application_exists()

  defp denial_error(%Decision{reason_code: :apply_not_allowed}),
    do: ErrorCat.apply_not_allowed()

  defp denial_error(%Decision{}), do: ErrorCat.apply_not_allowed()
end
