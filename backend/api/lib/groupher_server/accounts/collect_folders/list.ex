defmodule GroupherServer.Accounts.CollectFolders.List do
  @moduledoc """
  Paginates collect folders with viewer-aware privacy rules.

  Anonymous or non-owner reads only see public folders. Owner reads include
  private folders and can still apply thread filters through the folder meta
  flags.

  Business position:

      Client / Auth
        -> GraphQL or internal API
        -> Accounts facade
        -> List
        -> Repo
  """

  import Ecto.Query, warn: false

  alias GroupherServer.Accounts

  alias Accounts.Model.{CollectFolder, User}
  alias Helper.{ORM, T}
  alias Helper.ORM.Pagi.{Order, Params}

  @doc "Pages visible folders; private membership is rechecked for every request."
  @spec page(T.id(), map(), Params.t() | nil, User.t() | nil) :: tuple()
  def page(user_id, filter, pagi, viewer \\ nil) do
    owner? = match?(%User{id: ^user_id}, viewer)
    query = from(folder in CollectFolder, where: folder.user_id == ^user_id)
    query = if owner?, do: query, else: where(query, [folder], not folder.private)
    query = filter_thread_ifneed(query, filter)

    ORM.pagi(query, pagi,
      for: CollectFolder,
      order: %Order{fields: [:id], directions: [:desc], cursor_fields: [:id]},
      surface: "accounts.collect_folders",
      query_fingerprint:
        :erlang.term_to_binary({user_id, owner?, Map.get(filter, :thread)}) |> Base.encode64()
    )
  end

  defp filter_thread_ifneed(query, %{thread: thread}) do
    field_name = "has_#{thread}"
    query |> where([f], fragment("(?->>?)::boolean = ?", f.meta, ^field_name, true))
  end

  defp filter_thread_ifneed(query, _), do: query
end
