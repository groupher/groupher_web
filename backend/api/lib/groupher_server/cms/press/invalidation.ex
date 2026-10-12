defmodule GroupherServer.CMS.Press.Invalidation do
  @moduledoc """
  Delivers Press cache invalidation for a committed CMS Outbox event.

  Business position:

      CMS.Press.Effects
        -> Press.Invalidation
        -> authenticated Press HTTP endpoint
  """

  require Logger

  alias GroupherServer.{CMS, ErrorCat, Repo}

  alias CMS.Model.Community

  @doc "Notifies Press that one Community projection changed."
  @spec invalidate(Community.t() | String.t() | integer()) ::
          {:ok, :pass} | {:error, term()}
  def invalidate(%Community{slug: slug}), do: invalidate(slug)

  def invalidate(community_id) when is_integer(community_id) do
    case Repo.get(Community, community_id) do
      %Community{slug: slug} -> invalidate(slug)
      _ -> {:ok, :pass}
    end
  end

  def invalidate(slug) when is_binary(slug) do
    endpoint = System.get_env("PRESS_INTERNAL_URL")

    if is_binary(endpoint) and endpoint != "" do
      with {:ok, token} <- press_token(),
           {:ok, response} <- post_invalidation(endpoint, slug, token) do
        accept_response(response)
      else
        {:error, %ErrorCat.Error{} = reason} ->
          Logger.warning(
            "Press invalidation could not obtain a service token: #{inspect(reason)}"
          )

          {:error, :press_invalidation_auth_failed}

        {:error, reason} ->
          Logger.warning("Press invalidation failed: #{inspect(reason)}")
          {:error, :press_invalidation_request_failed}
      end
    else
      # Local environments may intentionally run without the Press service.
      {:ok, :pass}
    end
  end

  defp press_token do
    GroupherServer.ServiceAuth.client_token(
      System.get_env("PRESS_INTERNAL_RESOURCE") || "https://press.groupher.com/internal",
      ["press:cache:invalidate"]
    )
  end

  defp post_invalidation(endpoint, slug, token) do
    Req.post("#{String.trim_trailing(endpoint, "/")}/internal/invalidate",
      json: %{community: slug},
      headers: [{"authorization", "Bearer #{token}"}],
      receive_timeout: 5_000
    )
  end

  defp accept_response(%{status: status}) when status in 200..299, do: {:ok, :pass}

  defp accept_response(%{status: status}) do
    Logger.warning("Press invalidation returned HTTP #{status}")
    {:error, {:press_invalidation_http_status, status}}
  end
end
