defmodule GroupherServer.CMS.CommunityApplications.Policy do
  @moduledoc """
  Pure decision rules for Community Application admission.

  Config and blocking-application queries are owned by
  `CommunityApplications.Admission`; this module only combines typed input
  facts with the requested action.

      actor + action + Policy.Input -> allow/deny Decision
  """

  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.CMS.CommunityApplications.{Decision, Policy.Input}

  @doc """
  Evaluates one known application action from already-loaded facts.

  Policy is pure: configuration and blocking-application queries must already
  have been resolved into `Policy.Input`.

  ## Examples

      Policy.check(%User{id: 1}, :application_create, %Policy.Input{
        feature_enabled: true,
        active_application_exists: false
      })
      #=> {:ok, %Decision{allowed: true, reason_code: nil, retry_at: nil, metadata: %{}}}
  """
  @spec check(User.t(), atom(), Input.t()) ::
          {:ok, Decision.t()} | {:error, Decision.t()}
  def check(%User{}, action, %Input{feature_enabled: false, active_application_exists: active?})
      when action in [:application_create, :application_logo_upload_create] and
             is_boolean(active?) do
    {:error, decision(false, :apply_not_allowed, %{policy: "feature_flag"})}
  end

  def check(%User{}, action, %Input{feature_enabled: true, active_application_exists: true})
      when action in [:application_create, :application_logo_upload_create] do
    {:error, decision(false, :active_application_exists, %{policy: "single_active_application"})}
  end

  def check(%User{}, action, %Input{feature_enabled: true, active_application_exists: false})
      when action in [:application_create, :application_logo_upload_create] do
    {:ok, decision(true, nil, %{})}
  end

  def check(%User{}, action, %Input{})
      when action in [:application_create, :application_logo_upload_create] do
    {:error, decision(false, :apply_not_allowed, %{policy: "invalid_input"})}
  end

  def check(%User{}, _action, %Input{}) do
    {:error, decision(false, :apply_not_allowed, %{policy: "unknown_action"})}
  end

  def check(_actor, _action, _input) do
    {:error, decision(false, :apply_not_allowed, %{policy: "invalid_actor_or_input"})}
  end

  defp decision(allowed, reason_code, metadata) do
    %Decision{
      allowed: allowed,
      reason_code: reason_code,
      retry_at: nil,
      metadata: metadata
    }
  end
end
