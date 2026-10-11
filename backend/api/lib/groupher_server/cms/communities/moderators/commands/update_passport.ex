defmodule GroupherServer.CMS.Communities.Moderators.Commands.UpdatePassport do
  @moduledoc """
  Replaces one moderator's community passport through a Receipt Command.

      updateModeratorPassport(commandId)
        -> UpdatePassport Command
        -> Gate / passport community match
        -> Confirmation
  """

  alias GroupherServer.{CMS, Accounts}

  alias Accounts.Model.User
  alias CMS.Communities.Moderators.{Persist, Commands.Support}
  alias CMS.Model.Community
  alias Helper.T

  @spec execute(Community.t(), map(), User.t(), User.t(), Ecto.UUID.t()) ::
          T.domain_res(Community.t())
  def execute(
        %Community{} = community,
        rules,
        %User{} = target,
        %User{} = actor,
        command_id
      ) do
    Support.execute(
      :moderator_update,
      community,
      actor,
      %{target_user_id: target.id, rules: rules},
      command_id,
      fn canonical ->
        Persist.update_passport(
          canonical,
          rules,
          target
        )
      end
    )
  end
end
