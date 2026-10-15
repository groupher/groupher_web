defmodule GroupherServer.CMS.Articles.Commands.Unpin do
  @moduledoc """
  Removes one Community-local ordinary Article pin.

      CMS.Articles.undo_pin -> CMS.Command -> Gate -> delete PinnedArticle -> done
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Articles.Commands.{BindingConfirmation, BindingSupport}
  alias CMS.Articles.PinPersist
  alias CMS.Command

  @doc "Executes or replays one authorized Community-local unpin command."
  def execute(community, article_id, %User{} = actor, command_id) do
    with {:ok, article} <- BindingSupport.load_article(article_id),
         {:ok, :supported} <- BindingSupport.ensure_ordinary(article) do
      %Command{
        actor: actor,
        command_id: command_id,
        operation: :article_unpin,
        target: article,
        params: %{community_id: community.id}
      }
      |> Command.execute(action: &unpin_action(&1, community), confirmation: BindingConfirmation)
      |> BindingSupport.present_done()
    end
  end

  defp unpin_action(%{actor: actor, target: article, command_id: command_id}, community) do
    CMS.Gate.with_community_check(actor, :unpin, community, article, fn canonical ->
      with {:ok, :done} <- PinPersist.delete(canonical.id, community.id) do
        {:ok, BindingSupport.confirmation(canonical, community, command_id)}
      end
    end)
  end
end
