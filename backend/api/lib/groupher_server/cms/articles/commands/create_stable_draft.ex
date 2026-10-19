defmodule GroupherServer.CMS.Articles.Commands.CreateStableDraft do
  @moduledoc """
  Creates the stable Article aggregate and its first mutable Draft workspace.

      CMS.Articles.create_stable_draft
        -> CreateStableDraft.execute
        -> Draft.Store.create
  """

  use GroupherServer.CommandPipeline,
    adapter: GroupherServer.CMS.CommandPipelineAdapter

  alias GroupherServer.{Accounts, CMS}

  alias Accounts.Model.User
  alias CMS.{Articles, Articles.Draft.Store, FrontDesk}
  alias CMS.Model.{Author, Community}
  alias CMS.Articles.Commands.CreateStableDraftConfirmation, as: Confirmation

  @pipeline operation: :article_create_draft,
            confirmation: Confirmation,
            target: :command_target,
            params: :command_params
  receipt_pipeline run_receipt(
                     community,
                     thread,
                     attrs,
                     actor,
                     opts,
                     command_id,
                     command_target,
                     command_params
                   ) do
    gate(fn _target -> CMS.Gate.check_in_transaction(actor, :create_article, community) end)

    change(fn canonical_community ->
      create_in_transaction(canonical_community, thread, attrs, actor, opts)
    end)

    confirm(fn %{article: article} ->
      {:ok,
       %Confirmation{
         data: %{
           "article_id" => article.id,
           "branch_id" => Keyword.get(opts, :branch_id, 0),
           "command_id" => command_id
         }
       }}
    end)

    present(fn confirmation -> present_confirmation(confirmation) end)
  end

  @pipeline operation: :article_create_draft_write,
            target: :community,
            params: [:thread, :attrs, :opts]
  direct_pipeline run_direct(community, thread, attrs, actor, opts) do
    gate(fn candidate -> CMS.Gate.check_in_transaction(actor, :create_article, candidate) end)
    change(fn canonical -> create_in_transaction(canonical, thread, attrs, actor, opts) end)
  end

  @spec execute(Community.t(), atom(), map(), User.t() | Author.t(), keyword()) ::
          {:ok, map()} | {:error, term()}
  def execute(%Community{} = community, thread, attrs, %User{} = actor, opts) do
    execute_receipt(community, thread, attrs, actor, opts)
  end

  def execute(%Community{}, _thread, _attrs, %Author{}, _opts) do
    {:error, :command_actor_required}
  end

  def execute(_community, _thread, _attrs, _actor, _opts), do: {:error, :invalid_actor}

  @doc false
  def execute_direct(%Community{} = community, thread, attrs, actor, opts)
      when is_struct(actor, User) or is_struct(actor, Author) do
    run_direct(community, thread, attrs, actor, Keyword.delete(opts, :command_id))
  end

  defp execute_receipt(community, thread, attrs, actor, opts) do
    command_opts = Keyword.delete(opts, :command_id)

    run_receipt(
      community,
      thread,
      attrs,
      actor,
      opts,
      Keyword.fetch!(opts, :command_id),
      {:article_draft, community.id},
      %{thread: thread, attrs: attrs, opts: Map.new(command_opts)}
    )
  end

  @doc false
  def create_in_transaction(community, thread, attrs, actor, opts) do
    with {:ok, author} <- target_author(actor) do
      Store.create(community, thread, attrs, author, Keyword.delete(opts, :command_id))
    end
  end

  defp present_confirmation(%Confirmation{
         data: %{"article_id" => article_id, "branch_id" => branch_id}
       }) do
    with {:ok, article} <- FrontDesk.article(article_id, mode: :internal),
         {:ok, draft} <- Store.get(article, draft_opts(branch_id)) do
      {:ok, %{article: article, draft: draft}}
    else
      _ -> {:error, CMS.ErrorCat.command_result_unavailable()}
    end
  end

  defp present_confirmation(_confirmation) do
    {:error, CMS.ErrorCat.command_result_unavailable()}
  end

  defp draft_opts(branch_id) when is_integer(branch_id) and branch_id > 0 do
    [branch_id: branch_id]
  end

  defp draft_opts(_branch_id), do: []

  defp target_author(%User{} = user), do: Articles.Persist.ensure_author_exists(user)
  defp target_author(%Author{} = author), do: {:ok, author}
end
