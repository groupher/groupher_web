defmodule GroupherServer.CMS.CommunityApplications.Policy.Input do
  @moduledoc """
  Typed facts supplied to the pure CommunityApplications Policy.

      Admission config/query -> Policy.Input -> pure Policy decision
  """

  @enforce_keys [:feature_enabled, :active_application_exists]
  defstruct [:feature_enabled, :active_application_exists]

  @type t :: %__MODULE__{
          feature_enabled: boolean(),
          active_application_exists: boolean()
        }
end
