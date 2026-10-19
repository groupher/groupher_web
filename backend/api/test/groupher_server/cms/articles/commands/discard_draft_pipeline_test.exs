defmodule GroupherServer.Test.CMS.Articles.Commands.DiscardDraftPipeline do
  use GroupherServer.TestMate, async: false

  alias GroupherServer.CMS

  test "runs the prepare stage and discards the loaded draft" do
    {community, public, _attrs, user} = mock_article(:post)
    article = Repo.get!(CMS.Model.Article, public.article_id)
    {:ok, author} = CMS.Articles.Persist.ensure_author_exists(user)
    {:ok, draft} = CMS.Articles.Draft.Store.ensure_from_public(article, author)

    assert {:ok, :pass} =
             CMS.Articles.discard_draft(article.id, user,
               community: community,
               expected_version: draft.version
             )

    assert {:error, :not_found} = CMS.Articles.Draft.Store.get(article)
  end
end
