defmodule GroupherServer.CMS.Insights.Query do
  @moduledoc """
  Owns CMS persistence and Gate scope evaluation required by Article Insights.


  Business position:

      caller -> GroupherServer.CMS.Insights.Query -> result
  """

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}
  alias CMS.Articles.ErrorCat, as: ArticleErrorCat
  alias CMS.Artiment.Matcher
  alias CMS.Gate
  alias CMS.Gate.Context.Scope.Article, as: ArticleContext
  alias CMS.Gate.Context.Scope.Doc, as: DocContext
  alias CMS.Model.Article

  @doc "Returns the CMS Article type used by the Analysis projection."
  @spec article_type(map()) :: {:ok, atom()} | {:error, term()}
  def article_type(article) do
    with {:ok, %{artiment: type}} <- Matcher.match_interaction(article),
         true <- type in CMS.Artiment.Threads.article_enums() do
      {:ok, type}
    else
      _ -> {:error, :unsupported_artiment}
    end
  end

  @doc "Authorizes an already loaded Article for Insights reads."
  @spec authorize(map(), term(), atom(), keyword()) :: {:ok, :pass} | {:error, term()}
  def authorize(article, viewer, :doc, opts) do
    authorize_with_scope(article, viewer, DocContext.insights(passport_opts(opts)))
  end

  def authorize(article, viewer, article_type, opts) do
    authorize_with_scope(
      article,
      viewer,
      ArticleContext.insights(article_type, passport_opts(opts))
    )
  end

  @doc "Resolves and authorizes a public Article path for an Insights read."
  @spec resolve(map(), term(), keyword()) :: {:ok, map()} | {:error, term()}
  def resolve(article_path, viewer, opts) do
    with {:ok, %{community: community, thread: thread, inner_id: inner_id}} <-
           CMS.ArticlePath.parse(article_path),
         {inner_id, ""} <- Integer.parse(to_string(inner_id)),
         %Ecto.Query{} = query <- insights_scope(thread, viewer, opts),
         query <-
           from([article, gate_community: community_row] in query,
             where:
               article.thread == ^thread and as(:gate_article_binding).inner_id == ^inner_id and
                 (community_row.slug == ^community or community_row.aka == ^community)
           ),
         %Article{} = article <- Repo.one(query) do
      {:ok, article}
    else
      {:error, _reason} = error -> error
      _ -> {:error, ArticleErrorCat.article_not_found("article not found")}
    end
  end

  defp insights_scope(:doc, viewer, opts) do
    scope_query(DocContext.insights(passport_opts(opts)), viewer)
  end

  defp insights_scope(thread, viewer, opts) do
    scope_query(ArticleContext.insights(thread, passport_opts(opts)), viewer)
  end

  defp scope_query(context, viewer) do
    scope_actor = if global_god?(viewer), do: :operations, else: viewer
    Gate.scope(Article, scope_actor, :read_insights, context)
  end

  defp authorize_with_scope(article, viewer, context) do
    if is_binary(article.id) do
      case Gate.access_check(viewer, :read_insights, article) do
        {:ok, _canonical} -> {:ok, :pass}
        {:error, reason} -> {:error, reason}
      end
    else
      authorize_legacy(article, viewer, context)
    end
  end

  defp authorize_legacy(article, viewer, context) do
    scope_actor = if global_god?(viewer), do: :operations, else: viewer

    case Gate.scope(article.__struct__, scope_actor, :read_insights, context) do
      %Ecto.Query{} = query ->
        if Repo.exists?(from(row in query, where: row.id == ^article.id)) do
          {:ok, :pass}
        else
          {:error, :insights_not_authorized}
        end

      {:error, _reason} = error ->
        error
    end
  end

  defp global_god?(viewer) when is_map(viewer) do
    viewer
    |> Map.get(:cur_passport)
    |> Helper.PermissionRegistry.normalize_rules()
    |> get_in(["global", "god"])
    |> Kernel.==(true)
  rescue
    _ -> false
  end

  defp global_god?(_viewer), do: false

  defp passport_opts(opts) do
    [
      passport_granted_community_slugs:
        opts
        |> Keyword.get(:passport_granted_community_slugs, [])
        |> List.wrap()
    ]
  end
end
