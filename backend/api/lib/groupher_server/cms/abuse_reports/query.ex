defmodule GroupherServer.CMS.AbuseReports.Query do
  @moduledoc """
  Query operations for abuse reports.

  Business position:

      GraphQL resolver / job
        -> CMS facade
        -> Query
        -> Repo / external boundary
  """

  import Ecto.Query, warn: false
  import GroupherServer.CMS.Artiment.Matcher
  import Helper.Utils, only: [done: 1]

  alias GroupherServer.{CMS, Repo}

  alias CMS.QueryBuilder
  alias CMS.Articles.Pagination
  alias CMS.Model.{AbuseReport, ArticleBinding, Comment}
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Page, Params}

  @threads CMS.Artiment.Config.threads()

  @export_author_keys [:id, :login, :nickname, :avatar]
  @export_article_keys [:id, :inner_id, :title, :digest, :article_stats]
  @export_report_keys [
    :id,
    :deal_with,
    :operate_user,
    :report_cases,
    :report_cases_count,
    :inserted_at,
    :updated_at
  ]

  @doc """
  Returns a paged list of abuse reports for one filter.

  The `content_type` filter selects the target shape: `:account`, `:comment`,
  or a content thread. Each shape preloads and projects the matching target
  info onto the report entries.

  ## Examples

      AbuseReports.Query.paged_reports(%{
        content_type: :post,
        content_id: post.id,
        page: 1,
        size: 20
      })

  """
  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: :account, content_id: content_id} = filter) do
    with {:ok, info} <- match(:account) do
      query =
        from(r in AbuseReport,
          where: field(r, ^info.foreign_key) == ^content_id,
          preload: :account
        )

      do_paged_reports(query, :account, filter)
    end
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: :account} = filter) do
    query =
      from(report in AbuseReport,
        where: not is_nil(report.account_id),
        preload: [account: [], operate_user: []]
      )

    do_paged_reports(query, :account, filter)
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: :comment, content_id: content_id} = filter) do
    with {:ok, info} <- match(:comment) do
      query =
        from(r in AbuseReport,
          where: field(r, ^info.foreign_key) == ^content_id,
          preload: [comment: :author]
        )

      do_paged_reports(query, :comment, filter)
    end
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: :comment} = filter) do
    query =
      from(report in AbuseReport,
        where: not is_nil(report.comment_id),
        preload: [comment: :author, operate_user: []]
      )

    do_paged_reports(query, :comment, filter)
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: thread, content_id: content_id} = filter)
      when thread in @threads do
    case Ecto.UUID.cast(content_id) do
      {:ok, article_id} ->
        query =
          from(r in AbuseReport,
            where: r.article_id == ^article_id,
            preload: [:article, :operate_user]
          )

        do_paged_reports(query, thread, filter)

      :error ->
        {:ok, %{entries: [], total_count: 0, page_number: filter.page, page_size: filter.size}}
    end
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(%{content_type: thread} = filter) when thread in @threads do
    query =
      from(report in AbuseReport,
        join: article in assoc(report, :article),
        where: article.thread == ^thread,
        preload: [article: [], operate_user: []]
      )

    do_paged_reports(query, thread, filter)
  end

  @spec paged_reports(map()) :: T.domain_res(T.paged_data())
  def paged_reports(filter) do
    query = from(r in AbuseReport, preload: [:operate_user])
    do_paged_reports(query, filter)
  end

  defp do_paged_reports(query, thread, filter) do
    %{page: page, size: size} = filter

    query =
      query
      |> QueryBuilder.filter_pack(Map.drop(filter, [:content_type, :content_id]))

    with {:ok, paged} <-
           page_reports(query, page, size),
         formatted <- paged |> Page.to_legacy() |> reports_formatter(thread) do
      case formatted do
        {:error, _} = error -> error
        result -> done(result)
      end
    end
  end

  defp do_paged_reports(query, %{page: page, size: size}) do
    with {:ok, paged} <- page_reports(query, page, size) do
      paged |> Page.to_legacy() |> done()
    end
  end

  defp page_reports(query, page, size) do
    # Pagi requires an explicit stable order; reports are intentionally newest-first.
    ORM.pagi(
      query,
      %Params.Offset{page: page, size: size},
      for: AbuseReport,
      order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]}
    )
  end

  defp reports_formatter(%{entries: entries} = paged_reports, :account) do
    paged_reports
    |> Map.put(
      :entries,
      Enum.map(entries, fn report ->
        basic_report = report |> Map.take(@export_report_keys)
        basic_report |> Map.put(:account, extract_account_info(report))
      end)
    )
  end

  defp reports_formatter(%{entries: entries} = paged_reports, :comment) do
    with {:ok, context} <- comment_page_context(entries),
         {:ok, comments} <-
           Enum.reduce_while(entries, {:ok, []}, fn report, {:ok, acc} ->
             basic_report = Map.take(report, @export_report_keys)

             case extract_article_comment_info(report, context) do
               {:ok, comment} ->
                 {:cont, {:ok, [Map.put(basic_report, :comment, comment) | acc]}}

               {:error, _} = error ->
                 {:halt, error}
             end
           end) do
      Map.put(paged_reports, :entries, Enum.reverse(comments))
    end
  end

  defp reports_formatter(%{entries: entries} = paged_reports, thread)
       when thread in @threads do
    targets = article_targets(entries, thread)

    with {:ok, context} <- public_article_lites(targets),
         {:ok, articles} <-
           Enum.reduce_while(entries, {:ok, []}, fn report, {:ok, acc} ->
             basic_report = Map.take(report, @export_report_keys)

             case extract_article_info(thread, report, context) do
               {:ok, article} ->
                 {:cont, {:ok, [Map.put(basic_report, :article, article) | acc]}}

               {:error, _} = error ->
                 {:halt, error}
             end
           end) do
      Map.put(paged_reports, :entries, Enum.reverse(articles))
    end
  end

  defp extract_account_info(%AbuseReport{} = report) do
    report |> Map.get(:account) |> Map.take(@export_author_keys)
  end

  defp extract_article_info(thread, %AbuseReport{} = report, context) do
    article = report.article || Map.get(report, thread)

    with {:ok, article} <- fetch_article_lite(article, report.community_id, context),
         {:ok, article} <-
           article_with_projection_count(article, thread, Map.get(context.stats, thread, %{})) do
      {:ok, article |> Map.take(@export_article_keys) |> Map.merge(%{thread: thread})}
    end
  end

  defp extract_article_comment_info(%AbuseReport{} = report, context) do
    keys = [:id, :inner_id, :floor, :upvotes_count]
    comment = Map.get(context.comments, report.comment.id, report.comment)
    author = Map.take(comment.author, @export_author_keys)
    counts = Map.get(context.counts, {:comment, comment.id}, %{})

    comment =
      comment
      |> Map.put(:upvotes_count, Map.get(counts, :upvotes_count, 0))
      |> Map.take(keys)
      |> Map.put(:body, Map.get(context.comments, comment.id, comment) |> Map.get(:body))

    comment = Map.merge(comment, %{author: author})

    with {:ok, article} <-
           extract_article_in_comment(
             Map.get(context.comments, report.comment.id, report.comment),
             report.community_id,
             context
           ) do
      {:ok, Map.merge(comment, %{article: article})}
    end
  end

  defp extract_article_in_comment(%Comment{} = comment, community_id, context) do
    case comment_article_target(comment) do
      nil ->
        {:ok, %{thread: nil}}

      %{id: article_id, thread: thread} ->
        with {:ok, article} <- fetch_article_lite(%{id: article_id}, community_id, context),
             {:ok, article} <-
               article_with_projection_count(article, thread, Map.get(context.stats, thread, %{})) do
          {:ok, article |> Map.take(@export_article_keys) |> Map.merge(%{thread: thread})}
        end
    end
  end

  defp article_with_projection_count(%{id: id} = article, thread, stats)
       when is_map(stats) and is_binary(id) do
    projection = Map.get(stats, {thread, id})
    {:ok, Map.put(article, :article_stats, projection)}
  end

  defp article_with_projection_count(_article, _thread, _stats) do
    {:error, CMS.Articles.ErrorCat.projection_not_updated()}
  end

  defp comment_page_context(entries) do
    comments = entries |> Enum.map(& &1.comment) |> Enum.reject(&is_nil/1)
    comments = Repo.preload(comments, :body)
    comment_map = Map.new(comments, &{&1.id, &1})
    counts = if comments == [], do: %{}, else: CMS.Interactions.counts(comments)

    targets =
      Enum.flat_map(entries, fn report ->
        case Map.get(comment_map, report.comment.id, report.comment)
             |> comment_article_target() do
          nil -> []
          target -> [Map.put(target, :community_id, report.community_id)]
        end
      end)

    with {:ok, context} <- public_article_lites(targets) do
      {:ok, Map.merge(context, %{comments: comment_map, counts: counts})}
    end
  end

  defp article_targets(entries, thread) do
    entries
    |> Enum.flat_map(fn report ->
      article = report.article || Map.get(report, thread)

      case Map.get(article || %{}, :id) do
        article_id when is_binary(article_id) ->
          [%{id: article_id, thread: thread, community_id: report.community_id}]

        _article_id ->
          []
      end
    end)
  end

  defp comment_article_target(%Comment{} = comment) do
    cond do
      is_binary(comment.article_id) ->
        %{id: comment.article_id, thread: comment.thread}

      true ->
        Enum.find_value(@threads, fn thread ->
          article_id = Map.get(comment, :"#{thread}_id")

          if is_binary(article_id), do: %{id: article_id, thread: thread}
        end)
    end
  end

  defp public_article_lites([]), do: {:ok, %{lites: %{}, stats: %{}}}

  defp public_article_lites(targets) do
    targets = Enum.uniq_by(targets, &{&1.id, &1.community_id, &1.thread})
    targets_by_key = Map.new(targets, &{{&1.id, &1.community_id}, &1})
    article_ids = Enum.map(targets, & &1.id)
    community_ids = Enum.map(targets, & &1.community_id)

    rows =
      from(binding in ArticleBinding,
        join: community in assoc(binding, :community),
        where:
          binding.article_id in ^article_ids and
            binding.community_id in ^community_ids and binding.visible == true,
        select: %{
          id: binding.article_id,
          community_id: binding.community_id,
          community: community.slug,
          inner_id: binding.inner_id
        }
      )
      |> Repo.all()

    paths =
      rows
      |> Enum.flat_map(fn row ->
        case Map.get(targets_by_key, {row.id, row.community_id}) do
          %{thread: thread} -> [Map.put(row, :thread, thread)]
          nil -> []
        end
      end)

    with {:ok, lites} <- Pagination.lite_paths(paths),
         {:ok, stats} <- public_article_stats(lites) do
      {:ok, %{lites: Map.new(lites, &{{&1.id, &1.community_id}, &1}), stats: stats}}
    end
  end

  defp public_article_stats(lites) do
    lites
    |> Enum.group_by(& &1.thread)
    |> Enum.reduce_while({:ok, %{}}, fn {thread, articles}, {:ok, acc} ->
      case CMS.ArticleStats.for_public_articles(thread, articles) do
        stats when is_map(stats) -> {:cont, {:ok, Map.merge(acc, stats)}}
        {:error, _reason} -> {:cont, {:ok, acc}}
      end
    end)
  end

  defp fetch_article_lite(%{id: article_id}, community_id, %{lites: lites}) do
    case Map.get(lites, {article_id, community_id}) do
      nil -> {:error, :article_binding_not_found}
      article -> {:ok, article}
    end
  end

  defp fetch_article_lite(_article, _community_id, _lites),
    do: {:error, :article_binding_not_found}
end
