defmodule GroupherServer.CMS.Kanban.Commands.Add do
  @moduledoc """
    Adds a canonical Article to a Community-local Kanban.

        Article + Community
          -> ArticleBinding binding
          -> KanbanState
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{Accounts, CMS}

  alias CMS.Articles.States
  alias CMS.Model.{Article, Community}
  alias Accounts.Model.User
  alias Helper.T

  @pipeline operation: :kanban_add, target: :article
  direct_pipeline execute_pipeline(community, article, status, actor) do
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
