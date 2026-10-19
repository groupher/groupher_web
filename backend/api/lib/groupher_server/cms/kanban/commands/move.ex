defmodule GroupherServer.CMS.Kanban.Commands.Move do
  @moduledoc """
    Moves an existing Community-local Kanban Article between statuses.

        ArticleBinding binding
          -> Gate admission
          -> KanbanState status update
  """

  alias GroupherServer.{Accounts, CMS}

  alias CMS.Articles.States
  alias CMS.Kanban.Query
  alias CMS.Model.{Article, Community}
  alias Accounts.Model.User
  alias Helper.T

  use GroupherServer.CommandPipeline,

    adapter: GroupherServer.CMS.CommandPipelineAdapter
  @pipeline operation: :kanban_move, target: :article
  direct_pipeline execute_pipeline(community, article, status, actor) do
    prepare(fn ->
      case Query.ensure_membership(article, community) do
        {:ok, _state} -> {:ok, article}
        {:error, reason} -> {:error, reason}
      end
    end)

    gate(fn canonical ->
      CMS.Gate.check_in_transaction(actor, :set_status, canonical, community)
    end)

    change(fn canonical -> States.set_status(canonical, status, community.id) end)
  end

  @spec execute(Community.t(), Article.t(), atom(), User.t()) :: T.domain_res(Article.t())
  def execute(%Community{} = community, %Article{} = article, status, %User{} = actor)
      when is_atom(status) do
    execute_pipeline(community, article, status, actor)
  end
end
