defmodule GroupherServer.Test.CMS.AbuseReports.PostReport do
  @moduledoc false

  use GroupherServer.TestMate
  alias GroupherServer.{CMS, Repo}
  alias CMS.Articles.Response
  alias CMS.Model.ArticleBinding

  setup do
    {community, post, _, user} = mock_article(:post)
    {:ok, user2} = db_insert(:user)

    {:ok, ~m(community user user2 post)a}
  end

  describe "[article post report/unreport]" do
    test "list article reports should work", ~m(user user2 post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      {:ok, _} =
        CMS.AbuseReports.article(post, "reason", "attr_info", user2, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      report = all_reports.entries |> List.first()
      assert report.article.id == post.id
      assert report.article.thread == :post
    end

    test "report a post should have a abuse report record", ~m(user post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      report = List.first(all_reports.entries)
      report_cases = report.report_cases

      assert report.article.id == post.id
      assert all_reports.total_count == 1
      assert report.report_cases_count == 1
      assert List.first(report_cases).user.login == user.login

      {:ok, post} = Response.one(post, user, surface: :report)
      assert post.meta.reported_count == 1
      refute post.viewer_has_reported
      assert CMS.Interactions.viewer_state(post, user).viewer_has_reported
    end

    test "can undo a report", ~m(user post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())
      {:ok, _} = CMS.AbuseReports.undo_article(post, user, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      assert all_reports.total_count == 0

      refute CMS.Interactions.viewer_state(post, user).viewer_has_reported
    end

    test "can undo a existed report", ~m(user user2 post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      {:ok, _} =
        CMS.AbuseReports.article(post, "reason", "attr_info", user2, Ecto.UUID.generate())

      {:ok, _} = CMS.AbuseReports.undo_article(post, user, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      assert all_reports.total_count == 1

      assert CMS.Interactions.viewer_state(post, user2).viewer_has_reported
      refute CMS.Interactions.viewer_state(post, user).viewer_has_reported
    end

    test "can undo a report with other user report it too", ~m(user user2 post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      {:ok, _} =
        CMS.AbuseReports.article(post, "reason", "attr_info", user2, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      assert all_reports.total_count == 1

      report = all_reports.entries |> List.first()
      assert report.report_cases |> length == 2
      assert Enum.any?(report.report_cases, &(&1.user.login == user.login))
      assert Enum.any?(report.report_cases, &(&1.user.login == user2.login))

      {:ok, _} = CMS.AbuseReports.undo_article(post, user, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      assert all_reports.total_count == 1

      report = all_reports.entries |> List.first()
      assert report.report_cases |> length == 1
      assert Enum.any?(report.report_cases, &(&1.user.login == user2.login))
    end

    test "different user report a comment should have same report with different report cases",
         ~m(user user2 post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      {:ok, _} =
        CMS.AbuseReports.article(post, "reason2", "attr_info 2", user2, Ecto.UUID.generate())

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      {:ok, all_reports} =
        CMS.AbuseReports.paged_reports(
          Map.drop(filter, [:page, :size]),
          %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
        )

      report = List.first(all_reports.entries)
      report_cases = report.report_cases

      assert all_reports.total_count == 1
      assert length(report_cases) == 2
      assert report.report_cases_count == 2

      assert List.first(report_cases).user.login == user.login
      assert List.last(report_cases).user.login == user2.login
    end

    test "same user can not report a comment twice", ~m(post user)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      assert {:error, _report} =
               CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())
    end

    test "does not hydrate reports through a hidden target binding", ~m(community user post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())

      Repo.get_by!(ArticleBinding, article_id: post.id, community_id: community.id)
      |> ArticleBinding.changeset(%{visible: false})
      |> Repo.update!()

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      assert {:error, :article_binding_not_found} =
               CMS.AbuseReports.paged_reports(
                 Map.drop(filter, [:page, :size]),
                 %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
               )
    end

    test "does not hydrate reports through a trashed target", ~m(community user post)a do
      {:ok, _} = CMS.AbuseReports.article(post, "reason", "attr_info", user, Ecto.UUID.generate())
      assert {:ok, _trash} = CMS.Articles.Trash.trash(post, user, community: community)

      filter = %{content_type: :post, content_id: post.id, page: 1, size: 20}

      assert {:error, :article_binding_not_found} =
               CMS.AbuseReports.paged_reports(
                 Map.drop(filter, [:page, :size]),
                 %Helper.ORM.Pagi.Params.Offset{page: filter.page, size: filter.size}
               )
    end

    test "reports use stable newest-first ordering", ~m(community user post)a do
      {_, newer_post, _, _} = mock_article(:post, community, user)

      assert {:ok, _} =
               CMS.AbuseReports.article(post, "reason", "older", user, Ecto.UUID.generate())

      assert {:ok, _} =
               CMS.AbuseReports.article(
                 newer_post,
                 "reason",
                 "newer",
                 user,
                 Ecto.UUID.generate()
               )

      assert {:ok, %{entries: entries}} =
               CMS.AbuseReports.paged_reports(
                 %{content_type: :post},
                 %Helper.ORM.Pagi.Params.Offset{page: 1, size: 20}
               )

      assert Enum.map(entries, & &1.article.id) == [newer_post.id, post.id]
    end
  end
end
