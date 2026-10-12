defmodule GroupherServer.Accounts.Model.CollectFolder do
  @moduledoc """
  Ecto schema for user-owned collect folders.

  The folder stores embedded article collect refs plus denormalized meta so the
  account collection UI can page folders and mixed-thread contents efficiently.

  Business position:

      Accounts context
        -> CollectFolder schema/changeset
        -> GroupherServer.Repo
        -> PostgreSQL
  """

  use Ecto.Schema
  use Accessible

  import Ecto.Changeset

  alias __MODULE__
  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.{Embeds, User}
  alias CMS.Model.ArticleCollect
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.account()

  @required_fields ~w(user_id title)a
  @optional_fields ~w(index total_count private desc last_updated)a

  @type t :: %CollectFolder{}
  schema "collect_folders" do
    belongs_to(:user, User, foreign_key: :user_id)
    # has_many(:posts, ...)

    field(:title, :string)
    field(:desc, :string)
    field(:index, :integer)
    field(:total_count, :integer, default: 0)
    field(:private, :boolean, default: false)
    # Tracks the most recent change to the folder's collected items.
    field(:last_updated, :utc_datetime)

    # Embedded projections keep folder summaries and collected Article refs
    # available without exposing CMS persistence operations to Accounts.
    embeds_one(:meta, Embeds.CollectFolderMeta, on_replace: :delete)
    embeds_many(:collects, ArticleCollect, on_replace: :delete)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(%CollectFolder{} = collect_folder, attrs) do
    collect_folder
    |> cast(attrs, @optional_fields ++ @required_fields)
    |> validate_required(@required_fields)
    |> cast_embed(:meta, required: true, with: &Embeds.CollectFolderMeta.changeset/2)
    |> validate_length(:title, min: 1)
    |> foreign_key_constraint(:user_id)
  end

  @doc false
  def update_changeset(%CollectFolder{} = collect_folder, attrs) do
    collect_folder
    |> cast(attrs, @optional_fields ++ @required_fields)
    |> cast_embed(:collects, with: &CMS.article_collect_changeset/2)
    |> cast_embed(:meta, with: &Embeds.CollectFolderMeta.changeset/2)
    |> validate_length(:title, min: 1)
    |> foreign_key_constraint(:user_id)
  end
end
