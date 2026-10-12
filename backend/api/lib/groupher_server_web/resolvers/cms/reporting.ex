defmodule GroupherServerWeb.Resolvers.CMS.Reporting do
  @moduledoc """
  Adapts moderation-report GraphQL reads to CMS reporting use cases.

      GraphQL report field -> this resolver -> CMS reporting facade
  """

  import ShortMaps

  alias GroupherServer.CMS

  def paged_reports(_root, ~m(filter)a, _) do
    CMS.abuse_reports_paged_reports(filter)
  end
end
