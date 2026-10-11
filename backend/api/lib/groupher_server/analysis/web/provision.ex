defmodule GroupherServer.Analysis.Web.Provision do
  @moduledoc """
  Owns the persisted community analytics identity and provider provisioning.

  Query/report code may ask this module for a canonical analysis scope, but
  database locks and dashboard writes stay here rather than in `Analysis.Web`.
  The provider call runs outside the database transaction; only the final CMS
  dashboard row update is serialized and persisted under the lock.

      Community
          -> dashboard projection
          -> provider adapter (outside DB transaction)
          -> CMS Dashboard.Persist
          -> Analysis.Web scope
  """

  alias GroupherServer.{Analysis, CMS}

  alias CMS.Model.{Community, CommunityDashboard}
  alias Analysis.Web.Community, as: AnalysisCommunity
  alias Analysis.Web.Config
  alias Helper.Transaction

  @doc """
  Resolves a canonical provider scope, creating the persisted website identity when needed.

  ## Examples

      Analysis.Web.Provision.prepare_community(community, provider)
  """
  @spec prepare_community(Community.t(), module()) :: {:ok, struct()} | {:error, term()}
  def prepare_community(%Community{} = community, provider) do
    with {:ok, :pass} <- ensure_runtime_configured(),
         {:ok, :pass} <- ensure_persisted_community(community),
         {:ok, dashboard} <- dashboard_for(community),
         {:ok, website_id} <- ensure_umami_website_id(community, dashboard, provider) do
      {:ok, AnalysisCommunity.from_community(community, website_id)}
    end
  end

  @doc """
  Returns or initializes the local dashboard row for a community.

  ## Examples

      Analysis.Web.Provision.dashboard_for(community)
  """
  @spec dashboard_for(Community.t()) :: {:ok, CommunityDashboard.t()} | {:error, term()}
  def dashboard_for(%Community{} = community) do
    Transaction.lock_global("community_dashboard:ensure:#{community.id}", fn ->
      GroupherServer.CMS.dashboard_persist_get_or_insert_dashboard(community)
    end)
  end

  defp ensure_runtime_configured do
    case Config.runtime().api_token do
      token when is_binary(token) and token != "" -> {:ok, :pass}
      _ -> {:error, GroupherServer.CMS.error_cat_not_configured()}
    end
  end

  defp ensure_persisted_community(%Community{id: id}) when is_integer(id), do: {:ok, :pass}

  defp ensure_persisted_community(%Community{}),
    do: {:error, GroupherServer.CMS.error_cat_community_not_persisted()}

  defp ensure_umami_website_id(
         %Community{} = community,
         %CommunityDashboard{umami_website_id: nil},
         provider
       ) do
    with {:ok, website_id} <- provider.create_website(AnalysisCommunity.from_community(community)),
         {:ok, persisted_website_id} <- persist_website_id(community, website_id) do
      {:ok, persisted_website_id}
    end
  end

  defp ensure_umami_website_id(
         _community,
         %CommunityDashboard{umami_website_id: website_id},
         _provider
       )
       when is_binary(website_id),
       do: {:ok, website_id}

  defp persist_website_id(%Community{} = community, website_id) do
    Transaction.lock_global("community_dashboard:umami_website:#{community.id}", fn ->
      with {:ok, dashboard} <- GroupherServer.CMS.dashboard_persist_get_dashboard(community) do
        case dashboard.umami_website_id do
          existing_website_id when is_binary(existing_website_id) ->
            {:ok, existing_website_id}

          nil ->
            with {:ok, _dashboard} <-
                   GroupherServer.CMS.dashboard_persist_update_website_id(dashboard, website_id) do
              {:ok, website_id}
            end
        end
      else
        {:error, _reason} -> {:error, GroupherServer.CMS.error_cat_dashboard_not_found()}
      end
    end)
  end
end
