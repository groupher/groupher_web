defmodule GroupherServerWeb.Resolvers.CMS.Reporting do
  @moduledoc """
  Adapts moderation-report GraphQL reads to CMS reporting use cases.

      GraphQL report field -> this resolver -> CMS reporting facade
  """

  alias GroupherServer.CMS

  def paged_reports(_root, args, _) do
    with {:ok, pagi} <- Helper.ORM.Pagi.Params.from_input(Map.get(args, :pagi)) do
      CMS.abuse_reports_paged_reports(Map.get(args, :filter) || %{}, pagi)
    end
  end
end
