defmodule GroupherServer.CMS.Comments.Commands.Reply do
  @moduledoc """
  Creates a reply from a canonical parent Comment target.

      parent Comment -> CMS.Command receipt -> canonical aggregate write
  """

  alias GroupherServer.CMS.Comments.Commands.Create
  alias GroupherServer.Accounts.Model.User
  alias GroupherServer.CMS.Model.Comment

  @spec execute(Comment.t(), String.t(), User.t(), String.t() | nil) ::
          {:ok, map()} | {:error, term()}
  def execute(%Comment{} = comment, body, %User{} = user, command_id) do
    case Create.reply(comment, body, user, command_id) do
      {:ok, result} -> {:ok, result}
      {:error, reason} -> {:error, reason}
    end
  end
end
