defmodule GroupherServer.Test.CMS.Interactions.ReportTest do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.{CMS, Repo}
  alias CMS.Interactions.ErrorCat
  alias CMS.Model.ArticleLifecycle

  test "report identity uses immutable user id rather than login" do
    {_community, post, _attrs, user} = mock_article(:post)

    assert {:ok, _canonical} =
             CMS.Interactions.report(post, "spam", "details", user, Ecto.UUID.generate())

    renamed_user = %{user | login: "renamed-#{user.id}"}

    assert {:error, duplicate} =
             CMS.Interactions.report(post, "other", "details", renamed_user, Ecto.UUID.generate())

    assert duplicate.reason == ErrorCat.already_reported().reason

    assert {:ok, _canonical} =
             CMS.Interactions.undo_report(post, renamed_user, Ecto.UUID.generate())

    assert %{reported_count: 0, viewer_has_reported: false} =
             CMS.Interactions.viewer_state(post, renamed_user, surface: :report)
  end

  test "undo report is idempotent and never decrements State twice" do
    {_community, post, _attrs, user} = mock_article(:post)

    assert {:ok, _canonical} =
             CMS.Interactions.report(post, "spam", "details", user, Ecto.UUID.generate())

    assert {:ok, _canonical} =
             CMS.Interactions.undo_report(post, user, Ecto.UUID.generate())

    assert {:ok, _canonical} =
             CMS.Interactions.undo_report(post, user, Ecto.UUID.generate())

    assert %{reported_count: 0, viewer_has_reported: false} =
             CMS.Interactions.viewer_state(post, user, surface: :report)
  end

  test "report receipt replay does not reauthorize after the write committed" do
    {community, post, _attrs, user} = mock_article(:post)
    command_id = Ecto.UUID.generate()

    assert {:ok, %{id: post_id}} =
             CMS.Interactions.report(post, "spam", "details", user, command_id)

    Repo.get_by!(ArticleLifecycle,
      community_id: community.id,
      thread: :post,
      article_id: post.id
    )
    |> ArticleLifecycle.changeset(%{state: :archived})
    |> Repo.update!()

    assert {:ok, %{id: ^post_id}} =
             CMS.Interactions.report(post, "spam", "details", user, command_id)
  end
end
