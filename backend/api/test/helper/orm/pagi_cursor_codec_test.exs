defmodule Helper.ORM.PagiCursorCodecTest do
  use ExUnit.Case, async: true

  alias GroupherServer.ErrorCat
  alias Helper.ORM.Pagi.CursorCodec

  @payload %{
    cursor: "flop-cursor",
    surface: "posts",
    order: %{"fields" => ["published_at", "entry_id"], "directions" => ["desc", "desc"]},
    fingerprint: "filter-fingerprint"
  }

  test "round trips an opaque cursor with its query binding" do
    assert {:ok, cursor} =
             CursorCodec.encode(@payload, current_key: "current", current_key_version: 3)

    assert {:ok,
            %{
              cursor: "flop-cursor",
              surface: "posts",
              fingerprint: "filter-fingerprint",
              key_version: 3
            }} =
             CursorCodec.decode(cursor,
               current_key: "current",
               current_key_version: 3,
               surface: "posts",
               order: @payload.order,
               fingerprint: "filter-fingerprint"
             )

    refute cursor =~ "flop-cursor"
  end

  test "tampering and query mismatch have separate stable reasons" do
    assert {:ok, cursor} = CursorCodec.encode(@payload, current_key: "current")

    tampered =
      tamper(cursor, fn envelope ->
        Map.put(envelope, "payload", %{@payload | cursor: "changed"})
      end)

    assert {:error, %ErrorCat.Error{reason: :cursor_signature_invalid}} =
             CursorCodec.decode(tampered, current_key: "current")

    assert {:error, %ErrorCat.Error{reason: :cursor_query_mismatch}} =
             CursorCodec.decode(cursor, current_key: "current", surface: "changelogs")
  end

  test "previous key versions remain decodable during rotation" do
    assert {:ok, cursor} =
             CursorCodec.encode(@payload, current_key: "old", current_key_version: 1)

    assert {:ok, %{key_version: 1}} =
             CursorCodec.decode(cursor,
               current_key: "new",
               current_key_version: 2,
               previous_keys: %{1 => "old"}
             )

    assert {:error, %ErrorCat.Error{reason: :unsupported_cursor_key}} =
             CursorCodec.decode(cursor, current_key: "new", current_key_version: 2)
  end

  test "unsupported cursor versions do not fall through to signature errors" do
    assert {:ok, cursor} = CursorCodec.encode(@payload, current_key: "current")
    unsupported = tamper(cursor, &Map.put(&1, "cursor_version", 2))

    assert {:error, %ErrorCat.Error{reason: :unsupported_cursor_version}} =
             CursorCodec.decode(unsupported, current_key: "current")
  end

  test "an explicitly missing current key fails closed" do
    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             CursorCodec.encode(@payload, current_key: nil)

    assert {:ok, cursor} = CursorCodec.encode(@payload, current_key: "configured")

    assert {:error, %ErrorCat.Error{reason: :invalid_config}} =
             CursorCodec.decode(cursor, current_key: nil)
  end

  test "an empty query fingerprint is rejected" do
    assert {:error, %ErrorCat.Error{reason: :invalid_cursor}} =
             CursorCodec.encode(%{@payload | fingerprint: ""}, current_key: "current")
  end

  defp tamper(cursor, transform) do
    {:ok, json} = Base.url_decode64(cursor, padding: false)
    {:ok, envelope} = Jason.decode(json)

    envelope
    |> transform.()
    |> Jason.encode!()
    |> Base.url_encode64(padding: false)
  end
end
