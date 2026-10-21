defmodule GroupherServer.Test.Seeds.CleanUpTest do
  @moduledoc false
  use GroupherServer.TestMate

  # alias GroupherServer.CMS.Seeds

  describe "[clean up]" do
    test "can clean up a community" do
      # {:ok, community} = Seeds.community(:home)
      # {:ok, _} = CMS.create_article(community, :post, post_attrs, user)

      # assert found.total_count === 0

      # Seeds.clean_up_community(:home)

      # assert found.total_count == 0

      # assert found.total_count == 0

      # assert found.total_count !== 0

      # assert found.total_count == 0
    end
  end

  describe "[clean_up_articles]" do
    test "can clean up articles for a community" do
      # Test cleaning up articles of a specific type
      # {:ok, community} = Seeds.community(:home)
      # Seeds.articles(community, :post, 5)
      # Seeds.clean_up_articles(community, :post)
      # Verify articles are deleted
    end
  end
end
