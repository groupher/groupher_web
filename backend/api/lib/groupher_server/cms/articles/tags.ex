defmodule GroupherServer.CMS.Articles.Tags do
  @moduledoc """
  Internal facade for assigning Community tags to Articles.

      caller -> GroupherServer.CMS.Articles.Tags -> result
  """

  alias __MODULE__.Assignment

  defdelegate overwrite(community, thread, article, attrs, opts), to: Assignment
  defdelegate add(article, tag_id, opts), to: Assignment
  defdelegate remove(article, tag_id, opts), to: Assignment
end
