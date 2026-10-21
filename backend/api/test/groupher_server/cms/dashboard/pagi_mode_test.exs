defmodule GroupherServer.CMS.Dashboard.PagiModeTest do
  use ExUnit.Case, async: true
  alias GroupherServer.CMS.Dashboard.PagiMode
  alias GroupherServer.CMS.Model.CommunityDashboard

  test "all modes derive one API and fixed platform limits" do
    for {mode, api} <- [page: :offset, load_more: :cursor, infinite_scroll: :cursor] do
      assert {:ok,
              %{mode: ^mode, config: %{api: ^api, revision: 4, default_size: 20, max_size: 100}}} =
               PagiMode.effective(mode, 4)
    end
  end

  test "desktop and mobile schema defaults are independent" do
    dashboard = %CommunityDashboard{}
    assert dashboard.pagi_mode == :page
    assert dashboard.pagi_mobile_mode == :infinite_scroll

    refute CommunityDashboard.changeset(dashboard, %{community_id: 1, pagi_mobile_mode: "offset"}).valid?
  end

  test "invalid mode and revision are rejected" do
    assert {:error, _} = PagiMode.effective(:unknown)
    assert {:error, _} = PagiMode.effective(:page, -1)

    refute CommunityDashboard.changeset(%CommunityDashboard{}, %{
             community_id: 1,
             pagi_mode: "offset"
           }).valid?
  end
end
