defmodule GroupherServer.CMS.Model.CommentBody do
  @moduledoc """
  Canonical, versioned BodyBag persistence owned by one Comment.

      Comment write command
        -> CommentBody changeset
        -> cms.comment_bodies
  """

  use Ecto.Schema
  import Ecto.Changeset

  alias GroupherServer.CMS.Model.Comment
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.cms()
  @fields ~w(json markdown markdown_toc html plain_text digest body_hash schema_version)a

  schema "comment_bodies" do
    belongs_to(:comment, Comment)
    field(:json, :string)
    field(:markdown, :string)
    field(:markdown_toc, {:array, :map}, default: [])
    field(:html, :string)
    field(:plain_text, :string)
    field(:digest, :string)
    field(:body_hash, :string)
    field(:schema_version, :integer)
    field(:version, :integer, default: 1)
    timestamps(type: :utc_datetime)
  end

  def changeset(body, attrs) do
    body
    |> cast(attrs, [:comment_id, :version | @fields])
    |> validate_required([:comment_id, :version | @fields])
    |> unique_constraint(:comment_id)
  end

  @doc "Validates updates to the canonical Comment body row."
  def update_changeset(body, attrs), do: changeset(body, attrs)
end
