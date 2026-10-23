defmodule GroupherServer.Test.CMS.Docs.PlatformReviewTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias CMS.Articles.Draft.Store

  alias CMS.Model.{
    Article,
    DocBranch,
    DocBranchVersion,
    DocLifecycle,
    DocPublic,
    DocReviewRestriction
  }

  alias CMS.Outbox.Event

  alias ReviewBot.Model.Check

  test "platform Doc word policy restricts only the published branch" do
    {:ok, user} = db_insert(:user)
    {:ok, community} = db_insert(:community)
    {:ok, author} = CMS.Articles.Persist.ensure_author_exists(user)

    config =
      case AlertBoard.configs_for_target(nil, :doc) do
        {:ok, [config]} -> config
      end

    ruleset =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: "platform",
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "blocked-word",
              "kind" => "word",
              "value" => "blocked phrase",
              "category" => "policy",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: user.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert!()

    config
    |> ReviewConfig.changeset(%{
      ruleset_id: ruleset.id,
      version: config.version + 1
    })
    |> Repo.update!()

    branch =
      %DocBranch{}
      |> DocBranch.changeset(%{
        community_id: community.id,
        slug: "main",
        title: "Main",
        type: :main,
        status: :active,
        created_by_id: user.id
      })
      |> Repo.insert!()

    {:ok, %{article: article, draft: draft}} =
      Store.create(
        community,
        :doc,
        %{
          title: "Platform reviewed Doc",
          slug: "platform-reviewed-#{System.unique_integer([:positive])}",
          body_bag: mock_body_bag(mock_rich_text("Contains a blocked phrase."))
        },
        author,
        branch_id: branch.id
      )

    assert {:ok, result} =
             CMS.Articles.Publish.Doc.publish(article, branch.id, author,
               expected_draft_version: draft.version,
               expected_lifecycle_version: 1,
               command_id: Ecto.UUID.generate()
             )

    lifecycle = Repo.get_by!(DocLifecycle, article_id: article.id, branch_id: branch.id)

    assert %Check{state: :completed, result: :restrict} =
             Repo.get_by!(Check,
               target_key: "doc:#{article.id}:#{branch.id}",
               scope_key: "platform",
               content_token: lifecycle.review_content_token
             )

    assert %DocReviewRestriction{kind: :rule_hit} =
             Repo.get_by!(DocReviewRestriction,
               lifecycle_id: lifecycle.id,
               scope_key: "platform"
             )

    refute Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id).visible

    refute result.public.visible

    public_main = CMS.Gate.Context.Scope.Doc.public_main()
    author_scope = CMS.Gate.Scope.scope(Article, user, :read, public_main)
    anonymous_scope = CMS.Gate.Scope.scope(Article, nil, :read, public_main)
    {:ok, platform_reader_user} = db_insert(:user)
    {:ok, community_reader_user} = db_insert(:user)

    platform_reader = %{
      platform_reader_user
      | cur_passport: %{"global" => %{"review.platform.read" => true}}
    }

    community_reader = %{
      community_reader_user
      | cur_passport: %{"global" => %{}, community.slug => %{"cms" => %{"review.read" => true}}}
    }

    platform_scope = CMS.Gate.Scope.scope(Article, platform_reader, :read, public_main)
    community_scope = CMS.Gate.Scope.scope(Article, community_reader, :read, public_main)

    assert Repo.exists?(from(scoped in author_scope, where: scoped.id == ^article.id))
    refute Repo.exists?(from(scoped in anonymous_scope, where: scoped.id == ^article.id))
    assert Repo.exists?(from(scoped in platform_scope, where: scoped.id == ^article.id))
    refute Repo.exists?(from(scoped in community_scope, where: scoped.id == ^article.id))

    public = Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id)
    version = Repo.get!(DocBranchVersion, public.branch_version_id)

    projection_event =
      Event
      |> where([event], event.event == "article.projections" and event.resource_id == ^article.id)
      |> Repo.all()
      |> Enum.find(fn event ->
        event.data["community_id"] == community.id and
          event.data["revision_id"] == version.revision_id
      end)

    projection_event
    |> Event.changeset(%{
      status: :failed,
      attempts: 3,
      completed_at: DateTime.utc_now(:second),
      last_error_code: "projection_blocked_by_review",
      last_error_at: DateTime.utc_now(:second)
    })
    |> Repo.update!()

    Repo.transaction(fn ->
      locked_lifecycle =
        DocLifecycle
        |> where([row], row.id == ^lifecycle.id)
        |> lock("FOR UPDATE")
        |> Repo.one!()

      restriction_ids =
        DocReviewRestriction
        |> where([restriction], restriction.lifecycle_id == ^lifecycle.id)
        |> select([restriction], restriction.id)
        |> Repo.all()

      assert {:ok, :pass} =
               CMS.Docs.Lifecycle.end_review_restrictions(
                 locked_lifecycle,
                 "platform",
                 restriction_ids,
                 Ecto.UUID.generate(),
                 "approved"
               )
    end)

    assert %Event{status: :waiting, attempts: 0} = Repo.get!(Event, projection_event.id)
  end
end
