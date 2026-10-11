defmodule GroupherServer.CMS.DocPublishRelease do
  @moduledoc """
  Stable internal Facade. Infrastructure access belongs to the delegated Owner.

      caller -> GroupherServer.CMS.DocPublishRelease -> result
  """

  @doc "Delegates branch_versions_before_tree_events/3 to the owning implementation."
  defdelegate branch_versions_before_tree_events(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocPublishRelease.Workflow

  @doc "Delegates create/5 to the owning implementation."
  defdelegate create(arg1, arg2, arg3, arg4, arg5),
    to: GroupherServer.CMS.DocPublishRelease.Workflow

  @doc "Delegates mark_site_draft_clean/3 to the owning implementation."
  defdelegate mark_site_draft_clean(arg1, arg2, arg3),
    to: GroupherServer.CMS.DocPublishRelease.Workflow

  @doc "Delegates mark_site_release_published/4 to the owning implementation."
  defdelegate mark_site_release_published(arg1, arg2, arg3, arg4),
    to: GroupherServer.CMS.DocPublishRelease.Workflow
end
