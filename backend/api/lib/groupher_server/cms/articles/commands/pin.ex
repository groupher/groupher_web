defmodule GroupherServer.CMS.Articles.Commands.Pin do
  @moduledoc """
  Pins one ordinary Article binding after authorization and capacity validation.

      CMS.Articles.pin -> CMS.Command -> Gate -> capacity check -> PinnedArticle
  """

  alias GroupherServer.{Accounts, CMS}
  alias Accounts.Model.User
  alias CMS.Articles.Commands.{BindingConfirmation, BindingSupport}
  alias CMS.Articles.PinPersist
  alias CMS.Command
  alias CMS.Model.Community

  @doc "Executes or replays one authorized Community-local pin command."
  def execute(community, article_id, %User{} = actor, command_id) do
    with {:ok, article} <- BindingSupport.load_article(article_id),
         {:ok, :supported} <- BindingSupport.ensure_ordinary(article) do
      %Command{
        actor: actor,
        command_id: command_id,
        operation: :article_pin,
        target: article,
        params: %{community_id: community.id}
      }
      |> Command.execute(action: &pin_action(&1, community), confirmation: BindingConfirmation)
      |> BindingSupport.present_article()
    end
  end

  defp pin_action(%{actor: actor, target: article, command_id: command_id}, community) do
    CMS.Gate.with_community_check(actor, :pin, community, article, fn canonical ->
      with %Community{} = locked_community <- PinPersist.lock_community(community.id),
           {:ok, :pass} <- ensure_capacity(locked_community.id, canonical.thread),
           {:ok, _pin} <- PinPersist.insert(canonical, locked_community) do
        {:ok, BindingSupport.confirmation(canonical, locked_community, command_id)}
      end
    end)
  end

  defp ensure_capacity(community_id, thread) do
    count = PinPersist.count(community_id, thread)

    if count < Community.max_pinned_article_count_per_thread() do
      {:ok, :pass}
    else
      {:error, CMS.Articles.ErrorCat.too_much_pinned_article("too much pinned article")}
    end
  end
end
