defmodule GroupherServer.Test.CMS.Gate.Access.WithCheck do
  use GroupherServer.TestMate

  alias GroupherServer.{CMS, Repo}
  alias CMS.Gate.Access
  alias CMS.Model.{Comment, CommentBody}
  alias Helper.ORM

  setup do
    {community, post, _, actor} = mock_article(:post, preload: [author: :user])

    {:ok, comment} =
      CMS.Comments.create_comment(
        community,
        :post,
        article_inner_id(post, community),
        mock_comment(),
        actor,
        Ecto.UUID.generate()
      )

    {:ok, ~m(comment actor)a}
  end

  describe "with_check/4 transaction contract" do
    test "commits a valid callback result", ~m(comment actor)a do
      assert {:ok, updated} =
               Access.with_check(actor, :edit, comment, fn canonical ->
                 assert Repo.in_transaction?()
                 canonical |> comment_body() |> ORM.update(%{html: "committed"})
               end)

      assert updated.html == "committed"
      assert comment_body(comment).html == "committed"
    end

    test "rolls back callback errors", ~m(comment actor)a do
      before = comment_body(comment).html

      assert {:error, :stop} =
               Access.with_check(actor, :edit, comment, fn canonical ->
                 {:ok, _} = canonical |> comment_body() |> ORM.update(%{html: "must rollback"})
                 {:error, :stop}
               end)

      assert comment_body(comment).html == before
    end

    test "normalizes an invalid callback shape inside the transaction", ~m(comment actor)a do
      before = comment_body(comment).html

      assert {:error, %{reason: :unexpected_callback_result, details: details}} =
               Access.with_check(actor, :edit, comment, fn canonical ->
                 {:ok, _} = canonical |> comment_body() |> ORM.update(%{html: "must rollback"})
                 {:unexpected, :raw, "secret must not leak"}
               end)

      assert details == %{result_kind: :tuple, tuple_arity: 3}
      refute inspect(details) =~ "secret"
      assert comment_body(comment).html == before
    end

    test "rolls back and propagates callback exceptions", ~m(comment actor)a do
      before = comment_body(comment).html

      assert_raise RuntimeError, "boom", fn ->
        Access.with_check(actor, :edit, comment, fn canonical ->
          {:ok, _} = canonical |> comment_body() |> ORM.update(%{html: "must rollback"})
          raise "boom"
        end)
      end

      assert comment_body(comment).html == before
    end

    test "rolls back and preserves callback throws", ~m(comment actor)a do
      before = comment_body(comment).html

      assert catch_throw(
               Access.with_check(actor, :edit, comment, fn canonical ->
                 {:ok, _} = canonical |> comment_body() |> ORM.update(%{html: "must rollback"})
                 throw(:boom)
               end)
             ) == :boom

      assert comment_body(comment).html == before
    end
  end

  defp comment_body(%Comment{id: comment_id}) do
    Repo.get_by!(CommentBody, comment_id: comment_id)
  end
end
