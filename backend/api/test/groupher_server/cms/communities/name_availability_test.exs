defmodule GroupherServer.Test.CMS.Communities.NameAvailabilityTest do
  @moduledoc false

  use GroupherServer.TestMate, async: false

  alias GroupherServer.CMS
  alias CMS.Communities.{NameAvailability, NameRules}
  alias CMS.Model.CommunitySlugClaim

  setup do
    {:ok, user} = db_insert(:user)
    {:ok, %{user: user}}
  end

  test "reserved and normalized names are checked before namespace queries" do
    assert {:error, %ErrorCat.Error{reason: :reserved_slug}} =
             NameAvailability.check(" Home ")

    assert {:ok, "new-community"} = NameAvailability.check(" New-Community ")
  end

  test "disputed claims keep a name unavailable", %{user: user} do
    insert_claim!(user, "acme", :disputed)

    assert {:error, %ErrorCat.Error{reason: :slug_disputed}} =
             NameAvailability.check("acme")

    assert {:ok, result} = CMS.Communities.check_name("acme")
    assert result.available == false
    assert result.reason_code == "slug_disputed"
  end

  test "existing communities keep a name unavailable", %{user: user} do
    {:ok, community} = mock_community(user)

    assert {:error, %ErrorCat.Error{reason: :slug_claimed}} =
             NameAvailability.check(community.slug)
  end

  test "cooldown claims block only while their cooldown is active", %{user: user} do
    insert_claim!(user, "cooldown-name", :cooldown,
      cooldown_until: DateTime.add(DateTime.utc_now(:second), 3600, :second)
    )

    assert {:error, %ErrorCat.Error{reason: :slug_in_cooldown}} =
             NameAvailability.check("cooldown-name")
  end

  test "expired cooldown claims no longer block a name", %{user: user} do
    insert_claim!(user, "released-name", :cooldown,
      cooldown_until: DateTime.add(DateTime.utc_now(:second), -1, :second)
    )

    assert {:ok, "released-name"} = NameAvailability.check("released-name")
  end

  test "pure rules normalize and validate without a namespace query" do
    assert NameRules.normalize("  GroupHer ") == "groupher"
    assert NameRules.normalize("  ") == nil
    assert {:error, %ErrorCat.Error{reason: :reserved_slug}} = NameRules.format_check("home")
    assert {:ok, "new-community"} = NameRules.format_check(" New-Community ")
  end

  defp insert_claim!(user, slug, status, attrs \\ []) do
    %CommunitySlugClaim{}
    |> CommunitySlugClaim.changeset(
      Map.merge(
        %{
          slug: slug,
          status: status,
          claimed_by_user_id: user.id,
          claim_reason: "name_policy_test"
        },
        Map.new(attrs)
      )
    )
    |> Repo.insert!()
  end
end
