defmodule GroupherServerWeb.Schema.AlertBoard.Mutations do
  @moduledoc """
  AlertBoard write fields; each user intent carries a required commandId.

      authenticated GraphQL mutation
        -> FrontDesk canonical target
        -> AlertBoard CMS Command Receipt
        -> durable report result
  """

  use Helper.GqlSchemaSuite

  object :alert_board_mutations do
    field :update_review_config, non_null(:review_command_result) do
      arg(:input, non_null(:update_review_config_input))
      arg(:command_id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.update_review_config/3)
    end

    field :submit_report, non_null(:review_command_result) do
      arg(:input, non_null(:submit_report_input))
      arg(:command_id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.submit_report/3)
    end

    field :withdraw_report, non_null(:review_command_result) do
      arg(:report_id, non_null(:id))
      arg(:command_id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.withdraw_report/3)
    end

    field :decide_review_case, non_null(:review_command_result) do
      arg(:case_id, non_null(:id))
      arg(:input, non_null(:review_decision_input))
      arg(:command_id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.decide_review_case/3)
    end

    field :recheck_review_target, non_null(:review_command_result) do
      arg(:target, non_null(:review_recheck_target_input))
      arg(:scope, non_null(:review_scope_input))
      arg(:command_id, non_null(:id))
      middleware(M.Authorize, :login)
      resolve(&R.AlertBoard.recheck_review_target/3)
    end
  end
end
