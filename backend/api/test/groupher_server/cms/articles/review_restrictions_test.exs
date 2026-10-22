defmodule GroupherServer.Test.CMS.Articles.ReviewRestrictionsTest do
  @moduledoc false
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.CMS

  alias CMS.Model.{
    Article,
    ArticleBinding,
    ArticleLifecycle,
    ArticlePublic,
    ArticleReviewRestriction,
    DocBranch,
    DocLifecycle,
    DocPublic
  }

  alias CMS.Outbox.Event, as: OutboxEvent

  test "ending one scope restriction keeps other scope restrictions effective" do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    binding = Repo.get_by!(ArticleBinding, article_id: article.id, community_id: community.id)
    operation_ref = Ecto.UUID.generate()

    assert {:ok, community_restriction} =
             Repo.transaction(fn ->
               with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article),
                    {:ok, restriction} <-
                      CMS.Articles.Lifecycle.apply_review_restriction(
                        locked,
                        attrs(lifecycle, "community:#{community.id}", "community-rule")
                      ) do
                 restriction
               else
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert Repo.get_by!(ArticlePublic, article_id: article.id).visible
    refute Repo.get!(ArticleBinding, binding.id).visible

    assert {:ok, platform_restriction} =
             Repo.transaction(fn ->
               with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article),
                    {:ok, restriction} <-
                      CMS.Articles.Lifecycle.apply_review_restriction(
                        locked,
                        attrs(lifecycle, "platform", "platform-rule")
                      ) do
                 restriction
               else
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert Repo.get_by!(ArticlePublic, article_id: article.id).visible == false
    refute Repo.get!(ArticleBinding, binding.id).visible

    assert {:ok, {:ok, :pass}} =
             Repo.transaction(fn ->
               with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article) do
                 CMS.Articles.Lifecycle.end_review_restrictions(
                   locked,
                   "community:#{community.id}",
                   [community_restriction.id],
                   operation_ref,
                   "review_approved"
                 )
               end
             end)

    assert Repo.get_by!(ArticlePublic, article_id: article.id).visible == false
    refute Repo.get!(ArticleBinding, binding.id).visible

    assert {:ok, {:ok, :pass}} =
             Repo.transaction(fn ->
               with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article) do
                 CMS.Articles.Lifecycle.end_review_restrictions(
                   locked,
                   "platform",
                   [platform_restriction.id],
                   operation_ref,
                   "review_approved"
                 )
               end
             end)

    assert Repo.get_by!(ArticlePublic, article_id: article.id).visible
    assert Repo.get!(ArticleBinding, binding.id).visible
  end

  test "replaying the same active restriction does not create another row" do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    restriction_attrs = attrs(lifecycle, "platform", "case:stable")

    apply = fn ->
      Repo.transaction(fn ->
        with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article),
             {:ok, restriction} <-
               CMS.Articles.Lifecycle.apply_review_restriction(locked, restriction_attrs) do
          restriction
        else
          {:error, reason} -> Repo.rollback(reason)
        end
      end)
    end

    assert {:ok, first} = apply.()
    assert {:ok, replay} = apply.()
    assert first.id == replay.id

    assert Repo.aggregate(
             from(restriction in ArticleReviewRestriction,
               where:
                 restriction.lifecycle_id == ^lifecycle.id and restriction.scope_key == "platform"
             ),
             :count
           ) == 1

    assert Repo.get_by!(ArticleBinding,
             article_id: article.id,
             community_id: community.id
           ).visible == false
  end

  test "rejects a community restriction outside the Article's bindings" do
    {community, article_view, _attrs, _author} = mock_article(:post)
    article = Repo.get!(Article, article_view.id)
    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    attrs = attrs(lifecycle, "community:#{community.id + 1000}", "unbound-community")

    assert {:ok, {:error, %ErrorCat.Error{reason: :invalid_review_restriction}}} =
             Repo.transaction(fn ->
               with {:ok, locked} <- CMS.Articles.Lifecycle.lock(article) do
                 CMS.Articles.Lifecycle.apply_review_restriction(locked, attrs)
               end
             end)
  end

  test "a Doc restriction changes only the selected branch public projection" do
    {_community, article_view, _attrs, _author} = mock_article(:doc)
    article = Repo.get!(Article, article_view.id)
    branch = Repo.get_by!(DocBranch, type: :main, community_id: article_view.community.id)
    lifecycle = Repo.get_by!(DocLifecycle, article_id: article.id, branch_id: branch.id)

    lock_lifecycle = fn ->
      DocLifecycle
      |> where([row], row.id == ^lifecycle.id)
      |> lock("FOR UPDATE")
      |> Repo.one()
    end

    assert {:ok, restriction} =
             Repo.transaction(fn ->
               locked = lock_lifecycle.()

               case CMS.Docs.Lifecycle.apply_review_restriction(
                      locked,
                      attrs(lifecycle, "platform", "doc-review")
                    ) do
                 {:ok, restriction} -> restriction
                 {:error, reason} -> Repo.rollback(reason)
               end
             end)

    assert Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id).visible == false

    assert %OutboxEvent{data: data} =
             Repo.get_by!(OutboxEvent,
               event: "article.visibility_changed",
               resource_id: article.id
             )

    assert data["branch_id"] == branch.id
    assert data["thread"] == "doc"
    assert data["community_id"] == article_view.community.id

    assert {:ok, {:ok, :pass}} =
             Repo.transaction(fn ->
               locked = lock_lifecycle.()

               CMS.Docs.Lifecycle.end_review_restrictions(
                 locked,
                 "platform",
                 [restriction.id],
                 Ecto.UUID.generate(),
                 "review_approved"
               )
             end)

    assert Repo.get_by!(DocPublic, article_id: article.id, branch_id: branch.id).visible
  end

  defp attrs(lifecycle, scope_key, cause_key) do
    %{
      lifecycle_id: lifecycle.id,
      scope_key: scope_key,
      cause_key: cause_key,
      kind: :manual_hold,
      content_token: Ecto.UUID.generate(),
      source: :human,
      created_by_operation_ref: Ecto.UUID.generate()
    }
  end
end
