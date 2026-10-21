defmodule GroupherServer.CMS.Communities.Categories.Workflow do
  @moduledoc """
  Legacy compatibility boundary for community category writes.

  The direct ORM workflow was retired in favor of the existing Category
  Commands. Callers that still use an implicit-identity arity receive the
  explicit `command_id_required` error; command-aware arities delegate to the
  corresponding receipt pipeline.

      legacy facade -> Categories.Workflow compatibility -> Category Command
  """

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Model.User
  alias CMS.Communities.Categories.Commands.{Create, Delete, Set, Unset, Update}
  alias CMS.Model.{Category, Community}
  alias Helper.T

  @doc "Rejects the removed implicit-identity create arity."
  @spec create(map(), User.t()) :: T.domain_res(Category.t())
  def create(_attrs, %User{}), do: {:error, CMS.ErrorCat.command_id_required()}

  @doc "Creates a category through the canonical receipt pipeline."
  @spec create(map(), User.t(), Ecto.UUID.t()) :: T.domain_res(Category.t())
  def create(%{community: community} = attrs, %User{} = user, command_id) do
    Create.execute(community, attrs, user, command_id)
  end

  @doc "Rejects the removed implicit-identity update arities."
  @spec update(String.t(), map()) :: T.domain_res(Category.t())
  def update(_community, _attrs), do: {:error, CMS.ErrorCat.command_id_required()}

  @spec update(map()) :: T.domain_res(Category.t())
  def update(_attrs), do: {:error, CMS.ErrorCat.command_id_required()}

  @doc "Updates a category through the canonical receipt pipeline."
  @spec update(String.t(), map(), User.t(), Ecto.UUID.t()) :: T.domain_res(Category.t())
  def update(community, attrs, %User{} = user, command_id) do
    Update.execute(community, attrs, user, command_id)
  end

  @doc "Rejects the removed implicit-identity delete arity."
  @spec delete(String.t(), T.id()) :: T.domain_res(Category.t())
  def delete(_community, _id), do: {:error, CMS.ErrorCat.command_id_required()}

  @doc "Deletes a category through the canonical receipt pipeline."
  @spec delete(String.t(), T.id(), User.t(), Ecto.UUID.t()) :: T.domain_res(Category.t())
  def delete(community, id, %User{} = user, command_id) do
    Delete.execute(community, id, user, command_id)
  end

  @doc "Rejects the removed implicit-identity category binding arity."
  @spec set(Community.t(), Category.t()) :: T.domain_res(Community.t())
  def set(%Community{}, %Category{}), do: {:error, CMS.ErrorCat.command_id_required()}

  @doc "Associates a category through the canonical receipt pipeline."
  @spec set(Community.t() | String.t(), T.id(), User.t(), Ecto.UUID.t()) ::
          T.domain_res(Community.t())
  def set(community, category_id, %User{} = user, command_id) do
    Set.execute(community, category_id, user, command_id)
  end

  @doc "Rejects the removed implicit-identity category binding arity."
  @spec unset(Community.t(), Category.t()) :: T.domain_res(Community.t())
  def unset(%Community{}, %Category{}), do: {:error, CMS.ErrorCat.command_id_required()}

  @doc "Removes a category binding through the canonical receipt pipeline."
  @spec unset(Community.t() | String.t(), T.id(), User.t(), Ecto.UUID.t()) ::
          T.domain_res(Community.t())
  def unset(community, category_id, %User{} = user, command_id) do
    Unset.execute(community, category_id, user, command_id)
  end
end
