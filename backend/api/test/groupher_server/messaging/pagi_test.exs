defmodule GroupherServer.Test.Messaging.Pagi do
  use GroupherServer.TestMate

  alias GroupherServer.Messaging
  alias Helper.ORM.Pagi.{Page, Params}

  for type <- [:mention, :notification] do
    @message_type type
    test "#{type} pages support both APIs and bind cursor to recipient and filter" do
      {:ok, user} = db_insert(:user)
      {:ok, actor} = db_insert(:user)
      {:ok, other} = db_insert(:user)

      for _ <- 1..3 do
        case @message_type do
          :mention -> mock_mention_for(user, actor)
          :notification -> mock_notification_for(user, actor)
        end
      end

      assert {:ok, %Page.Offset{total_count: 3, entries: expected}} =
               Messaging.paged_messages(@message_type, user, %{}, %Params.Offset{page: 1, size: 3})

      assert {:ok, %Page.Cursor{entries: first, has_next_page: true, end_cursor: cursor}} =
               Messaging.paged_messages(@message_type, user, %{}, %Params.Cursor{first: 2})

      assert {:ok, %Page.Cursor{entries: last, has_next_page: false}} =
               Messaging.paged_messages(@message_type, user, %{}, %Params.Cursor{
                 first: 2,
                 after: cursor
               })

      assert Enum.map(first ++ last, & &1.id) == Enum.map(expected, & &1.id)

      assert {:error, _} =
               Messaging.paged_messages(@message_type, other, %{}, %Params.Cursor{
                 first: 2,
                 after: cursor
               })

      assert {:error, _} =
               Messaging.paged_messages(@message_type, user, %{read: true}, %Params.Cursor{
                 first: 2,
                 after: cursor
               })

      assert {:ok, %Page.Cursor{entries: [], end_cursor: nil, has_next_page: false}} =
               Messaging.paged_messages(@message_type, other, %{}, %Params.Cursor{first: 2})
    end
  end
end
