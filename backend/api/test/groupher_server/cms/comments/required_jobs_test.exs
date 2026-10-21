defmodule GroupherServer.Test.CMS.Comments.RequiredJobs do
  use GroupherServer.TestMate, async: false

  import Ecto.Query, warn: false
  import ExUnit.CaptureLog

  alias GroupherServer.{CMS, Jobs}
  alias CMS.Model.{ArticleStats, Comment, CommentBody}
  alias CMS.Comments.RequiredJobs
  alias CMS.Gate.Access
  alias Jobs.Comments, as: CommentsJob
  alias Helper.ORM

  setup do
    oban_config =
      :groupher_server
      |> Application.fetch_env!(Oban)
      |> Keyword.merge(testing: :manual, queues: false, plugins: false)

    start_supervised!({Oban, oban_config})

    previous_env = Application.get_env(:groupher_server, :env)
    Application.put_env(:groupher_server, :env, :test_jobs)

    on_exit(fn -> Application.put_env(:groupher_server, :env, previous_env) end)

    :ok
  end

  test "required audition enqueue failure rolls back comment creation" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])
    reject_job_type(:audition)

    assert_raise Ecto.ConstraintError, fn ->
      CMS.Comments.create_comment(
        community,
        :post,
        article_inner_id(post, community),
        mock_comment(),
        actor,
        Ecto.UUID.generate()
      )
    end

    assert Repo.aggregate(
             from(comment in Comment, where: comment.article_id == ^post.article_id),
             :count
           ) == 0
  end

  test "required audition enqueue failure rolls back reply creation and counters" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, %Comment{} = parent} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment("parent"),
               actor,
               Ecto.UUID.generate()
             )

    reject_job_type(:audition)

    assert_raise Ecto.ConstraintError, fn ->
      CMS.Comments.reply_comment(parent.id, mock_comment("reply"), actor, Ecto.UUID.generate())
    end

    assert Repo.aggregate(
             from(comment in Comment, where: comment.article_id == ^post.article_id),
             :count
           ) == 1

    assert Repo.get!(Comment, parent.id).replies_count == 0

    assert Repo.get_by!(ArticleStats, article_id: post.article_id, thread: :post).comments_count ==
             1
  end

  test "required audition enqueue failure rolls back comment update" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, %Comment{} = comment} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment("before"),
               actor,
               Ecto.UUID.generate()
             )

    reject_job_type(:audition)

    assert_raise Ecto.ConstraintError, fn ->
      CMS.Comments.update_comment(comment, mock_comment("after"), 1, actor, Ecto.UUID.generate())
    end

    persisted = comment_body(comment)
    assert persisted.html =~ "before"
    refute persisted.html =~ "after"
  end

  test "application-level Oban changeset errors become a stable domain error and roll back" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, %Comment{} = comment} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment("before"),
               actor,
               Ecto.UUID.generate()
             )

    invalid_enqueue = fn _comment ->
      invalid_changeset =
        %{}
        |> CommentsJob.new()
        |> Ecto.Changeset.add_error(:args, "payload is required")

      Oban.insert(invalid_changeset)
    end

    assert {:error,
            %{
              reason: :required_job_enqueue_failed,
              details: %{job: :audition, failure: :validation}
            }} =
             Access.with_check(actor, :edit, comment, fn canonical ->
               with {:ok, updated_body} <-
                      canonical |> comment_body() |> ORM.update(%{html: "must rollback"}),
                    {:ok, _job} <- RequiredJobs.audition(canonical, invalid_enqueue) do
                 {:ok, updated_body}
               end
             end)

    assert comment_body(comment).html =~ "before"
  end

  defp comment_body(%Comment{id: comment_id}) do
    Repo.get_by!(CommentBody, comment_id: comment_id)
  end

  test "comment effects are durably recorded after the comment commits" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, %Comment{} = comment} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment(),
               actor,
               Ecto.UUID.generate()
             )

    assert Repo.get!(Comment, comment.id)

    assert %CMS.Outbox.Event{status: :waiting} =
             Repo.get_by!(CMS.Outbox.Event,
               event: "comment.created",
               resource_type: "comment",
               resource_id: to_string(comment.id)
             )
  end

  test "participant repair enqueue failure preserves a successful read" do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    assert {:ok, _} =
             CMS.Comments.create_comment(
               community,
               :post,
               article_inner_id(post, community),
               mock_comment(),
               actor,
               Ecto.UUID.generate()
             )

    stats = Repo.get_by!(ArticleStats, article_id: post.article_id, thread: :post)

    assert {:ok, _} =
             stats
             |> Ecto.Changeset.change(comments_participants_count: 99)
             |> Repo.update()

    reject_job_type(:reconcile_comments_participants)

    log =
      capture_log(fn ->
        assert {:ok, page} =
                 CMS.Comments.paged_comments_participants(
                   :post,
                   post.id,
                   %Helper.ORM.Pagi.Params.Offset{page: 1, size: 20}
                 )

        assert page.total_count == 1
      end)

    assert log =~ "optional job enqueue failed job=reconcile_comments_participants"

    assert Repo.get_by!(ArticleStats,
             article_id: post.article_id,
             thread: :post
           ).comments_participants_count == 99
  end

  defp reject_job_type(type) when is_atom(type) do
    suffix = Atom.to_string(type)
    constraint_name = "reject_#{suffix}_job_insert"

    # The test Sandbox rolls this table DDL back with each test. Dropping first
    # also makes a rerun recover from a prior non-transactional or interrupted
    # run; a future non-Sandbox test mode must add explicit teardown as well.
    Repo.query!("""
    ALTER TABLE public.oban_jobs
    DROP CONSTRAINT IF EXISTS #{constraint_name}
    """)

    Repo.query!("""
    ALTER TABLE public.oban_jobs
    ADD CONSTRAINT #{constraint_name}
    CHECK ((args->>'type') IS DISTINCT FROM '#{suffix}') NOT VALID
    """)
  end
end
