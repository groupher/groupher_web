defmodule GroupherServer.CMS.Articles.Pagination do
  @moduledoc """
  Owns the Article list read model and its Pagi boundary.

      GraphQL / service filter
        -> Articles.Pagination
        -> scope + Lite projection + Pagi.Order
        -> one bounded SQL page + distinct binding count
        -> Articles.Response batch presentation

  The query returns binding identity and cursor fields in the same row as the
  Article projection. Pinned entries are a separate first-page collection;
  they are never folded into the live cursor sequence.
  """

  require GroupherServer.CMS.Const

  import Ecto.Query, warn: false

  alias GroupherServer.{Accounts, CMS, Pagi, Repo}
  alias GroupherServer.CMS.Articles.ArticleLite
  alias GroupherServer.CMS.Communities.Enable
  alias CMS.Dashboard.Pagination, as: DashboardPagination
  alias CMS.ErrorCat

  alias CMS.Model.{
    Article,
    ArticleAssetRef,
    ArticleBinding,
    ArticleBindingTag,
    ArticleBodySnapshot,
    ArticleLifecycle,
    Author,
    ArticlePublic,
    ArticleRevision,
    Community,
    CommunityTag,
    DocBranch,
    DocBranchVersion,
    DocBranchState,
    DocTreeNode,
    DocLifecycle,
    DocPublic,
    KanbanState,
    PinnedArticle,
    PostState
  }

  alias Accounts.Model.User

  alias Helper.ORM
  alias Helper.ORM.Pagi.{Config, Order, Page, Params}

  @type filter :: %{optional(atom()) => term()}

  @doc """
  Runs the public Article list through the shared offset/cursor contract.

  The returned page contains only live, non-pinned entries. The optional
  `:pinned_entries` key is added by this resource adapter for the first offset
  page, so a caller can render pinned content without changing cursor identity.

  ## Examples

      GroupherServer.CMS.Articles.Pagination.page(:post, %{
        community: "groupher",
        page: 1,
        size: 20
      })

  """
  @spec page(atom(), filter(), Accounts.Model.User.t() | nil, keyword()) ::
          {:ok, map()} | {:error, term()}
  def page(thread, filter, viewer \\ nil, opts \\ [])

  def page(thread, filter, viewer, opts)
      when is_atom(thread) and is_map(filter) and is_list(opts) do
    with {:ok, effective} <- effective_pagination_config(thread, filter, opts),
         opts <- put_effective_config(opts, effective),
         filter <- attach_legacy_default_revision(filter, effective.config, opts),
         {:ok, _thread} <- Enable.thread?(Map.get(filter, :community), thread),
         {:ok, order} <- order_for(thread, filter),
         {:ok, params} <- params_for(filter, opts),
         {:ok, page} <- run_page(thread, filter, params, order, opts),
         {:ok, entries} <- present_entries(page.entries, viewer),
         {:ok, pinned_entries} <-
           present_pinned(thread, filter, viewer, params, order, opts) do
      {:ok,
       %{
         entries: entries,
         pinned_entries: pinned_entries,
         page_info: page_info(page)
       }}
    end
  end

  def page(_thread, _filter, _viewer, _opts),
    do: {:error, ErrorCat.invalid_body("Invalid Article pagination input")}

  defp effective_pagination_config(thread, filter, opts) do
    case Keyword.fetch(opts, :config) do
      {:ok, %Config{} = config} ->
        {:ok, %{config: config, mode: nil, schema_version: nil}}

      {:ok, _config} ->
        {:error, Pagi.invalid_config()}

      :error ->
        surface = if thread == :changelog, do: :changelogs, else: :posts

        DashboardPagination.for_community(Map.get(filter, :community), surface,
          expected_revision: requested_revision(filter, opts)
        )
    end
  end

  defp put_effective_config(opts, effective) do
    opts
    |> Keyword.put(:config, effective.config)
    |> Keyword.put(:mode, effective.mode)
    |> Keyword.put(:schema_version, effective.schema_version)
    |> Keyword.put(:resource, :articles)
  end

  defp requested_revision(filter, opts) do
    case Keyword.get(opts, :pagi_input) do
      {_api, input} when is_map(input) -> Map.get(input, :config_revision)
      _ -> Map.get(filter, :config_revision)
    end
  end

  defp attach_legacy_default_revision(filter, %Config{revision: revision}, opts) do
    if Keyword.has_key?(opts, :pagi_input) do
      filter
    else
      attach_default_revision(filter, revision)
    end
  end

  defp attach_default_revision(filter, revision) do
    if Enum.any?([:page, :size, :first, :after], &Map.has_key?(filter, &1)) and
         not Map.has_key?(filter, :config_revision) do
      Map.put(filter, :config_revision, revision)
    else
      filter
    end
  end

  @doc """
  Reads a bounded set of public ArticleLite rows by explicit Article paths.

  This is the batch side of the list contract for consumers such as published
  comment lists. It returns one row per requested binding path and never reads
  a public Article one item at a time.

  ## Examples

      GroupherServer.CMS.Articles.Pagination.lite_paths([
        %{community: "groupher", thread: :post, inner_id: 1}
      ])
  """
  @spec lite_paths([map()]) :: {:ok, [map()]} | {:error, term()}
  def lite_paths(paths) when is_list(paths) and length(paths) <= 100 do
    case Enum.uniq_by(paths, &{&1.community, &1.thread, &1.inner_id}) do
      [] ->
        {:ok, []}

      paths ->
        rows =
          paths
          |> lite_path_query()
          |> Repo.all()

        {:ok, rows}
    end
  end

  def lite_paths(_paths),
    do: {:error, ErrorCat.invalid_body("Too many ArticleLite paths")}

  @doc """
  Hydrates the legacy Article list response from one bounded page batch.

  The content, asset references, and operational state are loaded by page-level
  queries and merged by article/binding identity. This keeps the compatibility
  response shape without restoring per-entry `FrontDesk.article/1` reads.

  ## Examples

      {:ok, entries} = GroupherServer.CMS.Articles.Pagination.legacy_entries(page_rows)
      is_list(entries)
  """
  @spec legacy_entries([map()], keyword()) :: {:ok, [map()]} | {:error, term()}
  def legacy_entries(rows, opts \\ [])

  def legacy_entries([], _opts), do: {:ok, []}

  def legacy_entries(rows, opts) when is_list(rows) and is_list(opts) do
    with {:ok, content_by_key} <- legacy_content(rows) do
      refs_by_revision = legacy_asset_refs(content_by_key)
      operational_by_key = legacy_operational_state(rows)
      public_by_key = legacy_public_projection(rows, opts)

      rows
      |> Enum.map(fn row ->
        article = row.resource
        key = {article.id, row.community.id}
        {body, revision_id} = Map.fetch!(content_by_key, legacy_content_key(article, key))
        asset_refs = Map.get(refs_by_revision, revision_id, [])
        public = Map.get(public_by_key, legacy_content_key(article, key), %{})

        article
        |> Map.from_struct()
        |> Map.merge(%{
          author: row.author,
          body: body,
          asset_refs: asset_refs,
          community: row.community,
          communities: [row.community],
          community_tags: row.community_tags,
          inner_id: row.inner_id,
          is_pinned: Map.get(article, :is_pinned, false),
          lifecycle: nil,
          pending: Map.get(article, :pending, 0)
        })
        |> Map.merge(public)
        |> Map.merge(Map.get(operational_by_key, key, %{}))
      end)
      |> then(&{:ok, &1})
    end
  end

  def legacy_entries(_rows, _opts),
    do: {:error, ErrorCat.invalid_body("Invalid legacy Article page rows")}

  defp legacy_public_projection(rows, opts) do
    if Keyword.get(opts, :include_public_projection, false) do
      community_ids = Enum.map(rows, & &1.community.id) |> Enum.uniq()

      ordinary_ids =
        Enum.filter(rows, &(&1.resource.thread != :doc)) |> Enum.map(& &1.resource.id)

      doc_ids = Enum.filter(rows, &(&1.resource.thread == :doc)) |> Enum.map(& &1.resource.id)

      ordinary_public =
        if ordinary_ids == [] do
          []
        else
          from(public in ArticlePublic,
            where: public.article_id in ^ordinary_ids and public.visible == true,
            select: {
              public.article_id,
              public.published_at,
              public.updated_at,
              public.slug,
              public.body_hash,
              public.active_at,
              public.title,
              public.digest,
              public.publication_version
            }
          )
          |> Repo.all()
        end

      doc_public =
        if doc_ids == [] do
          []
        else
          from(public in DocPublic,
            join: branch in DocBranch,
            on: branch.id == public.branch_id and branch.type == :main,
            where:
              public.article_id in ^doc_ids and branch.community_id in ^community_ids and
                public.visible == true,
            select: {
              public.article_id,
              branch.community_id,
              public.published_at,
              public.updated_at,
              public.slug,
              public.body_hash,
              public.active_at,
              public.title,
              public.digest,
              public.subtitle,
              public.publication_version
            }
          )
          |> Repo.all()
        end

      ordinary_by_id =
        Map.new(ordinary_public, fn {
                                      article_id,
                                      published_at,
                                      updated_at,
                                      slug,
                                      body_hash,
                                      active_at,
                                      title,
                                      digest,
                                      publication_version
                                    } ->
          {article_id,
           %{
             published_at: published_at,
             updated_at: updated_at,
             slug: slug,
             body_hash: body_hash,
             active_at: active_at,
             title: title,
             digest: digest,
             publication_version: publication_version
           }}
        end)

      doc_by_key =
        Map.new(doc_public, fn {
                                 article_id,
                                 community_id,
                                 published_at,
                                 updated_at,
                                 slug,
                                 body_hash,
                                 active_at,
                                 title,
                                 digest,
                                 subtitle,
                                 publication_version
                               } ->
          {{article_id, community_id},
           %{
             published_at: published_at,
             updated_at: updated_at,
             slug: slug,
             body_hash: body_hash,
             active_at: active_at,
             title: title,
             digest: digest,
             subtitle: subtitle,
             publication_version: publication_version
           }}
        end)

      Map.new(rows, fn row ->
        article = row.resource
        key = {article.id, row.community.id}

        projection =
          if article.thread == :doc do
            Map.get(doc_by_key, key, %{})
          else
            Map.get(ordinary_by_id, article.id, %{})
          end

        {legacy_content_key(article, key), projection}
      end)
    else
      %{}
    end
  end

  defp legacy_content(rows) do
    community_ids = Enum.map(rows, & &1.community.id) |> Enum.uniq()
    ordinary_ids = Enum.filter(rows, &(&1.resource.thread != :doc)) |> Enum.map(& &1.resource.id)
    doc_ids = Enum.filter(rows, &(&1.resource.thread == :doc)) |> Enum.map(& &1.resource.id)

    ordinary_content =
      if ordinary_ids == [] do
        []
      else
        from(public in ArticlePublic,
          join: revision in ArticleRevision,
          on: revision.id == public.revision_id,
          join: body in ArticleBodySnapshot,
          on: body.id == revision.body_snapshot_id,
          where: public.article_id in ^ordinary_ids and public.visible == true,
          select: {public.article_id, revision.id, body}
        )
        |> Repo.all()
      end

    doc_content =
      if doc_ids == [] do
        []
      else
        from(public in DocPublic,
          join: branch in DocBranch,
          on: branch.id == public.branch_id and branch.type == :main,
          join: version in DocBranchVersion,
          on: version.id == public.branch_version_id,
          join: revision in ArticleRevision,
          on: revision.id == version.revision_id,
          join: body in ArticleBodySnapshot,
          on: body.id == revision.body_snapshot_id,
          where:
            public.article_id in ^doc_ids and branch.community_id in ^community_ids and
              public.visible == true,
          select: {public.article_id, branch.community_id, revision.id, body}
        )
        |> Repo.all()
      end

    ordinary_by_id =
      Map.new(ordinary_content, fn {article_id, revision_id, body} ->
        {article_id, {body, revision_id}}
      end)

    doc_by_key =
      Map.new(doc_content, fn {article_id, community_id, revision_id, body} ->
        {{article_id, community_id}, {body, revision_id}}
      end)

    content_by_key =
      Map.new(rows, fn row ->
        article = row.resource
        key = {article.id, row.community.id}
        content = legacy_content_for(article, key, ordinary_by_id, doc_by_key)
        {legacy_content_key(article, key), content}
      end)

    if Enum.all?(Map.values(content_by_key), &match?({%ArticleBodySnapshot{}, _revision_id}, &1)) do
      {:ok, content_by_key}
    else
      {:error, ErrorCat.invalid_body("Article body projection is missing")}
    end
  end

  defp legacy_content_for(%{thread: :doc}, key, _ordinary_by_id, doc_by_key),
    do: Map.get(doc_by_key, key)

  defp legacy_content_for(%{id: article_id}, _key, ordinary_by_id, _doc_by_key),
    do: Map.get(ordinary_by_id, article_id)

  defp legacy_content_key(%{thread: :doc}, key), do: key
  defp legacy_content_key(_article, {article_id, _community_id}), do: article_id

  defp legacy_asset_refs(content_by_key) do
    revision_ids =
      content_by_key
      |> Map.values()
      |> Enum.map(&elem(&1, 1))
      |> Enum.uniq()

    if revision_ids == [] do
      %{}
    else
      ArticleAssetRef
      |> where([ref], ref.revision_id in ^revision_ids)
      |> order_by([ref], asc: ref.position, asc: ref.inserted_at, asc: ref.id)
      |> Repo.all()
      |> Enum.group_by(& &1.revision_id)
    end
  end

  defp legacy_operational_state(rows) do
    article_ids = Enum.map(rows, & &1.resource.id) |> Enum.uniq()
    community_ids = Enum.map(rows, & &1.community.id) |> Enum.uniq()

    post_state =
      from(state in PostState,
        where: state.article_id in ^article_ids,
        select: {state.article_id, state.cat}
      )
      |> Repo.all()
      |> Map.new(fn {article_id, cat} -> {article_id, %{cat: cat}} end)

    kanban_state =
      from(binding in ArticleBinding,
        join: state in KanbanState,
        on: state.article_binding_id == binding.id,
        where: binding.article_id in ^article_ids and binding.community_id in ^community_ids,
        select: {binding.article_id, binding.community_id, state.status}
      )
      |> Repo.all()
      |> Map.new(fn {article_id, community_id, status} ->
        {{article_id, community_id}, %{status: status}}
      end)

    Map.new(rows, fn row ->
      key = {row.resource.id, row.community.id}
      {key, Map.merge(Map.get(post_state, row.resource.id, %{}), Map.get(kanban_state, key, %{}))}
    end)
  end

  defp run_page(thread, filter, %Params.Offset{} = params, order, opts) do
    config = Keyword.get(opts, :config, Config.default())

    query_opts = [
      include_pinned: false,
      public_tree: Keyword.get(opts, :public_tree, false)
    ]

    query = public_query(thread, filter, order, query_opts)
    count_query = count_query(thread, filter, query_opts)

    pagi_opts = [
      for: ArticleLite,
      order: order,
      cursor_value_func: &ArticleLite.cursor_values/2,
      surface: "articles.#{thread}",
      query_fingerprint: query_fingerprint(thread, filter, order, query_opts),
      count_query: fn -> count_query end,
      count_query_mode: :scalar
    ]

    ORM.pagi(
      query,
      params,
      maybe_put_config(pagi_opts, opts, config)
    )
  end

  defp run_page(thread, filter, %Params.Cursor{} = params, order, opts) do
    config = Keyword.get(opts, :config, Config.default())

    query_opts = [
      include_pinned: false,
      public_tree: Keyword.get(opts, :public_tree, false)
    ]

    ORM.pagi(
      public_query(thread, filter, order, query_opts),
      params,
      maybe_put_config(
        [
          for: ArticleLite,
          order: order,
          cursor_value_func: &ArticleLite.cursor_values/2,
          surface: "articles.#{thread}",
          query_fingerprint: query_fingerprint(thread, filter, order, query_opts)
        ],
        opts,
        config
      )
    )
  end

  defp maybe_put_config(pagi_opts, opts, config) do
    if Keyword.has_key?(opts, :config),
      do: Keyword.put(pagi_opts, :config, config),
      else: pagi_opts
  end

  defp params_for(filter, opts) when is_map(filter) do
    config = Keyword.get(opts, :config, Config.default())

    case Keyword.fetch(opts, :pagi_input) do
      {:ok, {:offset, pagination}} -> offset_params(pagination, config)
      {:ok, {:cursor, pagination}} -> cursor_params(pagination, config)
      {:ok, _invalid} -> {:error, ErrorCat.invalid_body("Invalid Article pagination input")}
      :error -> legacy_params(filter, config)
    end
  end

  defp legacy_params(filter, config) do
    pagination = Map.take(filter, [:page, :size, :first, :after, :config_revision])

    cond do
      pagination == %{} ->
        {:ok, nil}

      Map.has_key?(pagination, :first) or Map.has_key?(pagination, :after) ->
        if Map.has_key?(pagination, :page) or Map.has_key?(pagination, :size) do
          {:error, ErrorCat.invalid_body("Invalid Article pagination input")}
        else
          cursor_params(pagination, config)
        end

      true ->
        offset_params(pagination, config)
    end
  end

  defp offset_params(pagination, config) do
    {:ok,
     %Params.Offset{
       page: Map.get(pagination, :page, 1),
       size: Map.get(pagination, :size, config.default_size),
       config_revision: Map.get(pagination, :config_revision)
     }}
  end

  defp cursor_params(pagination, config) do
    {:ok,
     %Params.Cursor{
       first: Map.get(pagination, :first, config.default_size),
       after: Map.get(pagination, :after),
       config_revision: Map.get(pagination, :config_revision)
     }}
  end

  defp order_for(thread, filter) do
    {fields, directions, bindings} =
      case Map.get(filter, :order, Map.get(filter, :sort)) do
        :publish ->
          {[:published_at, :binding_id], [:desc_nulls_last, :desc], []}

        :upvotes ->
          stats_order(:upvotes_count, :desc_nulls_last)

        :comments ->
          stats_order(:comments_count, :desc_nulls_last)

        :views ->
          stats_order(:views, :desc_nulls_last)

        :most_views ->
          stats_order(:views, :desc_nulls_last)

        :least_views ->
          stats_order(:views, :asc_nulls_first)

        :asc_inserted ->
          simple_order(:inserted_at, :asc)

        :desc_inserted ->
          simple_order(:inserted_at, :desc)

        :asc_active ->
          simple_order(active_field(thread), :asc)

        :desc_active ->
          simple_order(active_field(thread), :desc)

        _ ->
          simple_order(active_field(thread), :desc)
      end

    Order.new(%{
      fields: fields,
      directions: directions,
      cursor_fields: fields,
      bindings: bindings,
      projection: fields
    })
  end

  defp simple_order(field, direction),
    do: {[field, :binding_id], [direction, direction], []}

  defp stats_order(field, direction),
    do: {[field, :binding_id], [direction, :desc], [:article_stats]}

  defp active_field(:doc), do: :doc_active_at
  defp active_field(_thread), do: :active_at

  defp public_query(thread, filter, order, opts) do
    thread
    |> public_scope(filter, opts)
    |> ArticleLite.select(order, thread)
  end

  defp public_scope(thread, filter, opts) do
    include_pinned = Keyword.get(opts, :include_pinned, false)

    from(article in Article,
      as: :article,
      join: binding in ArticleBinding,
      as: :article_binding,
      on: binding.article_id == article.id and binding.visible == true,
      join: community in Community,
      as: :article_community,
      on: community.id == binding.community_id,
      where:
        article.thread == ^thread and article.moderation_state == :legal and
          binding.inner_id > 0
    )
    |> add_public_joins(thread)
    |> maybe_add_public_tree(thread, opts)
    |> apply_filter(filter)
    |> maybe_exclude_pinned(include_pinned)
  end

  defp add_public_joins(query, :doc) do
    query
    |> join(:inner, [article_binding: binding], branch in DocBranch,
      as: :doc_branch,
      on: branch.community_id == binding.community_id and branch.type == :main
    )
    |> join(:inner, [article: article, doc_branch: branch], state in DocBranchState,
      as: :stable_doc_state,
      on: state.article_id == article.id and state.branch_id == branch.id
    )
    |> join(:inner, [article: article, doc_branch: branch], public in DocPublic,
      as: :stable_public,
      on:
        public.article_id == article.id and public.branch_id == branch.id and
          public.visible == true
    )
    |> join(
      :inner,
      [article: article, doc_branch: branch],
      lifecycle in DocLifecycle,
      as: :doc_lifecycle,
      on:
        lifecycle.article_id == article.id and lifecycle.branch_id == branch.id and
          lifecycle.state in [:published, :archived]
    )
  end

  defp add_public_joins(query, _thread) do
    query
    |> join(:inner, [article: article], public in ArticlePublic,
      as: :stable_public,
      on: public.article_id == article.id and public.visible == true
    )
    |> join(
      :inner,
      [article: article],
      lifecycle in ArticleLifecycle,
      as: :article_lifecycle,
      on: lifecycle.article_id == article.id and lifecycle.state in [:published, :archived]
    )
  end

  defp maybe_add_public_tree(query, :doc, opts) do
    if Keyword.get(opts, :public_tree, false) do
      where(
        query,
        exists(
          from(node in DocTreeNode,
            where:
              node.community_id == parent_as(:article_community).id and
                node.branch_id == parent_as(:doc_branch).id and
                node.stage == ^CMS.Const.stage(:public) and node.type == :page and
                node.doc_id == parent_as(:article).id
          )
        )
      )
    else
      query
    end
  end

  defp maybe_add_public_tree(query, _thread, _opts), do: query

  defp apply_filter(query, filter) do
    Enum.reduce(filter, query, fn
      {:community, community_ref}, query when is_binary(community_ref) and community_ref != "" ->
        where(query, [article_community: community], community.slug == ^community_ref)

      {:community_tag, tag}, query when is_binary(tag) and tag != "" ->
        tag_filter(query, [tag])

      {:community_tags, tags}, query when is_list(tags) and tags != [] ->
        tag_filter(query, tags)

      {:when, window}, query when window in [:today, :this_week, :this_month, :this_year] ->
        Helper.QueryBuilder.filter_pack(query, %{when: window})

      {:cat, cat}, query when is_atom(cat) and not is_nil(cat) ->
        query
        |> join(:inner, [article: article], state in PostState,
          as: :post_state,
          on: state.article_id == article.id
        )
        |> where([post_state: state], state.cat == ^cat)

      {:status, status_value}, query when is_atom(status_value) and not is_nil(status_value) ->
        query
        |> join(:inner, [article_binding: binding], state in KanbanState,
          as: :kanban_state,
          on: state.article_binding_id == binding.id
        )
        |> where([kanban_state: state], state.status == ^status_value)

      {_key, _value}, query ->
        query
    end)
  end

  defp tag_filter(query, tags) do
    query
    |> join(:inner, [article_binding: binding], assignment in ArticleBindingTag,
      as: :article_binding_tag,
      on: assignment.article_binding_id == binding.id
    )
    |> join(:inner, [article_binding_tag: assignment], tag in CommunityTag,
      as: :community_tag,
      on: tag.id == assignment.tag_id and tag.slug in ^tags
    )
    |> distinct([article_binding: binding], binding.id)
  end

  defp maybe_exclude_pinned(query, true), do: query

  defp maybe_exclude_pinned(query, false) do
    where(
      query,
      [article_binding: binding],
      not exists(
        from(pin in PinnedArticle,
          where: pin.article_binding_id == parent_as(:article_binding).id
        )
      )
    )
  end

  defp count_query(thread, filter, opts) do
    public_scope(thread, filter, opts)
    |> exclude(:distinct)
    |> select([article_binding: binding], count(binding.id, :distinct))
  end

  defp present_entries(entries, viewer) do
    entries
    |> present_lite_entries()
    |> then(fn entries -> maybe_attach_viewer(entries, viewer) end)
  end

  defp present_pinned(_thread, %{page: page}, _viewer, _params, _order, _opts) when page != 1,
    do: {:ok, []}

  defp present_pinned(thread, filter, viewer, %Params.Offset{}, order, opts) do
    load_pinned(thread, filter, viewer, order, opts)
  end

  defp present_pinned(thread, filter, viewer, %Params.Cursor{after: nil}, order, opts) do
    load_pinned(thread, filter, viewer, order, opts)
  end

  defp present_pinned(_thread, _filter, _viewer, %Params.Cursor{}, _order, _opts), do: {:ok, []}

  defp load_pinned(thread, filter, viewer, order, opts) do
    content_order = %{order | bindings: [], projection: []}

    pinned_query =
      public_query(thread, filter, content_order,
        include_pinned: true,
        public_tree: Keyword.get(opts, :public_tree, false)
      )

    pinned_query
    |> where(
      [article_binding: binding],
      exists(
        from(pin in PinnedArticle,
          where: pin.article_binding_id == parent_as(:article_binding).id
        )
      )
    )
    |> order_by([article_binding: binding], asc: binding.id)
    |> Repo.all()
    |> Enum.map(&Map.put(&1, :is_pinned, true))
    |> present_lite_entries()
    |> then(fn entries -> maybe_attach_viewer(entries, viewer) end)
  end

  defp present_lite_entries([]), do: []

  defp present_lite_entries(rows) do
    Enum.map(rows, fn row ->
      %{
        id: row.article.id,
        thread: row.article.thread,
        resource:
          row.article
          |> Map.put(:community, row.community)
          |> Map.put(:inner_id, row.inner_id)
          |> Map.put(:title, row.title)
          |> Map.put(:digest, row.digest)
          |> Map.put(:active_at, row.active_at)
          |> Map.put(:published_at, row.published_at)
          |> Map.put(:meta, %{thread: row.article.thread})
          |> Map.put(:is_pinned, Map.get(row, :is_pinned, false))
          |> Map.put(:pending, 0),
        inner_id: row.inner_id,
        title: row.title,
        digest: row.digest,
        author: row.author,
        community: row.community,
        community_tags: ArticleLite.community_tags(row.community_tags, row.community),
        active_at: row.active_at,
        inserted_at: row.article.inserted_at
      }
    end)
  end

  defp maybe_attach_viewer(entries, _viewer), do: {:ok, entries}

  defp page_info(%Page.Offset{} = page) do
    %{
      api: :offset,
      page: page.page,
      size: page.size,
      total_count: page.total_count,
      total_pages: page.total_pages,
      has_previous_page: page.has_previous_page,
      has_next_page: page.has_next_page
    }
  end

  defp page_info(%Page.Cursor{} = page) do
    %{
      api: :cursor,
      start_cursor: page.start_cursor,
      end_cursor: page.end_cursor,
      has_previous_page: page.has_previous_page,
      has_next_page: page.has_next_page
    }
  end

  defp query_fingerprint(thread, filter, order, opts) do
    query_filter = Map.drop(filter, [:page, :size, :first, :after, :config_revision])

    :crypto.hash(
      :sha256,
      :erlang.term_to_binary(
        {thread, query_filter, Order.identity(order), Keyword.get(opts, :public_tree, false)}
      )
    )
    |> Base.encode16(case: :lower)
  end

  defp lite_path_query(paths) do
    path_filter =
      Enum.reduce(paths, dynamic(false), fn path, acc ->
        dynamic(
          [lite_article: article, lite_binding: binding, lite_community: community],
          ^acc or
            (community.slug == ^path.community and article.thread == ^path.thread and
               binding.inner_id == ^path.inner_id)
        )
      end)

    from(article in Article,
      as: :lite_article,
      join: binding in ArticleBinding,
      as: :lite_binding,
      on:
        binding.article_id == article.id and binding.visible == true and
          binding.inner_id > 0,
      join: community in Community,
      as: :lite_community,
      on: community.id == binding.community_id,
      join: author in Author,
      on: author.id == article.author_id,
      join: user in User,
      on: user.id == author.user_id,
      left_join: public in ArticlePublic,
      on: public.article_id == article.id and public.visible == true,
      left_join: lifecycle in ArticleLifecycle,
      on:
        lifecycle.article_id == article.id and
          lifecycle.state in [:published, :archived],
      left_join: branch in DocBranch,
      on: branch.community_id == binding.community_id and branch.type == :main,
      left_join: doc_state in DocBranchState,
      on: doc_state.article_id == article.id and doc_state.branch_id == branch.id,
      left_join: doc_public in DocPublic,
      on:
        doc_public.article_id == article.id and doc_public.branch_id == branch.id and
          doc_public.visible == true,
      left_join: doc_lifecycle in DocLifecycle,
      on:
        doc_lifecycle.article_id == article.id and doc_lifecycle.branch_id == branch.id and
          doc_lifecycle.state in [:published, :archived],
      where: ^path_filter,
      where:
        (article.thread == :doc and doc_state.moderation_state == :legal and
           not is_nil(doc_public.id) and not is_nil(doc_lifecycle.id)) or
          (article.thread != :doc and article.moderation_state == :legal and
             not is_nil(public.article_id) and not is_nil(lifecycle.id)),
      select: %{
        id: article.id,
        community_id: community.id,
        binding_id: binding.id,
        thread: article.thread,
        inner_id: binding.inner_id,
        title: fragment("COALESCE(?, ?)", public.title, doc_public.title),
        digest: fragment("COALESCE(?, ?)", public.digest, doc_public.digest),
        active_at: fragment("COALESCE(?, ?)", public.active_at, doc_public.active_at),
        published_at: fragment("COALESCE(?, ?)", public.published_at, doc_public.published_at),
        inserted_at: article.inserted_at,
        updated_at: article.updated_at,
        author: user,
        community: community
      }
    )
  end
end
