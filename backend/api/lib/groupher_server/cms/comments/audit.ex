defmodule GroupherServer.CMS.Comments.Audit do
  @moduledoc """
  Internal boundary for automated Comment audit results.

  This module is called by the audition worker, not by user-facing resolvers or
  the public Comments facade.

      audition worker
        -> Comments.Audit
        -> Moderate direct pipeline
        -> Comment audit state
  """

  alias GroupherServer.CMS.Comments.Commands.Moderate

  def set_illegal(comment_id, attrs), do: Moderate.execute(:set_illegal, comment_id, attrs)
  def unset_illegal(comment_id, attrs), do: Moderate.execute(:unset_illegal, comment_id, attrs)

  def set_audit_failed(comment, state),
    do: Moderate.execute(:set_audit_failed, comment, state)
end
