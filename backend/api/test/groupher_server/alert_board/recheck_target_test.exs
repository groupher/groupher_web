defmodule GroupherServer.Test.AlertBoard.RecheckTargetTest do
  use GroupherServer.TestMate, async: false

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias CMS.Model.{Article, ArticleLifecycle}
  alias ReviewBot.Model.Check

  test "rechecks the current snapshot with the latest scope config and a new generation" do
    {:ok, author} = db_insert(:user)
    {:ok, community} = mock_community(author)
    config = config_for(community.id)
    configure_word_check(config, author)

    attrs =
      mock_attrs(:post, %{community_id: community.id})
      |> Map.merge(%{
        title: "Recheck target",
        slug: "recheck-#{System.unique_integer([:positive])}"
      })
      |> Map.put(:body_bag, mock_body_bag(mock_rich_text("A stable published body.")))

    assert {:ok, published} =
             CMS.Articles.create(community, :post, attrs, author,
               command_id: Ecto.UUID.generate()
             )

    article = Repo.get!(Article, published.article_id)

    first_check =
      Repo.get_by!(Check,
        target_key: "article:#{article.id}",
        scope_key: "community:#{community.id}"
      )

    reviewer = grant_review_action(db_insert(:user) |> elem(1), community.slug)
    scope = %{kind: :community, community: community}

    assert {:ok, [%Check{} = recheck]} =
             AlertBoard.recheck(
               %{kind: :article, id: article.id},
               scope,
               reviewer,
               Ecto.UUID.generate()
             )

    lifecycle = Repo.get_by!(ArticleLifecycle, article_id: article.id)
    assert recheck.generation == first_check.generation + 1
    assert recheck.content_token == first_check.content_token
    assert recheck.human_epoch == lifecycle.review_epoch

    checks =
      Repo.all(
        from(check in Check,
          where:
            check.target_key == ^"article:#{article.id}" and
              check.scope_key == ^"community:#{community.id}",
          order_by: [asc: check.generation]
        )
      )

    assert Enum.map(checks, & &1.generation) == [1, 2]
  end

  defp config_for(community_id) do
    {:ok, configs} = AlertBoard.configs_for_target(community_id, :article)
    Enum.find(configs, &(&1.scope_key == "community:#{community_id}"))
  end

  defp configure_word_check(config, author) do
    {:ok, ruleset} =
      %RuleSet{}
      |> RuleSet.changeset(%{
        scope_key: config.scope_key,
        version: 1,
        rules: %{
          "items" => [
            %{
              "id" => "forbidden-term",
              "kind" => "word",
              "value" => "forbidden-term",
              "category" => "policy",
              "action" => "restrict"
            }
          ]
        },
        created_by_id: author.id,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text"]
      })
      |> Repo.insert()

    config
    |> ReviewConfig.changeset(%{version: config.version + 1, ruleset_id: ruleset.id})
    |> Repo.update!()
  end

  defp grant_review_action(user, community_slug) do
    %{
      user
      | cur_passport: %{
          "global" => %{},
          community_slug => %{"cms" => %{"review.decide" => true}}
        }
    }
  end
end
