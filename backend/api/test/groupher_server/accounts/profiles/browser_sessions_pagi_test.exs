defmodule GroupherServer.Accounts.BrowserSessionsPagiTest do
  use GroupherServer.TestMate, async: true
  alias Accounts.Model.BrowserSession
  alias Accounts.Profiles.BrowserSessions

  defp session(user, attrs \\ %{}) do
    now = DateTime.utc_now() |> DateTime.truncate(:second)

    attrs =
      Map.merge(
        %{
          user_id: user.id,
          ref: Ecto.UUID.generate(),
          public_ref: Ecto.UUID.generate(),
          status: :active,
          absolute_expires_at: DateTime.add(now, 3600),
          last_seen_at: now
        },
        attrs
      )

    Repo.insert!(BrowserSession.changeset(%BrowserSession{}, attrs))
  end

  test "both APIs page active owned sessions and isolate account cursors" do
    {:ok, user} = db_insert(:user)
    sessions = for _ <- 1..3, do: session(user)
    current = hd(sessions)
    session(user, %{status: :revoked})

    session(user, %{
      absolute_expires_at: DateTime.add(DateTime.utc_now(), -3600) |> DateTime.truncate(:second)
    })

    {:ok, other} = db_insert(:user)
    other_session = session(other)

    assert {:ok, %{entries: first, total_count: 3}} =
             BrowserSessions.list_for_ref(current.ref, %{offset: %{page: 1, size: 2}})

    assert {:ok, %{entries: same, end_cursor: cursor, has_next_page: true}} =
             BrowserSessions.list_for_ref(current.ref, %{cursor: %{first: 2}})

    assert Enum.map(first, & &1.id) == Enum.map(same, & &1.id)

    assert {:ok, %{entries: [last], has_next_page: false}} =
             BrowserSessions.list_for_ref(current.ref, %{cursor: %{first: 2, after: cursor}})

    assert last.id == current.id
    assert last.is_current

    assert {:error, _} =
             BrowserSessions.list_for_ref(other_session.ref, %{cursor: %{first: 2, after: cursor}})
  end
end
