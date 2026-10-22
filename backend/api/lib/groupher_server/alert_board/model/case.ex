defmodule GroupherServer.AlertBoard.Model.Case do
  @moduledoc """
  Current human work item for one target, scope and content token.

      policy/report signal -> open Case -> immutable Decisions -> resolved Case
  """

  use Ecto.Schema
  use Flop.Schema

  import Ecto.Changeset
  alias GroupherServer.{Accounts, AlertBoard, CMS}

  alias Accounts.Model.User
  alias AlertBoard.Model.{Decision, Report}
  alias CMS.Model.{Article, Comment, DocBranch}
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_board()
  @flop_options [filterable: [], sortable: [:inserted_at, :id], pagination_types: [:page, :first]]
  @statuses [:open, :resolved, :superseded]
  @priorities [:normal, :high]

  @type t :: %__MODULE__{}

  schema "cases" do
    field(:target_key, :string)
    belongs_to(:article, Article, type: Ecto.UUID)
    belongs_to(:comment, Comment)
    belongs_to(:user, User)
    belongs_to(:branch, DocBranch)
    field(:scope_key, :string)
    field(:content_token, :string)
    field(:status, Ecto.Enum, values: @statuses, default: :open)
    field(:priority, Ecto.Enum, values: @priorities, default: :normal)
    field(:resolution, :string)
    field(:version, :integer, default: 1)
    field(:opened_at, :utc_datetime)
    field(:resolved_at, :utc_datetime)
    timestamps(type: :utc_datetime)
    has_many(:reports, Report, foreign_key: :case_id)
    has_many(:decisions, Decision, foreign_key: :case_id)
  end

  @doc "Validates target identity and state for an AlertBoard Case."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = case_record, attrs) do
    case_record
    |> cast(attrs, [
      :target_key,
      :article_id,
      :comment_id,
      :user_id,
      :branch_id,
      :scope_key,
      :content_token,
      :status,
      :priority,
      :resolution,
      :version,
      :opened_at,
      :resolved_at
    ])
    |> validate_required([
      :target_key,
      :scope_key,
      :content_token,
      :status,
      :priority,
      :version,
      :opened_at
    ])
    |> validate_target()
    |> validate_target_key()
    |> validate_number(:version, greater_than: 0)
    |> foreign_key_constraint(:branch_id)
    |> unique_constraint([:target_key, :scope_key, :content_token],
      name: :cases_one_open_target_scope_token_index
    )
    |> foreign_key_constraint(:article_id)
    |> foreign_key_constraint(:comment_id)
    |> foreign_key_constraint(:user_id)
  end

  defp validate_target(changeset) do
    ids =
      Enum.count([:article_id, :comment_id, :user_id], &(not is_nil(get_field(changeset, &1))))

    if ids == 1 do
      changeset
    else
      add_error(changeset, :target_key, "must identify exactly one target")
    end
  end

  defp validate_target_key(changeset) do
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
