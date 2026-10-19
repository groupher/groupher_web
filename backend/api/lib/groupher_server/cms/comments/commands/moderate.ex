defmodule GroupherServer.CMS.Comments.Commands.Moderate do
  @moduledoc """
  Resolves a canonical Comment once before moderation writes.

      Comment command -> canonical Comment -> moderation write
  """

  alias GroupherServer.CMS
  alias CMS.Comments.Moderation
  alias CMS.FrontDesk
  alias CMS.Model.Comment

  use GroupherServer.CommandPipeline,

    adapter: GroupherServer.CMS.CommandPipelineAdapter
  @pipeline operation: :comment_set_illegal, access: :internal, target: :comment_id
  direct_pipeline set_illegal(comment_id, attrs) do
    load(fn -> FrontDesk.comment(comment_id, mode: :internal) end)
    change(fn comment -> Moderation.set_illegal(comment, attrs) end)
  end

  @pipeline operation: :comment_unset_illegal, access: :internal, target: :comment_id
  direct_pipeline unset_illegal(comment_id, attrs) do
    load(fn -> FrontDesk.comment(comment_id, mode: :internal) end)
    change(fn comment -> Moderation.unset_illegal(comment, attrs) end)
  end

  @pipeline operation: :comment_set_audit_failed, access: :internal, target: :comment
  direct_pipeline set_audit_failed(comment, state) do
    change(fn canonical -> Moderation.set_audit_failed(canonical, state) end)
  end

  @spec execute(atom(), term(), map()) :: {:ok, term()} | {:error, term()}
  def execute(:set_illegal, comment_id, attrs), do: set_illegal(comment_id, attrs)

  def execute(:unset_illegal, comment_id, attrs), do: unset_illegal(comment_id, attrs)

  def execute(:set_audit_failed, %Comment{} = comment, state) do
    set_audit_failed(comment, state)
  end
end
