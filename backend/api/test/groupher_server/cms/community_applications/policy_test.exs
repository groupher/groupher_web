defmodule GroupherServer.Test.CMS.CommunityApplications.PolicyTest do
  @moduledoc false

  use ExUnit.Case, async: true

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.CommunityApplications.{Decision, Policy}
  alias CMS.CommunityApplications.Policy.Input

  @actor %User{id: 1}

  test "feature flag denial is a typed decision" do
    input = %Input{feature_enabled: false, active_application_exists: false}

    assert {:error, %Decision{allowed: false, reason_code: :apply_not_allowed}} =
             Policy.check(@actor, :application_create, input)
  end

  test "an active application denies both admission actions" do
    input = %Input{feature_enabled: true, active_application_exists: true}

    for action <- [:application_create, :application_logo_upload_create] do
      assert {:error, %Decision{allowed: false, reason_code: :active_application_exists}} =
               Policy.check(@actor, action, input)
    end
  end

  test "an enabled actor with no active application is admitted" do
    input = %Input{feature_enabled: true, active_application_exists: false}

    assert {:ok, %Decision{allowed: true, reason_code: nil}} =
             Policy.check(@actor, :application_create, input)
  end

  test "unknown actions fail closed" do
    input = %Input{feature_enabled: true, active_application_exists: false}

    assert {:error, %Decision{allowed: false, reason_code: :apply_not_allowed}} =
             Policy.check(@actor, :unknown, input)
  end

  test "invalid actors or facts fail closed" do
    input = %Input{feature_enabled: :unknown, active_application_exists: false}

    assert {:error, %Decision{allowed: false, reason_code: :apply_not_allowed}} =
             Policy.check(:anonymous, :application_create, input)

    assert {:error, %Decision{allowed: false, reason_code: :apply_not_allowed}} =
             Policy.check(@actor, :application_create, input)
  end

  test "snapshot is projected from the decision" do
    decision = %Decision{
      allowed: true,
      reason_code: nil,
      retry_at: nil,
      metadata: %{"source" => "test"}
    }

    assert Decision.snapshot(decision) == %{
             allowed: true,
             reason_code: nil,
             retry_at: nil,
             metadata: %{"source" => "test"}
           }
  end
end
