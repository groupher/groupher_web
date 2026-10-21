defmodule GroupherServer.CMS.CommunityApplications.Config do
  @moduledoc """
  Runtime policy values for the V1 application flow.

  Business position:

      Apply UI / reviewer
        -> GraphQL resolver
        -> CMS.CommunityApplications
        -> Config
        -> Repo / Oban
  """

  @doc """
  Returns the TTL in days before a submitted Application expires.

  ## Examples

      Config.submitted_ttl_days()
      #=> 30
  """
  @spec submitted_ttl_days() :: pos_integer()
  def submitted_ttl_days do
    :groupher_server
    |> Application.get_env(__MODULE__, [])
    |> Keyword.get(:submitted_ttl_days, 30)
  end

  @doc """
  Returns the TTL in seconds for a pending logo upload.

  ## Examples

      Config.logo_upload_ttl_seconds()
      #=> 900
  """
  @spec logo_upload_ttl_seconds() :: pos_integer()
  def logo_upload_ttl_seconds do
    :groupher_server
    |> Application.get_env(__MODULE__, [])
    |> Keyword.get(:logo_upload_ttl_seconds, 15 * 60)
  end

  defmodule Admission do
    @moduledoc """
    Typed configuration consumed by `CommunityApplications.Admission`.

        Application env -> Config.Admission -> Admission -> Policy.Input
    """

    @enforce_keys [:enabled]
    defstruct [:enabled]

    @type t :: %__MODULE__{enabled: boolean()}
  end

  @doc """
  Returns the typed configuration used by application admission.

  ## Examples

      Config.application_admission()
      #=> {:ok, %Config.Admission{enabled: true}}
  """
  @spec application_admission() :: {:ok, Admission.t()} | {:error, term()}
  def application_admission do
    config = Application.get_env(:groupher_server, __MODULE__, [])

    if is_list(config) do
      case Keyword.fetch(config, :enabled) do
        {:ok, enabled} when is_boolean(enabled) -> {:ok, %Admission{enabled: enabled}}
        {:ok, _invalid} -> {:error, :invalid_application_admission_config}
        :error -> {:ok, %Admission{enabled: true}}
      end
    else
      {:error, :invalid_application_admission_config}
    end
  end
end
