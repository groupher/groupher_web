defmodule GroupherServer.Test.CMS.DocTree.ChangeDetection do
  @moduledoc false

  use GroupherServer.TestMate

  alias GroupherServer.CMS

  alias CMS.DocTree.ChangeDetection
  alias CMS.Model.DocDraft

  describe "[doc tree change detection]" do
    test "treats missing public Revision as changed" do
      draft = %DocDraft{content_hash: "body-hash"}

      assert ChangeDetection.draft_content_changed?(draft, nil)
    end
  end
end
