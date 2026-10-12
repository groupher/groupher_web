defmodule GroupherServer.Accounts.ProfileViewTracker.Identity do
  @moduledoc """
  Derives a Profile ViewTracker-only HMAC identity from trusted request evidence.

      RequestActor classification + trusted handle -> HMAC tracking identity
  """

  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.Accounts.ProfileViewTracker.ErrorCat
  alias GroupherServer.RequestActor.Classification

  @type t :: %{
          actor_type: :human | :agent | :crawler | :unknown,
          is_authenticated: boolean(),
          actor_confidence: atom(),
          classified_by: atom(),
          user_id: integer() | nil,
          viewer_tracking_key: binary() | nil
        }

  @doc "Builds a stable HMAC tracking identity from already-classified request evidence."
  @spec resolve(User.t() | nil, Classification.t(), keyword()) :: {:ok, t()} | {:error, term()}
  def resolve(viewer, %Classification{} = classification, opts) when is_list(opts) do
    user_id = if match?(%User{}, viewer), do: viewer.id, else: nil

    with {:ok, key} <- tracking_key(classification, viewer, opts) do
      {:ok,
       %{
         actor_type: classification.type,
         is_authenticated: classification.is_authenticated,
         actor_confidence: classification.confidence,
         classified_by: classification.classified_by,
         user_id: user_id,
         viewer_tracking_key: key
       }}
    end
  end

  def resolve(_viewer, _classification, _opts), do: {:error, ErrorCat.invalid_actor_type()}

  defp tracking_key(%Classification{type: type}, _viewer, _opts)
       when type in [:crawler, :unknown],
       do: {:ok, nil}

  defp tracking_key(
         %Classification{type: :human, is_authenticated: true},
         %User{id: id},
         _opts
       ) do
    {:ok, hmac("user:#{id}")}
  end

  defp tracking_key(%Classification{type: :human}, _viewer, opts) do
    case Keyword.get(opts, :anonymous_session) do
      %{id: id} when is_binary(id) and byte_size(id) > 0 -> {:ok, hmac("anonymous:#{id}")}
      _ -> {:error, ErrorCat.invalid_actor_type()}
    end
  end

  defp tracking_key(
         %Classification{type: :agent, classified_by: :agent_credential},
         _viewer,
         opts
       ) do
    with credential when is_map(credential) <- Keyword.get(opts, :service_credential),
         {:ok, id} <- credential_id(credential) do
      {:ok, hmac("agent:#{id}")}
    else
      _ -> {:error, ErrorCat.invalid_actor_type()}
    end
  end

  defp tracking_key(
         %Classification{type: :agent, classified_by: :delegation_credential},
         _viewer,
         opts
       ) do
    case Keyword.get(opts, :delegation) do
      %{service_actor: credential, user_actor: %User{id: user_id}} ->
        with {:ok, credential_id} <- credential_id(credential) do
          {:ok, hmac("delegation:#{credential_id}:#{user_id}")}
        end

      _ ->
        {:error, ErrorCat.invalid_actor_type()}
    end
  end

  defp tracking_key(%Classification{type: :agent}, _viewer, _opts), do: {:ok, nil}

  defp tracking_key(_classification, _viewer, _opts) do
    {:error, ErrorCat.invalid_actor_type()}
  end

  defp credential_id(%{subject: id}) when is_binary(id) and byte_size(id) > 0, do: {:ok, id}

  defp credential_id(%{token_id: id}) when is_binary(id) and byte_size(id) > 0, do: {:ok, id}

  defp credential_id(_credential), do: {:error, ErrorCat.invalid_actor_type()}

  defp hmac(value) do
    pepper = Application.fetch_env!(:groupher_server, :view_tracker_pepper)
    :crypto.mac(:hmac, :sha256, pepper, "profile:" <> value)
  end
end
