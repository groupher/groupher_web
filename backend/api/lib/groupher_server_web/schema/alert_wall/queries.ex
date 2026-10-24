defmodule GroupherServerWeb.Schema.AlertWall.Queries do
  @moduledoc """
  AlertWall item queries.

  Business position:

      GraphQL query document
        -> AlertWall query field
          -> AlertWall resolver
  """

  use Helper.GqlSchemaSuite

  object :alert_wall_queries do
    field :my_reports, non_null(list_of(non_null(:alert_report))) do
      middleware(M.Authorize, :login)
      resolve(&R.AlertWall.my_reports/3)
    end

    field :alert_items, non_null(list_of(non_null(:alert_item))) do
      arg(:scope, non_null(:review_bot_scope_input))
      middleware(M.Authorize, :login)
      resolve(&R.AlertWall.alert_items/3)
    end

    field :alert_item, :alert_item do
      arg(:id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertWall.alert_item/3)
    end
  end
end
