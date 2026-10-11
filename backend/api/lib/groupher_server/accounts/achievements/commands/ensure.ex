defmodule GroupherServer.Accounts.Achievements.Commands.Ensure do
  @moduledoc """
  Owns achievement projection initialization for one account.

      Accounts registration -> Achievements facade -> Ensure -> Persist
  """

  alias GroupherServer.Accounts
  alias Accounts.Achievements.Persist
  alias Accounts.Model.Achievement

  @doc """
  Ensures one user's achievement projection exists.

  ## Examples

      Accounts.Achievements.Commands.Ensure.run(user_id)
  """
  @spec run(integer()) :: {:ok, Achievement.t()} | {:error, term()}
  def run(user_id) when is_integer(user_id), do: Persist.ensure(user_id)
end
