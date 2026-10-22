defmodule GroupherServer.AlertBoard.Model.RuleSet do
  @moduledoc """
  Immutable versioned word, prompt and provider rules for one review scope.

      UpdateConfig -> new RuleSet version -> future submissions pin this row
  """

  use Ecto.Schema

  import Ecto.Changeset
  alias GroupherServer.{Accounts}

  alias Accounts.Model.User
  alias Helper.Constant.DBPrefix

  @schema_prefix DBPrefix.alert_board()
  @required_fields ~w(scope_key version rules created_by_id operation_ref)a
  @optional_fields ~w(prompt provider_profile required_modalities)a

  @type t :: %__MODULE__{}

  schema "rule_sets" do
    field(:scope_key, :string)
    field(:version, :integer)
    field(:rules, :map, default: %{"items" => []})
    field(:prompt, :string)
    field(:provider_profile, :string)
    field(:required_modalities, {:array, :string}, default: [])
    belongs_to(:created_by, User)
    field(:operation_ref, Ecto.UUID)
    timestamps(type: :utc_datetime)
  end

  @doc "Validates a new immutable word/model ruleset version."
  @spec changeset(t(), map()) :: Ecto.Changeset.t()
  def changeset(%__MODULE__{} = rule_set, attrs) do
    rule_set
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> validate_number(:version, greater_than: 0)
    |> validate_scope()
    |> validate_rules()
    |> validate_length(:prompt, max: 8_000)
    |> validate_change(:required_modalities, fn :required_modalities, values ->
      if Enum.all?(values, &(&1 in ["text", "image"])) do
        []
      else
        [required_modalities: "contains unsupported modality"]
      end
    end)
    |> unique_constraint([:scope_key, :version])
    |> unique_constraint(:operation_ref)
    |> foreign_key_constraint(:created_by_id)
  end

  defp validate_scope(changeset) do
    scope_key = get_field(changeset, :scope_key)

    if scope_key == "platform" or
         (is_binary(scope_key) and Regex.match?(~r/^community:[1-9][0-9]*$/, scope_key)) do
      changeset
    else
      add_error(changeset, :scope_key, "is invalid")
    end
  end

  defp validate_rules(changeset) do
    validate_change(changeset, :rules, fn :rules, rules ->
      items = Map.get(rules, "items", Map.get(rules, :items))

      cond do
        not is_list(items) -> [rules: "must contain an items list"]
        length(items) > 10_000 -> [rules: "contains too many rules"]
        not Enum.all?(items, &valid_rule?/1) -> [rules: "contains an invalid rule"]
        duplicate_rule_ids?(items) -> [rules: "contains duplicate rule identifiers"]
        true -> []
      end
    end)
  end

  defp duplicate_rule_ids?(items) do
    ids = Enum.map(items, &Map.get(&1, "id", Map.get(&1, :id)))
    length(ids) != length(Enum.uniq(ids))
  end

  defp valid_rule?(rule) when is_map(rule) do
    id = Map.get(rule, "id", Map.get(rule, :id))
    kind = Map.get(rule, "kind", Map.get(rule, :kind))
    value = Map.get(rule, "value", Map.get(rule, :value))
    category = Map.get(rule, "category", Map.get(rule, :category))
    action = Map.get(rule, "action", Map.get(rule, :action))

    value_limit = if kind == "word", do: 128, else: 8_000

    is_binary(id) and id != "" and kind in ["word", "judge"] and is_binary(value) and
      String.trim(value) != "" and String.length(value) <= value_limit and is_binary(category) and
      category != "" and action in ["restrict", "review"] and
      (kind == "judge" or action == "restrict")
  end

  defp valid_rule?(_rule), do: false
end
