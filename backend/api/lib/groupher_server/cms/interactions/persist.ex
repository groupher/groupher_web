defmodule GroupherServer.CMS.Interactions.Persist do
  @moduledoc """
  Owns Interaction fact-row primitives and the published collect-folder
  projection contract used by Accounts.CollectFolders.

      Reactions.Command action
        -> Gate / policy / state projection
        -> Interactions.Persist fact row / projection
        -> Effects intent
  """

  alias GroupherServer.{Accounts, CMS, Repo}

  alias CMS.Interactions.ErrorCat
  alias Accounts.Model.{CollectFolder, User}
  alias CMS.Artiment.Matcher
  alias CMS.Model.ArticleCollect
  alias Helper.ORM

  @doc """
  Finds the canonical ArticleCollect fact for an Article and account.

  This is a published CMS interaction row contract for contexts such as
  Accounts.CollectFolders; callers do not need to reach into the CMS model.

  ## Examples

      CMS.Interactions.Persist.find_collect(article, user)
  """
  @spec find_collect(struct(), User.t()) :: {:ok, ArticleCollect.t()} | {:error, term()}
  def find_collect(article, %User{id: user_id}) do
    with {:ok, %{artiment: thread, foreign_key: foreign_key}} <-
           Matcher.match_interaction(article) do
      %{user_id: user_id, thread: thread}
      |> Map.put(foreign_key, article.id)
      |> then(&ORM.find_by(ArticleCollect, &1))
    end
  end

  @doc """
  Adds an Accounts collect-folder projection to an ArticleCollect row.

  The caller owns the transaction. This explicit primitive lets the Accounts
  collect-folder command update CMS-owned interaction state without reaching
  through the CMS model or Repo directly.

  ## Examples

      CMS.Interactions.Persist.attach_collect_folder(article_collect, folder)
  """
  @spec attach_collect_folder(ArticleCollect.t(), CollectFolder.t()) ::
          {:ok, ArticleCollect.t()} | {:error, term()}
  def attach_collect_folder(%ArticleCollect{} = collect, %CollectFolder{} = folder) do
    collect_folders = Enum.uniq(collect.collect_folders ++ [folder])
    ORM.update_embed(collect, :collect_folders, collect_folders)
  end

  @doc """
  Removes an Accounts collect-folder projection from an ArticleCollect row.

  The caller owns the transaction. When the row has no remaining folder
  projection, the operation is a no-op because the CMS collect command may
  remove the ArticleCollect fact in the same transaction.

  ## Examples

      CMS.Interactions.Persist.detach_collect_folder(article_collect, folder)
  """
  @spec detach_collect_folder(ArticleCollect.t(), CollectFolder.t()) ::
          {:ok, ArticleCollect.t() | :pass} | {:error, term()}
  def detach_collect_folder(%ArticleCollect{} = collect, %CollectFolder{} = folder) do
    collect_folders = Enum.reject(collect.collect_folders, &(&1.id == folder.id))

    case collect_folders do
      [] -> {:ok, :pass}
      _ -> ORM.update_embed(collect, :collect_folders, collect_folders)
    end
  end

  @doc """
  Inserts one idempotent interaction fact and returns its change outcome.

  ## Examples

      CMS.Interactions.Persist.insert_fact(
        CMS.Model.ArticleUpvote,
        %{article_id: "article-1", user_id: 1},
        [:article_id, :user_id],
        "upvote"
      )
  """
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

  @doc """
  Deletes one interaction fact query and returns its change outcome.

  ## Examples

      CMS.Interactions.Persist.delete_fact(query, "upvote")
  """
  @spec delete_fact(Ecto.Queryable.t(), String.t()) ::
          {:ok, :changed | :unchanged} | {:error, term()}
  def delete_fact(query, fact_name) do
    case Repo.delete_all(query) do
      {1, _rows} -> {:ok, :changed}
      {0, _rows} -> {:ok, :unchanged}
      _ -> {:error, ErrorCat.interaction_state_conflict("multiple #{fact_name} facts deleted")}
    end
  end

  @doc """
  Inserts a non-set interaction fact through the current transaction.

  ## Examples

      CMS.Interactions.Persist.insert(changeset)
  """
  def insert(changeset), do: Repo.insert(changeset)

  @doc """
  Updates a non-set interaction fact through the current transaction.

  ## Examples

      CMS.Interactions.Persist.update(changeset)
  """
  def update(changeset), do: Repo.update(changeset)

  @doc """
  Deletes a non-set interaction fact through the current transaction.

  ## Examples

      CMS.Interactions.Persist.delete(record)
  """
  def delete(record), do: Repo.delete(record)
end
