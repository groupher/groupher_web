defmodule GroupherServer.AlertBoard.Model.Report do
  @moduledoc """
  A reporter's active or withdrawn fact linked to an AlertBoard Case.

      authorized submit/withdraw -> Report fact + projection in one transaction
  """

  use Ecto.Schema
  use Flop.Schema

  import Ecto.Changeset
  alias GroupherServer.{Accounts, AlertBoard, CMS}

  alias Accounts.Model.User
  alias AlertBoard.Model.Case
  alias CMS.Model.{Article, Comment, DocBranch}
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_board()
  @flop_options [filterable: [], sortable: [:inserted_at, :id], pagination_types: [:page, :first]]

  @type t :: %__MODULE__{}

  schema "reports" do
    field(:target_key, :string)
    belongs_to(:article, Article, type: Ecto.UUID)
    belongs_to(:comment, Comment)
    belongs_to(:user, User)
    belongs_to(:branch, DocBranch)
    field(:scope_key, :string)
    field(:content_token, :string)
    belongs_to(:reporter, User)
    belongs_to(:case, Case)
    field(:reason_code, :string)
    field(:details, :string)
    field(:operation_ref, Ecto.UUID)
    field(:withdrawn_at, :utc_datetime)
    field(:target_deleted_at, :utc_datetime)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a typed report target, reporter, reason and idempotency identity."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = report, attrs) do
    report
    |> cast(attrs, [
      :target_key,
      :article_id,
      :comment_id,
      :user_id,
      :branch_id,
      :scope_key,
      :content_token,
      :reporter_id,
      :case_id,
      :reason_code,
      :details,
      :operation_ref,
      :withdrawn_at
    ])
    |> validate_required([
      :target_key,
      :scope_key,
      :content_token,
      :reporter_id,
      :case_id,
      :reason_code,
      :operation_ref
    ])
    |> validate_length(:details, max: 4_000)
    |> validate_target()
    |> validate_target_key()
    |> unique_constraint([:target_key, :scope_key, :reporter_id],
      name: :reports_one_active_per_reporter_index
    )
    |> unique_constraint(:operation_ref)
    |> foreign_key_constraint(:reporter_id)
    |> foreign_key_constraint(:case_id)
    |> foreign_key_constraint(:article_id)
    |> foreign_key_constraint(:comment_id)
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:branch_id)
  end

  defp validate_target(changeset) do
    if get_field(changeset, :target_deleted_at) do
      changeset
    else
      ids =
        Enum.count([:article_id, :comment_id, :user_id], &(not is_nil(get_field(changeset, &1))))

      if ids == 1 do
        changeset
      else
        add_error(changeset, :target_key, "must identify exactly one target")
      end
    end
  end

  defp validate_target_key(changeset) do
    if get_field(changeset, :target_deleted_at) do
      changeset
    else
      validate_live_target_key(changeset)
    end
  end

  defp validate_live_target_key(changeset) do
    target_key = get_field(changeset, :target_key)

    expected =
      cond do
        article_id = get_field(changeset, :article_id) ->
          case get_field(changeset, :branch_id) do
            nil -> "article:#{article_id}"
            branch_id -> "doc:#{article_id}:#{branch_id}"
          end

        comment_id = get_field(changeset, :comment_id) ->
          "comment:#{comment_id}"

        user_id = get_field(changeset, :user_id) ->
          "user:#{user_id}"

        true ->
          nil
      end

    if target_key == expected do
      changeset
    else
      add_error(changeset, :target_key, "does not match the typed target")
    end
  end
end
