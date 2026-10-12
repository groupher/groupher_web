defmodule GroupherServer.CMS.Articles.Publish do
  @moduledoc """
  Internal facade for publishing regular Articles and Docs.

      caller -> GroupherServer.CMS.Articles.Publish -> result
  """

  alias __MODULE__.{Doc, Target}

  defdelegate article(article, actor, opts), to: Target, as: :publish
  defdelegate doc(article, branch_id, actor, opts), to: Doc, as: :publish
end
