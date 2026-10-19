defmodule GroupherServer.CMS.Kanban.Commands.Remove do
  @moduledoc """
    Removes an Article from a Community-local Kanban while preserving its ArticleBinding binding.

        ArticleBinding binding
          -> Gate admission
          -> delete KanbanState
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{Accounts, CMS}

  alias CMS.Articles.States
  alias CMS.Model.{Article, Community}
  alias Accounts.Model.User
  alias Helper.T

  @pipeline operation: :kanban_remove, target: :article
  direct_pipeline execute_pipeline(community, article, actor) do
    gate(fn canonical ->
      CMS.Gate.check_in_transaction(actor, :set_status, canonical, community)
    end)

    change(fn canonical -> States.set_status(canonical, nil, community.id) end)
  end

  @spec execute(Community.t(), Article.t(), User.t()) :: T.domain_res(Article.t())
  def execute(%Community{} = community, %Article{} = article, %User{} = actor) do
    execute_pipeline(community, article, actor)
  end
end
