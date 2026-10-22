defmodule GroupherServer.Test.CMS.ReviewVisibilityEffectsTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Messaging, Repo}
  alias AlertBoard.Model.{Case, ReviewConfig}

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    ArticleReviewRestriction,
    CommentLifecycle,
    CommentReviewRestriction
  }

  alias CMS.Comments.Commands.Create
  alias CMS.Outbox.Event
  alias CMS.Review.Effects
  alias Messaging.Model.{Mention, Notification}

  test "public approval retries the original full Article publish projection" do
    {:ok, author} = db_insert(:user)
    {:ok, community} = mock_community(author)
    {:ok, configs} = AlertBoard.configs_for_target(community.id, :article)
    config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    config
    |> ReviewConfig.changeset(%{publish_mode: :human_first, version: config.version + 1})
    |> Repo.update!()

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Publish projection after review",
        slug: "review-projection-#{System.unique_integer([:positive])}"
      })

    assert {:ok, published} =
             CMS.Articles.create(
               community,
               :post,
               attrs,
               author,
               command_id: Ecto.UUID.generate()
             )

    article = Repo.get!(Article, published.article_id)
    public = Repo.get_by!(ArticlePublic, article_id: article.id)

    projection_event =
      Event
      |> where([event], event.event == "article.projections" and event.resource_id == ^article.id)
      |> Repo.all()
      |> Enum.find(fn event ->
        event.data["community_id"] == community.id and
          event.data["revision_id"] == public.revision_id
      end)

    assert %Event{data: %{"first_publish?" => "true"}} = projection_event

    projection_event
    |> Event.changeset(%{
      status: :failed,
      attempts: 3,
      completed_at: DateTime.utc_now(:second),
      last_error_code: "projection_blocked_by_review",
      last_error_at: DateTime.utc_now(:second)
    })
    |> Repo.update!()

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    case_record = Repo.get_by!(Case, target_key: "article:#{article.id}")

    Repo.transaction(fn ->
      {:ok, locked_lifecycle} = CMS.Articles.Lifecycle.lock(article)

      restriction_ids =
        Repo.all(
          from(restriction in ArticleReviewRestriction,
            where:
              restriction.lifecycle_id == ^lifecycle.id and
                restriction.scope_key == ^"community:#{community.id}" and
                is_nil(restriction.ended_at),
            select: restriction.id
          )
        )

      assert {:ok, :pass} =
               CMS.Articles.Lifecycle.end_review_restrictions(
                 locked_lifecycle,
                 "community:#{community.id}",
                 restriction_ids,
                 Ecto.UUID.generate(),
                 "approved"
               )
    end)

    assert Repo.get_by!(ArticleBinding,
             article_id: article.id,
             community_id: community.id
           ).visible

    retried = Repo.get!(Event, projection_event.id)
    assert retried.status == :waiting
    assert retried.attempts == 0
    assert Repo.get!(Case, case_record.id).status == :open
  end

  test "public Article review event refreshes Mention facts and delivers idempotently" do
    {:ok, author} = db_insert(:user)
    {:ok, recipient} = db_insert(:user)
    {:ok, community} = mock_community(author)

    {:ok, configs} = AlertBoard.configs_for_target(community.id, :article)
    config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      version: config.version + 1
    })
    |> Repo.update!()

    # Use a recipient created in this test and a body that resolves to an internal user mention.
    body =
      plate_body([
        block("review-mention", [
          mention(%{
            "value" => recipient.login,
            "children" => [%{"text" => recipient.login}]
          })
        ])
      ])

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Mention after review",
        slug: "review-mention-#{System.unique_integer([:positive])}",
        body_bag: mock_body_bag(body)
      })

    assert {:ok, published} =
             CMS.Articles.create(
               community,
               :post,
               attrs,
               author,
               command_id: Ecto.UUID.generate()
             )

    article = Repo.get!(Article, published.article_id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    hidden_event = article_review_event!(article.id, community.id)

    assert {:ok, :hidden} = Effects.deliver(hidden_event)
    refute Repo.exists?(from(mention in Mention, where: mention.to_user_id == ^recipient.id))

    Repo.transaction(fn ->
      {:ok, locked_lifecycle} = CMS.Articles.Lifecycle.lock(article)

      restrictions =
        Repo.all(
          from(restriction in ArticleReviewRestriction,
            where:
              restriction.lifecycle_id == ^lifecycle.id and
                restriction.scope_key == ^"community:#{community.id}" and
                is_nil(restriction.ended_at)
          )
        )

      assert restrictions != []

      assert {:ok, :pass} =
               CMS.Articles.Lifecycle.end_review_restrictions(
                 locked_lifecycle,
                 "community:#{community.id}",
                 Enum.map(restrictions, & &1.id),
                 Ecto.UUID.generate(),
                 "approved"
               )
    end)

    event = article_review_event!(article.id, community.id)
    assert {:ok, :pass} = Effects.deliver(event)
    assert {:ok, :pass} = Effects.deliver(event)

    rows = Repo.all(from(mention in Mention, where: mention.to_user_id == ^recipient.id))
    assert length(rows) == 1
    assert hd(rows).article_id == article.id
  end

  test "a public source binding cannot authorize effects for a restricted mirror" do
    {:ok, author} = db_insert(:user)
    {:ok, recipient} = db_insert(:user)
    {:ok, source} = mock_community(author)
    {:ok, destination} = mock_community(author)

    {:ok, configs} = AlertBoard.configs_for_target(destination.id, :article)
    destination_config = Enum.find(configs, &(&1.scope_key == "community:#{destination.id}"))

    destination_config
    |> ReviewConfig.changeset(%{
      publish_mode: :human_first,
      version: destination_config.version + 1
    })
    |> Repo.update!()

    body =
      plate_body([
        block("mirror-review-mention", [
          mention(%{
            "value" => recipient.login,
            "children" => [%{"text" => recipient.login}]
          })
        ])
      ])

    attrs =
      mock_attrs(:post, %{community_id: source.id})
      |> Map.merge(%{
        title: "Scoped review event",
        slug: "scoped-review-#{System.unique_integer([:positive])}",
        body_bag: mock_body_bag(body)
      })

    assert {:ok, published} =
             CMS.Articles.create(source, :post, attrs, author, command_id: Ecto.UUID.generate())

    mirror_actor = grant_binding_actions(author, [source, destination])

    assert {:ok, _article} =
             CMS.Articles.mirror(
               destination,
               published.article_id,
               [],
               mirror_actor,
               source,
               Ecto.UUID.generate()
             )

    event = article_review_event!(published.article_id, destination.id)
    assert {:ok, :hidden} = Effects.deliver(event)
    refute Repo.exists?(from(mention in Mention, where: mention.to_user_id == ^recipient.id))
  end

  test "Comment mention and activity notification wait for Gate visibility" do
    {community, article, _attrs, article_author} = mock_article(:post)
    {:ok, commenter} = db_insert(:user)
    {:ok, recipient} = db_insert(:user)
    {:ok, configs} = AlertBoard.configs_for_target(community.id, :comment)
    config = Enum.find(configs, &(&1.scope_key == "community:#{community.id}"))

    config
    |> ReviewConfig.changeset(%{publish_mode: :human_first, version: config.version + 1})
    |> Repo.update!()

    body =
      plate_body([
        block("comment-review-mention", [
          mention(%{
            "value" => recipient.login,
            "children" => [%{"text" => recipient.login}]
          })
        ])
      ])

    comment_body =
      mock_comment(recipient.login)
      |> Map.merge(%{
        json: body,
        body_hash: :crypto.hash(:sha256, body) |> Base.encode16(case: :lower)
      })

    assert {:ok, result} =
             Create.create(
               :post,
               %{article_id: article.article_id, community: community},
               comment_body,
               commenter,
               Ecto.UUID.generate()
             )

    comment = Repo.preload(result.comment, :body)
    comment_event = comment_review_event!(comment.id)
    assert {:ok, :hidden} = Effects.deliver(comment_event)
    refute Repo.exists?(from(mention in Mention, where: mention.to_user_id == ^recipient.id))

    refute Repo.exists?(
             from(notification in Notification, where: notification.action == "comment")
           )

    lifecycle = Repo.get_by!(CommentLifecycle, comment_id: comment.id)

    Repo.transaction(fn ->
      {:ok, locked_lifecycle} = CMS.Comments.Lifecycle.lock(comment.id)

      restrictions =
        Repo.all(
          from(restriction in CommentReviewRestriction,
            where:
              restriction.lifecycle_id == ^lifecycle.id and
                restriction.scope_key == ^"community:#{community.id}" and
                is_nil(restriction.ended_at)
          )
        )

      assert restrictions != []

      assert {:ok, :pass} =
               CMS.Comments.Lifecycle.end_review_restrictions(
                 locked_lifecycle,
                 "community:#{community.id}",
                 Enum.map(restrictions, & &1.id),
                 Ecto.UUID.generate(),
                 "approved"
               )
    end)

    event = comment_review_event!(comment.id)
    assert {:ok, :pass} = Effects.deliver(event)
    assert {:ok, :pass} = Effects.deliver(event)

    assert Repo.aggregate(
             from(mention in Mention,
               where: mention.comment_id == ^comment.id and mention.to_user_id == ^recipient.id
             ),
             :count
           ) == 1

    assert Repo.aggregate(
             from(notification in Notification,
               where:
                 notification.action == "COMMENT" and
                   notification.user_id == ^article_author.id and
                   notification.comment_id == ^comment.id
             ),
             :count
           ) == 1
  end

  defp article_review_event!(article_id, community_id) do
    Event
    |> where(
      [event],
      event.event == "article.review_changed" and event.resource_id == ^article_id
    )
    |> Repo.all()
    |> Enum.filter(fn event -> event.data["scope_key"] == "community:#{community_id}" end)
    |> Enum.max_by(&DateTime.to_unix(&1.inserted_at, :microsecond), fn -> nil end)
    |> case do
      %Event{} = event -> event
      nil -> flunk("missing article review visibility event")
    end
  end

  defp comment_review_event!(comment_id) do
    Event
    |> where(
      [event],
      event.event == "comment.review_changed" and event.resource_id == ^to_string(comment_id)
    )
    |> Repo.all()
    |> Enum.max_by(&DateTime.to_unix(&1.inserted_at, :microsecond), fn -> nil end)
    |> case do
      %Event{} = event -> event
      nil -> flunk("missing comment review visibility event")
    end
  end

  defp plate_body(blocks), do: Jason.encode!(blocks)

  defp grant_binding_actions(user, communities) do
    grants =
      Enum.into(communities, %{}, fn community ->
        {community.slug,
         %{"cms" => %{"post.pin" => true, "post.edit" => true, "post.mirror" => true}}}
      end)

    Map.put(
      user,
      :cur_passport,
      Map.merge(%{"global" => %{"post.community.mirror" => true}}, grants)
    )
  end

  defp block(id, children) do
    %{"type" => "p", "id" => id, "_id" => id, "children" => children}
  end

  defp mention(attrs), do: Map.merge(%{"type" => "mention"}, attrs)
end
