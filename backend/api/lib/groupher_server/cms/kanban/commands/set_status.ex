defmodule GroupherServer.CMS.Kanban.Commands.SetStatus do
  @moduledoc """
    Sets the status of an Article in one explicit ArticleBinding binding.

        Article + ArticleBinding binding
          -> Gate admission
          -> KanbanState status update
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{Accounts, CMS}

  alias CMS.Articles.States
  alias CMS.Model.{Article, Community}
  alias Accounts.Model.User
  alias Helper.T

  @pipeline operation: :kanban_set_status, target: :article
  direct_pipeline execute_pipeline(community, article, status, actor) do
    gate(fn canonical ->
      CMS.Gate.check_in_transaction(actor, :set_status, canonical, community)
    end)

    change(fn canonical -> States.set_status(canonical, status, community.id) end)
  end

  @spec execute(Community.t(), Article.t(), atom() | nil, User.t()) ::
          T.domain_res(Article.t())
  def execute(%Community{} = community, %Article{} = article, status, %User{} = actor) do
    execute_pipeline(community, article, status, actor)
  end
end
