defmodule GroupherServer.Accounts.Model.CollectFolderEntry do
  @moduledoc """
  Owns one stable collection-folder display entry.

  A folder entry is a binding path, not merely an Article identity. This keeps
  pagination, count, and cursor tie-breaking aligned with the path the user
  actually collected.

      CollectFolder
        -> CollectFolderEntry(folder, article, binding)
        -> public ArticleLite path
  """

  use Ecto.Schema
  use Flop.Schema

  @flop_options [filterable: [], sortable: [:id, :inserted_at], pagination_types: [:page, :first]]

  import Ecto.Changeset

  alias GroupherServer.Accounts.Model.CollectFolder
  alias GroupherServer.CMS.Model.{Article, ArticleBinding}
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.account()
  @required_fields ~w(folder_id article_id article_binding_id)a

  @type t :: %__MODULE__{}

  schema "collect_folder_entries" do
    belongs_to(:folder, CollectFolder)
    belongs_to(:article, Article, type: Ecto.UUID)
    belongs_to(:article_binding, ArticleBinding)
    timestamps(type: :utc_datetime, updated_at: false)
  end

  @doc """
  Builds one binding-scoped collection-folder entry.

  ## Examples

      iex> CollectFolderEntry.changeset(%CollectFolderEntry{}, %{folder_id: 1, article_id: "00000000-0000-0000-0000-000000000001", article_binding_id: 2})
      %Ecto.Changeset{}
  """
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = entry, attrs) do
    entry
    |> cast(attrs, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:folder_id)
    |> foreign_key_constraint(:article_id)
    |> foreign_key_constraint(:article_binding_id)
    |> unique_constraint([:folder_id, :article_binding_id],
      name: :collect_folder_entries_folder_binding_index
    )
  end
end
