defmodule GroupherServer.AlertBoard.Model.ReviewConfig do
  @moduledoc """
  Versioned publication and checking settings for one platform/community subject.

      authorized settings command -> expected version check -> ReviewConfig row
  """

  use Ecto.Schema

  import Ecto.Changeset
  alias GroupherServer.{AlertBoard, CMS}

  alias CMS.Model.Community
  alias AlertBoard.Model.RuleSet
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_board()
  @subjects [:article, :comment, :doc]
  @publish_modes [:immediate, :ai_first, :human_first]
  @edit_modes [:immediate, :ai_first]

  @type t :: %__MODULE__{}

  schema "review_configs" do
    field(:scope_key, :string)
    belongs_to(:community, Community)
    field(:subject_kind, Ecto.Enum, values: @subjects)
    field(:version, :integer, default: 1)
    field(:publish_mode, Ecto.Enum, values: @publish_modes, default: :immediate)
    field(:edit_mode, Ecto.Enum, values: @edit_modes, default: :immediate)
    field(:background_check, :boolean, default: false)
    belongs_to(:ruleset, RuleSet)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a scoped review configuration and its product modes."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = config, attrs) do
    config
    |> cast(attrs, [
      :scope_key,
      :community_id,
      :subject_kind,
      :version,
      :publish_mode,
      :edit_mode,
      :background_check,
      :ruleset_id
    ])
    |> validate_required([:scope_key, :subject_kind, :version, :publish_mode, :edit_mode])
    |> validate_number(:version, greater_than: 0)
    |> validate_scope()
    |> validate_doc_modes()
    |> unique_constraint([:scope_key, :subject_kind])
    |> foreign_key_constraint(:community_id)
    |> foreign_key_constraint(:ruleset_id)
  end

  defp validate_doc_modes(changeset) do
    if get_field(changeset, :subject_kind) == :doc and
         (get_field(changeset, :publish_mode) != :immediate or
            get_field(changeset, :edit_mode) != :immediate) do
      add_error(changeset, :publish_mode, "Doc checks run after the admin publish")
    else
      changeset
    end
  end

  defp validate_scope(changeset) do
    scope_key = get_field(changeset, :scope_key)
    community_id = get_field(changeset, :community_id)

    cond do
      scope_key == "platform" and is_nil(community_id) ->
        changeset

      is_integer(community_id) and scope_key == "community:#{community_id}" and
          get_field(changeset, :subject_kind) != :doc ->
        changeset

      true ->
        add_error(changeset, :scope_key, "does not match community scope")
    end
  end
end
