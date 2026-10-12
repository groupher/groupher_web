defmodule GroupherServer.Accounts.Fans.ViewerState do
  @moduledoc """
  Adds viewer relationship state to paged user results.

  The base list query returns users only. This helper derives
  `viewer_has_followed` and `viewer_been_followed` from the current viewer meta
  so GraphQL fields can stay flat.

  Business position:

      Fans.List -> Fans.ViewerState -> flattened viewer flags
  """

  alias GroupherServer.Accounts

  alias Accounts.Model.User

  @doc """
  Adds viewer relationship flags to a paged user result.

  ## Examples

      Accounts.Fans.ViewerState.mark_viewer_follow_status({:ok, page}, viewer)
  """
  def mark_viewer_follow_status({:ok, %{entries: entries} = paged_users}, cur_user) do
    entries = Enum.map(entries, &Map.merge(&1, do_mark_viewer_has_states(&1.id, cur_user)))
    Map.merge(paged_users, %{entries: entries})
  end

  def mark_viewer_follow_status({:error, reason}, _cur_user), do: {:error, reason}

  defp do_mark_viewer_has_states(_user_id, %User{meta: nil}) do
    %{viewer_been_followed: false, viewer_has_followed: false}
  end

  defp do_mark_viewer_has_states(user_id, %User{meta: meta}) do
    %{
      viewer_been_followed: Enum.member?(meta.follower_user_ids, user_id),
      viewer_has_followed: Enum.member?(meta.following_user_ids, user_id)
    }
  end
end
