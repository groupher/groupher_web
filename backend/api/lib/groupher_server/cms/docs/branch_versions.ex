defmodule GroupherServer.CMS.Docs.BranchVersions do
  @moduledoc """
  Owns durable Doc publication history for one stable Article and branch.

      DocBranchVersion list/get
        -> immutable ArticleRevision + body/typed extension
        -> diff or restore into a mutable DocDraft

  Branch history is durable product history; browser recovery remains in the
  frontend LocalDraftHistory boundary.
  """

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}
  alias CMS.Articles.Draft.Store

  alias CMS.Model.{
    Article,
    ArticleBodySnapshot,
    ArticleRevision,
    Author,
    DocBranchVersion,
    DocDraft,
    DocPublic,
    DocRevision
  }

  @doc "Admits the branch read before paging its immutable history."
  def list(doc_id, branch_id, pagi, actor) do
    with {:ok, article} <- readable_history(doc_id, branch_id, actor) do
      page(article, branch_id, pagi)
    end
  end

  @doc "Reads one branch version under the same admission policy as history pages."
  def read(doc_id, branch_id, version_id, actor) do
    with {:ok, article} <- readable_history(doc_id, branch_id, actor) do
      get(article, branch_id, version_id)
    end
  end

  @doc "Compares two versions under the same branch admission."
  def compare(doc_id, branch_id, left, right, actor) do
    with {:ok, article} <- readable_history(doc_id, branch_id, actor) do
      diff(article, branch_id, left, right)
    end
  end

  defp readable_history(doc_id, branch_id, actor) do
    with {:ok, branch} <- Helper.ORM.find(CMS.Model.DocBranch, branch_id),
         {:ok, community} <- CMS.FrontDesk.community(branch.community_id, mode: :internal),
         {:ok, community} <- CMS.Gate.access_check(actor, :manage_docs, community),
         {:ok, article} <- CMS.Docs.Editor.stable_doc(doc_id),
         {:ok, _binding} <- CMS.Articles.Bindings.get(article, community) do
      {:ok, article}
    end
  end

  @spec page(Article.t(), pos_integer(), Helper.ORM.Pagi.Params.input()) :: tuple()
  defp page(%Article{thread: :doc, id: article_id}, branch_id, pagi) do
    query =
      from(version in DocBranchVersion,
        where: version.article_id == ^article_id and version.branch_id == ^branch_id
      )

    with {:ok, page} <-
           Helper.ORM.pagi(query, pagi,
             for: DocBranchVersion,
             surface: "docs.branch_versions",
             query_fingerprint: "#{article_id}:#{branch_id}",
             order: %Helper.ORM.Pagi.Order{
               fields: [:version_number, :id],
               directions: [:desc, :desc],
               cursor_fields: [:version_number, :id]
             }
           ) do
      {:ok, %{page | entries: materialize_many(page.entries)}}
    end
  end

  @doc "Loads one branch version and its immutable content without leaking raw schemas to callers."
  @spec get(Article.t(), pos_integer(), term()) :: {:ok, map()} | {:error, :not_found}
  def get(%Article{thread: :doc, id: article_id}, branch_id, branch_version_id) do
    version =
      DocBranchVersion
      |> where(
        [version],
        version.article_id == ^article_id and version.branch_id == ^branch_id and
          version.id == ^branch_version_id
      )
      |> Repo.one()

    case version do
      %DocBranchVersion{} = version -> {:ok, materialize(version)}
      nil -> {:error, :not_found}
    end
  end

  @doc "Compares the canonical immutable payloads of two versions in the same branch."
  @spec diff(Article.t(), pos_integer(), term(), term()) :: {:ok, map()} | {:error, :not_found}
  def diff(%Article{} = article, branch_id, left_branch_version_id, right_branch_version_id) do
    with {:ok, left} <- get(article, branch_id, left_branch_version_id),
         {:ok, right} <- get(article, branch_id, right_branch_version_id) do
      fields = ~w(title digest slug subtitle link_addr template_key body_hash)a

      changed =
        Enum.filter(fields, fn field ->
          get_in(left, [:content, field]) != get_in(right, [:content, field])
        end)

      {:ok, %{left: left.version, right: right.version, changed_fields: changed}}
    end
  end

  @doc "Restores one published branch Revision into the mutable Doc workspace."
  @spec restore_to_draft(Article.t(), pos_integer(), term(), Author.t(), keyword()) ::
          {:ok, DocDraft.t()} | {:error, term()}
  def restore_to_draft(
        %Article{} = article,
        branch_id,
        branch_version_id,
        %Author{} = actor,
        opts \\ []
      ) do
    with {:ok, %{version: version, revision: revision}} <-
           get(article, branch_id, branch_version_id),
         public <- Repo.get_by(DocPublic, article_id: article.id, branch_id: branch_id) do
      Store.restore_from_revision(article, revision, actor,
        branch_id: branch_id,
        base_revision_id: public_revision_id(public),
        source_version_id: version.id,
        expected_version: Keyword.get(opts, :expected_version)
      )
    end
  end

  @doc "Restores one owned immutable Revision into a Doc branch Draft."
  @spec restore_revision_to_draft(
          Article.t(),
          pos_integer(),
          Ecto.UUID.t(),
          Author.t(),
          keyword()
        ) :: {:ok, CMS.Model.DocDraft.t()} | {:error, term()}
  def restore_revision_to_draft(
        %Article{thread: :doc, id: article_id} = article,
        branch_id,
        revision_id,
        %Author{} = actor,
        opts \\ []
      ) do
    case Repo.get_by(ArticleRevision, id: revision_id, article_id: article_id) do
      %ArticleRevision{} = revision ->
        Store.restore_from_revision(
          article,
          revision,
          actor,
          opts
          |> Keyword.put(:branch_id, branch_id)
          |> Keyword.put(:base_revision_id, current_revision_id(article_id, branch_id))
        )

      nil ->
        {:error, :not_found}
    end
  end

  defp materialize(version) do
    revision = Repo.get!(ArticleRevision, version.revision_id)
    extension = Repo.get_by!(DocRevision, revision_id: revision.id)
    body = Repo.get!(ArticleBodySnapshot, revision.body_snapshot_id)

    materialized(version, revision, extension, body)
  end

  defp materialize_many([]), do: []

  defp materialize_many(versions) do
    revision_ids = Enum.map(versions, & &1.revision_id)

    revisions_by_id =
      ArticleRevision
      |> where([revision], revision.id in ^revision_ids)
      |> Repo.all()
      |> Map.new(&{&1.id, &1})

    extensions_by_revision_id =
      DocRevision
      |> where([revision], revision.revision_id in ^revision_ids)
      |> Repo.all()
      |> Map.new(&{&1.revision_id, &1})

    body_ids =
      revisions_by_id
      |> Map.values()
      |> Enum.map(& &1.body_snapshot_id)

    bodies_by_id =
      ArticleBodySnapshot
      |> where([body], body.id in ^body_ids)
      |> Repo.all()
      |> Map.new(&{&1.id, &1})

    Enum.map(versions, fn version ->
      revision = Map.fetch!(revisions_by_id, version.revision_id)
      extension = Map.fetch!(extensions_by_revision_id, revision.id)
      body = Map.fetch!(bodies_by_id, revision.body_snapshot_id)

      materialized(version, revision, extension, body)
    end)
  end

  defp materialized(version, revision, extension, body) do
    %{
      version: version,
      revision: revision,
      content: %{
        title: revision.title,
        digest: revision.digest,
        slug: revision.slug,
        subtitle: extension.subtitle,
        link_addr: extension.link_addr,
        template_key: extension.template_key,
        body_hash: body.body_hash,
        body: body,
        plain_text: body.plain_text,
        schema_version: body.schema_version
      }
    }
  end

  defp public_revision_id(nil), do: nil

  defp public_revision_id(%DocPublic{branch_version_id: version_id}) do
    Repo.get!(DocBranchVersion, version_id).revision_id
  end

  defp current_revision_id(article_id, branch_id) do
    DocPublic
    |> Repo.get_by(article_id: article_id, branch_id: branch_id)
    |> public_revision_id()
  end
end
