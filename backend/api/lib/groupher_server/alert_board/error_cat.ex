defmodule GroupherServer.AlertBoard.ErrorCat do
  @moduledoc """
  Stable errors for report facts, review cases and review decisions.

      AlertBoard boundary -> ErrorCat reason -> safe API error
  """

  use GroupherServer.ErrorCat, namespace: {:alert_board, :review}

  error(:invalid_target, code: 7301)
  error(:target_not_readable, code: 7302)
  error(:self_report, code: 7303)
  error(:report_already_active, code: 7304)
  error(:report_not_found, code: 7305)
  error(:review_config_not_found, code: 7306)
  error(:review_config_invalid, code: 7307)
  error(:content_token_changed, code: 7308)
  error(:case_version_conflict, code: 7309)
  error(:decision_conflict, code: 7310)
  error(:review_config_version_conflict, code: 7311)
  error(:self_review_forbidden, code: 7312)
  error(:unsupported_review_action, code: 7313)
  error(:restriction_scope_mismatch, code: 7314)
end
