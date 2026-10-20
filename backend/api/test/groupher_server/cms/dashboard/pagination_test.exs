defmodule GroupherServer.Test.CMS.DashboardPagination do
  @moduledoc false

  use ExUnit.Case, async: true

  alias GroupherServer.CMS.Dashboard.Pagination
  alias GroupherServer.CMS.Model.CommunityDashboard
  alias GroupherServer.Pagi.EffectiveConfig

  test "normalizes surface maps and keeps missing surfaces implicit" do
    assert {:ok, normalized} =
             Pagination.normalize(%{
               "posts" => %{
                 "schema_version" => 1,
                 "api" => "offset",
                 "mode" => "page",
                 "revision" => 3,
                 "default_size" => 10,
                 "max_size" => 50
               }
             })

    assert normalized == %{
             posts: %{
               schema_version: 1,
               api: :offset,
               mode: :page,
               revision: 3,
               default_size: 10,
               max_size: 50
             }
           }

    assert {:ok, %EffectiveConfig{mode: :page, schema_version: 1}} =
             Pagination.effective(normalized, :changelogs)
  end

  test "uses the platform default for missing dashboard data" do
    assert {:ok, %EffectiveConfig{config: config, mode: :page, schema_version: 1}} =
             Pagination.effective(nil, :posts)

    assert config.api == :offset
    assert config.default_size == 20
    assert config.max_size == 100
    assert config.revision == 0
  end

  test "rejects unknown, duplicate, and invalid surface configuration" do
    assert {:error, :invalid_config} = Pagination.normalize(%{unknown: %{}})

    assert {:error, :invalid_config} =
             Pagination.normalize(%{"posts" => %{}, posts: %{}})

    assert {:error, _reason} =
             Pagination.normalize(%{
               posts: %{schema_version: 1, api: :offset, mode: :load_more, revision: 1}
             })
  end

  test "CommunityDashboard changeset persists only normalized pagination maps" do
    changeset =
      CommunityDashboard.changeset(%CommunityDashboard{}, %{
        community_id: 1,
        pagination: %{posts: %{schema_version: 1, api: :offset, mode: :page, revision: 2}}
      })

    assert changeset.valid?

    assert Ecto.Changeset.get_change(changeset, :pagination) == %{
             posts: %{
               schema_version: 1,
               api: :offset,
               mode: :page,
               revision: 2,
               default_size: 20,
               max_size: 100
             }
           }
  end

  test "CommunityDashboard changeset rejects malformed pagination" do
    changeset =
      CommunityDashboard.changeset(%CommunityDashboard{}, %{
        community_id: 1,
        pagination: %{posts: %{schema_version: 1, api: :cursor, mode: :page, revision: 1}}
      })

    refute changeset.valid?
    assert Keyword.has_key?(changeset.errors, :pagination)
  end
end
