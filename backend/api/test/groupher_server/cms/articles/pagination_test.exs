defmodule GroupherServer.CMS.Articles.PaginationTest do
  @moduledoc """
  Verifies the Articles reference pagination adapter against published fixtures.

      Article fixture -> Lite page -> offset/cursor contract
  """

  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.CMS.Articles.Pagination
  alias GroupherServer.CMS
  alias GroupherServer.CMS.Model.ArticleStats
  alias GroupherServer.ErrorCat
  alias Helper.ORM.Pagi.Config

  test "offset returns Article Lite rows and a distinct binding count" do
    {community, article, _attrs, _user} = mock_article(:post)

    assert {:ok,
            %{
              entries: [entry],
              pinned_entries: [],
              page_info: %{api: :offset, page: 1, total_count: 1}
            }} =
             Pagination.page(
               :post,
               %{
                 community: community.slug,
                 page: 1,
                 size: 20,
                 config_revision: 0
               }
             )

    assert entry.id == article.id
    assert entry.inner_id == 1
    assert entry.community.id == community.id
    assert entry.author.id == article.author.id
  end

  test "Article Lite loads author and ordered tags in the page query" do
    {community, article, _attrs, user} = mock_article(:post)

    {:ok, first_tag} =
      CMS.Communities.create_tag(
        community,
        :post,
        mock_attrs(:community_tag),
        user,
        Ecto.UUID.generate()
      )

    {:ok, second_tag} =
      CMS.Communities.create_tag(
        community,
        :post,
        mock_attrs(:community_tag),
        user,
        Ecto.UUID.generate()
      )

    {:ok, _assignment} =
      CMS.Communities.set_tag(article, first_tag.id, user, Ecto.UUID.generate())

    {:ok, _assignment} =
      CMS.Communities.set_tag(article, second_tag.id, user, Ecto.UUID.generate())

    assert {:ok, %{entries: [entry]}} =
             Pagination.page(:post, %{
               community: community.slug,
               page: 1,
               size: 20,
               config_revision: 0
             })

    assert entry.author.id == article.author.id
    assert Enum.map(entry.community_tags, & &1.id) == [first_tag.id, second_tag.id]
    assert Enum.all?(entry.community_tags, &(is_binary(&1.group) and &1.group != ""))
    assert Enum.all?(entry.community_tags, &(&1.community.id == community.id))
  end

  test "cursor continues from the Article binding identity without a count" do
    {community, first_article, _attrs, user} = mock_article(:post)
    {_, second_article, _attrs, _user} = mock_article(:post, community, user)

    config = %Config{
      api: :cursor,
      default_size: 1,
      max_size: 10,
      revision: 0,
      platform_hard_max: 100
    }

    assert {:ok, %{entries: [first_entry], page_info: %{api: :cursor, end_cursor: cursor}}} =
             Pagination.page(
               :post,
               %{community: community.slug, first: 1, config_revision: 0},
               nil,
               config: config
             )

    assert first_entry.id == second_article.id
    assert is_binary(cursor)

    assert {:ok, %{entries: entries, page_info: %{api: :cursor}}} =
             Pagination.page(
               :post,
               %{community: community.slug, first: 1, after: cursor, config_revision: 0},
               nil,
               config: config
             )

    assert [next_entry] = entries
    refute next_entry.id == first_entry.id

    assert MapSet.new([first_article.id, second_article.id]) ==
             MapSet.new([first_entry.id, next_entry.id])
  end

  test "stats cursor treats a missing stats row as zero without omissions" do
    {community, first_article, _attrs, user} = mock_article(:post)
    {_, second_article, _attrs, _user} = mock_article(:post, community, user)
    {_, third_article, _attrs, _user} = mock_article(:post, community, user)

    Repo.delete_all(from(stats in ArticleStats, where: stats.article_id == ^second_article.id))

    config = %Config{
      api: :cursor,
      default_size: 1,
      max_size: 10,
      revision: 0,
      platform_hard_max: 100
    }

    base_filter = %{
      community: community.slug,
      first: 1,
      config_revision: 0,
      order: :upvotes
    }

    assert {:ok, %{entries: [first], page_info: %{end_cursor: first_cursor}}} =
             Pagination.page(:post, base_filter, nil, config: config)

    assert {:ok, %{entries: [second], page_info: %{end_cursor: second_cursor}}} =
             Pagination.page(
               :post,
               Map.put(base_filter, :after, first_cursor),
               nil,
               config: config
             )

    assert {:ok, %{entries: [third], page_info: %{has_next_page: false}}} =
             Pagination.page(
               :post,
               Map.put(base_filter, :after, second_cursor),
               nil,
               config: config
             )

    assert MapSet.new([first.id, second.id, third.id]) ==
             MapSet.new([first_article.id, second_article.id, third_article.id])
  end

  test "an explicit Pagi branch never receives a synthesized config revision" do
    {community, _article, _attrs, _user} = mock_article(:post)
    filter = %{community: community.slug}

    for pagi_input <- [{:offset, %{}}, {:offset, %{page: 1}}, {:cursor, %{}}] do
      assert {:error, %ErrorCat.Error{reason: :invalid_config_context}} =
               Pagination.page(:post, filter, nil, pagi_input: pagi_input)
    end
  end

  test "the legacy page filter keeps its compatibility revision synthesis" do
    {community, _article, _attrs, _user} = mock_article(:post)

    assert {:ok, %{page_info: %{api: :offset, page: 1}}} =
             Pagination.page(:post, %{community: community.slug, page: 1, size: 20})
  end

  test "cursor returns pinned entries only on the starting page" do
    {community, pinned_article, _attrs, user} = mock_article(:post)
    {_, _regular_article, _attrs, _user} = mock_article(:post, community, user)
    {_, _another_regular_article, _attrs, _user} = mock_article(:post, community, user)

    assert {:ok, _pinned} =
             CMS.Articles.pin(community, pinned_article.id, user, Ecto.UUID.generate())

    config = %Config{
      api: :cursor,
      default_size: 1,
      max_size: 10,
      revision: 0,
      platform_hard_max: 100
    }

    assert {:ok,
            %{pinned_entries: [pinned_entry], entries: entries, page_info: %{end_cursor: cursor}}} =
             Pagination.page(
               :post,
               %{community: community.slug, first: 1, config_revision: 0},
               nil,
               config: config
             )

    assert pinned_entry.id == pinned_article.id
    refute Enum.any?(entries, &(&1.id == pinned_article.id))
    assert is_binary(cursor)

    assert {:ok, %{pinned_entries: [], entries: next_entries}} =
             Pagination.page(
               :post,
               %{community: community.slug, first: 1, after: cursor, config_revision: 0},
               nil,
               config: config
             )

    assert length(next_entries) == 1
    refute Enum.any?(next_entries, &(&1.id == pinned_article.id))
  end

  test "keeps the three-query first-page budget constant as page size grows" do
    {community, _article, _attrs, _user} = mock_article(:post)
    filter = %{community: community.slug, config_revision: 0}

    assert {:ok, _config} =
             CMS.Dashboard.Pagination.for_community(community.slug, :posts)

    {_small_result, small_queries} =
      capture_queries(fn ->
        Pagination.page(:post, Map.merge(filter, %{page: 1, size: 1}))
      end)

    query_sets =
      for size <- [20, Config.platform_hard_max()] do
        {_result, queries} =
          capture_queries(fn ->
            Pagination.page(:post, Map.merge(filter, %{page: 1, size: size}))
          end)

        queries
      end

    assert Enum.all?(query_sets, &(length(&1) == length(small_queries)))

    article_queries =
      Enum.count(small_queries, fn query ->
        String.contains?(query, "FROM \"cms\".\"articles\"")
      end)

    assert article_queries == 3

    assert Enum.all?(query_sets, fn queries ->
             Enum.count(queries, &String.contains?(&1, "FROM \"cms\".\"articles\"")) == 3
           end)
  end

  test "joins ArticleStats only for a stats order" do
    {community, _article, _attrs, _user} = mock_article(:post)
    base_filter = %{community: community.slug, page: 1, size: 20, config_revision: 0}

    assert {:ok, _config} =
             CMS.Dashboard.Pagination.for_community(community.slug, :posts)

    {_result, active_queries} =
      capture_queries(fn -> Pagination.page(:post, base_filter) end)

    {_result, stats_queries} =
      capture_queries(fn -> Pagination.page(:post, Map.put(base_filter, :order, :upvotes)) end)

    refute Enum.any?(active_queries, &String.contains?(&1, "article_stats"))
    assert Enum.count(stats_queries, &String.contains?(&1, "article_stats")) == 1
  end

  test "Dashboard config is loaded once on a cold cache and reused by list pages" do
    {community, _article, _attrs, _user} = mock_article(:post)

    assert {:ok, _deleted?} =
             CMS.Dashboard.Pagination.invalidate(community.slug, :posts)

    {{:ok, _config}, cold_queries} =
      capture_queries(fn ->
        CMS.Dashboard.Pagination.for_community(community.slug, :posts)
      end)

    {{:ok, _config}, warm_queries} =
      capture_queries(fn ->
        CMS.Dashboard.Pagination.for_community(community.slug, :posts)
      end)

    assert Enum.count(cold_queries, &String.contains?(&1, "community_dashboards")) == 1
    refute Enum.any?(warm_queries, &String.contains?(&1, "community_dashboards"))
  end

  defp capture_queries(fun) do
    ref = make_ref()
    handler_id = {__MODULE__, ref}

    event =
      GroupherServer.Repo.config() |> Keyword.fetch!(:telemetry_prefix) |> Kernel.++([:query])

    :ok =
      :telemetry.attach(
        handler_id,
        event,
        fn _event, _measurements, metadata, {pid, query_ref} ->
          send(pid, {query_ref, metadata.query})
        end,
        {self(), ref}
      )

    try do
      result = fun.()
      {result, drain_queries(ref, [])}
    after
      :telemetry.detach(handler_id)
    end
  end

  defp drain_queries(ref, queries) do
    receive do
      {^ref, query} -> drain_queries(ref, [query | queries])
    after
      0 -> Enum.reverse(queries)
    end
  end
end
