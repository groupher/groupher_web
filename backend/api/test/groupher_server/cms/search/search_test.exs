defmodule GroupherServer.Test.CMS.Search do
  @moduledoc false
  use GroupherServer.TestMate

  alias GroupherServer.CMS
  alias CMS.Communities.Categories.Persist, as: CategoriesPersist
  alias CMS.Search

  defp create_community!(user, attrs) do
    community_attrs = mock_attrs(:community, attrs)
    {:ok, community} = CMS.Communities.create(community_attrs, user, Ecto.UUID.generate())
    community
  end

  setup do
    {:ok, user} = db_insert(:user)
    _community = create_community!(user, %{title: "react"})
    _community = create_community!(user, %{title: "php"})
    _community = create_community!(user, %{title: "每日妹子"})
    _community = create_community!(user, %{title: "javascript"})
    _community = create_community!(user, %{title: "java"})

    {:ok, ~m(user)a}
  end

  describe "[cms search community with category]" do
    test "community with category can be searched", ~m(user)a do
      community = create_community!(user, %{title: "cool-pl"})
      {:ok, category} = db_insert(:category, %{slug: "pl"})

      {:ok, _} = CategoriesPersist.set_category(community, category)

      {:ok, searched} = Search.community("cool-pl", "pl")
      assert searched |> List.first() |> Map.get(:title) == "cool-pl"
    end
  end

  describe "[cms search community]" do
    test "search community by full title should bounded community suggestions" do
      {:ok, searched} = Search.community("react")

      assert is_list(searched)
      assert length(searched) == 1
      assert searched |> Enum.at(0) |> Map.get(:title) == "react"
    end

    test "search community blur title should return valid communities" do
      {:ok, searched} = Search.community("reac")
      assert searched |> Enum.any?(&(&1.title == "react"))

      {:ok, searched} = Search.community("rea")
      assert searched |> Enum.any?(&(&1.title == "react"))

      {:ok, searched} = Search.community("eac")
      assert searched |> Enum.any?(&(&1.title == "react"))

      {:ok, searched} = Search.community("每日")
      assert searched |> Enum.any?(&(&1.title == "每日妹子"))

      {:ok, searched} = Search.community("javasc")
      assert length(searched) == 1
      assert searched |> Enum.at(0) |> Map.get(:title) == "javascript"

      {:ok, searched} = Search.community("java")
      assert length(searched) == 2
      assert searched |> Enum.any?(&(&1.title == "java"))
      assert searched |> Enum.any?(&(&1.title == "javascript"))
    end

    test "search non exist community should get an empty suggestion list" do
      {:ok, searched} = Search.community("non-exist")
      assert searched == []
    end
  end
end
