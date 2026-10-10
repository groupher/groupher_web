defmodule GroupherServer.CMS.Interactions.Persist do
  @moduledoc """
  Owns Interaction fact-row primitives.

      Reactions.Command action
        -> Gate / policy / state projection
        -> Interactions.Persist fact row
        -> Effects intent
  """

  alias GroupherServer.Repo
  alias GroupherServer.CMS.Interactions.ErrorCat

  @doc "Inserts one idempotent interaction fact and returns its change outcome."
  @spec insert_fact(module(), map(), term(), String.t()) ::
          {:ok, :changed | :unchanged} | {:error, term()}
  def insert_fact(schema, attrs, conflict_target, fact_name) do
    now = DateTime.utc_now(:second)
    attrs = Map.merge(attrs, %{inserted_at: now, updated_at: now})

    case Repo.insert_all(schema, [attrs],
           on_conflict: :nothing,
           conflict_target: conflict_target
         ) do
      {1, _rows} -> {:ok, :changed}
      {0, _rows} -> {:ok, :unchanged}
      _ -> {:error, ErrorCat.interaction_state_conflict("unexpected #{fact_name} insert result")}
    end
  end

  @doc "Deletes one interaction fact query and returns its change outcome."
  @spec delete_fact(Ecto.Queryable.t(), String.t()) ::
          {:ok, :changed | :unchanged} | {:error, term()}
  def delete_fact(query, fact_name) do
    case Repo.delete_all(query) do
      {1, _rows} -> {:ok, :changed}
      {0, _rows} -> {:ok, :unchanged}
      _ -> {:error, ErrorCat.interaction_state_conflict("multiple #{fact_name} facts deleted")}
    end
  end

  @doc "Inserts a non-set interaction fact through the current transaction."
  def insert(changeset), do: Repo.insert(changeset)

  @doc "Updates a non-set interaction fact through the current transaction."
  def update(changeset), do: Repo.update(changeset)

  @doc "Deletes a non-set interaction fact through the current transaction."
  def delete(record), do: Repo.delete(record)
end
