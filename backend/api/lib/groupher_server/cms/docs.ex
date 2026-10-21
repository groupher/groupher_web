defmodule GroupherServer.CMS.Docs do
  @moduledoc """
  Public facade for Doc-only branches, snapshots and release publishing.

      Docs facade
        -> Query / BranchVersions
        -> Commands.*
        -> DraftResult / Projection / domain owners
  """

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Model.User
  alias CMS.Docs.{BranchVersions, Editor}
  alias CMS.Docs.Commands.{PublishBranch, RestoreRevisionToDraft, UpdateDraft}
  alias CMS.Model.{Author, Community}

  @doc "Reads the current Doc content head shown by the editor."
  def read_editor_head(%Community{} = community, doc_id, opts \\ []) do
    Editor.read_head(community, doc_id, opts)
  end

  @doc "Updates one branch-scoped stable Doc Draft through the command boundary."
  @spec update_draft(Ecto.UUID.t(), pos_integer(), map(), User.t() | Author.t()) ::
          {:ok, CMS.Model.DocDraft.t()} | {:error, term()}
  def update_draft(doc_id, branch_id, attrs, actor) do
    UpdateDraft.execute(doc_id, branch_id, attrs, actor)
  end

  @doc "Publishes a stable Doc Article into one durable branch version."
  @spec publish_branch(Ecto.UUID.t(), pos_integer(), User.t() | Author.t(), keyword()) ::
          {:ok, map()} | {:error, term()}
  def publish_branch(doc_id, branch_id, actor, opts) do
    PublishBranch.execute(doc_id, branch_id, actor, opts)
  end

  @doc "Pages immutable publication history through the branch history owner."
  defdelegate list_branch_versions(doc_id, branch_id, pagi, actor), to: BranchVersions, as: :list

  @doc "Reads one authorized immutable branch version."
  defdelegate get_branch_version(doc_id, branch_id, version_id, actor),
    to: BranchVersions,
    as: :read

  @doc "Compares two authorized immutable branch versions."
  defdelegate diff_versions(doc_id, branch_id, left, right, actor),
    to: BranchVersions,
    as: :compare

  @doc "Restores a published Revision into the mutable workspace without moving Public."
  @spec restore_revision_to_draft(
          Ecto.UUID.t(),
          pos_integer(),
          Ecto.UUID.t(),
          User.t() | Author.t(),
          keyword()
        ) ::
          {:ok, CMS.Model.DocDraft.t()} | {:error, term()}
  def restore_revision_to_draft(doc_id, branch_id, revision_id, actor, opts \\ []) do
    RestoreRevisionToDraft.execute(doc_id, branch_id, revision_id, actor, opts)
  end
end
