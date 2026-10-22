defmodule GroupherServerWeb.Schema.AlertBoard.Queries do
  @moduledoc """
  AlertBoard read fields; scope authorization is repeated inside the domain query.

      authenticated GraphQL query
        -> AlertBoard resolver
        -> scope-first authorization/query
        -> typed workboard result
  """

  use Helper.GqlSchemaSuite

  object :alert_board_queries do
    field :my_reports, non_null(:review_report_page) do
      arg(:pagi, :pagi_input)
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.my_reports/3)
    end

    field :content_review, :content_review do
      arg(:target, non_null(:review_target_input))
      resolve(&R.AlertBoard.content_review/3)
    end

    field :review_config, non_null(:review_config) do
      arg(:scope, non_null(:review_scope_input))
      arg(:subject_kind, non_null(:review_subject_kind))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.review_config/3)
    end

    field :review_cases, non_null(:review_case_page) do
      arg(:scope, non_null(:review_scope_input))
      arg(:filter, :review_case_filter_input)
      arg(:pagi, :pagi_input)
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.review_cases/3)
    end

    field :review_case, :review_case_detail do
      arg(:scope, non_null(:review_scope_input))
      arg(:id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.review_case/3)
    end
  end
end
