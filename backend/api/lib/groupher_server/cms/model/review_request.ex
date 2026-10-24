defmodule GroupherServer.CMS.Model.ReviewRequest do
  @moduledoc """
  Reliable CMS-owned record of one policy check for one resource scope.

      CMS content command -> ReviewRequest + Effect -> ReviewBot opinion -> CMS applies result
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User

  alias CMS.Model.{
    Article,
    ArticleRevision,
    Comment,
    Community,
    DocBranch,
    DocBranchVersion
  }

  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.cms()
  @target_types [:article, :comment, :doc]
  @states [:queued, :running, :completed, :failed]

  @type t :: %__MODULE__{}

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  schema "review_requests" do
    field(:target_type, Ecto.Enum, values: @target_types)
    belongs_to(:article, Article, type: Ecto.UUID)
    belongs_to(:comment, Comment)
    belongs_to(:branch, DocBranch)
    belongs_to(:community, Community)
    field(:review_ref, Ecto.UUID)
    belongs_to(:article_revision, ArticleRevision, type: Ecto.UUID)
    belongs_to(:branch_version, DocBranchVersion)
    field(:comment_body_version, :integer)
    field(:policy_snapshot, :map)
    field(:payload, :map)
    field(:state, Ecto.Enum, values: @states, default: :queued)
    field(:result, :map)
    belongs_to(:updated_by, User)
    field(:applied_at, :utc_datetime)
    field(:superseded_at, :utc_datetime)
    field(:payload_expires_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a one-resource, one-scope request and its terminal timestamps."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(request, attrs) do
    request
    |> cast(attrs, [
      :target_type,
      :article_id,
      :comment_id,
      :branch_id,
      :community_id,
      :review_ref,
      :article_revision_id,
      :branch_version_id,
      :comment_body_version,
      :policy_snapshot,
      :payload,
      :state,
      :result,
      :updated_by_id,
      :applied_at,
      :superseded_at,
      :payload_expires_at
    ])
    |> validate_required([
      :target_type,
      :review_ref,
      :policy_snapshot,
      :state,
      :payload_expires_at
    ])
    |> validate_target()
    |> validate_number(:comment_body_version, greater_than: 0)
    |> validate_doc_scope()
    |> foreign_key_constraint(:article_id)
    |> foreign_key_constraint(:comment_id)
    |> foreign_key_constraint(:branch_id)
    |> foreign_key_constraint(:community_id)
    |> foreign_key_constraint(:article_revision_id)
    |> foreign_key_constraint(:branch_version_id)
    |> foreign_key_constraint(:updated_by_id)
  end

  defp validate_target(changeset) do
    values = Enum.map([:article_id, :comment_id, :branch_id], &get_field(changeset, &1))
    [article_id, comment_id, branch_id] = values

    case get_field(changeset, :target_type) do
      :article when not is_nil(article_id) and is_nil(comment_id) and is_nil(branch_id) ->
        require_version(changeset, :article_revision_id, [
          :comment_body_version,
          :branch_version_id
        ])

      :comment when is_nil(article_id) and not is_nil(comment_id) and is_nil(branch_id) ->
        changeset
        |> validate_required([:comment_body_version])
        |> reject_present([:article_revision_id, :branch_version_id])

      :doc
      when not is_nil(article_id) and is_nil(comment_id) and not is_nil(branch_id) ->
        require_version(changeset, :branch_version_id, [
          :article_revision_id,
          :comment_body_version
        ])

      _ ->
        add_error(changeset, :target_type, "does not match resource references")
    end
  end

  defp validate_doc_scope(changeset) do
    if get_field(changeset, :target_type) == :doc and
         not is_nil(get_field(changeset, :community_id)) do
      add_error(changeset, :community_id, "Doc requests use the platform scope")
    else
      changeset
    end
  end

  defp require_version(changeset, required, forbidden) do
    changeset
    |> validate_required([required])
    |> reject_present(forbidden)
  end

  defp reject_present(changeset, fields) do
    Enum.reduce(fields, changeset, fn field, changeset ->
      if is_nil(get_field(changeset, field)) do
        changeset
      else
        add_error(changeset, field, "does not match resource version type")
      end
    end)
  end
end
