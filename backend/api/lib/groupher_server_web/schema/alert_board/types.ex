defmodule GroupherServerWeb.Schema.AlertBoard.Types do
  @moduledoc """
  Typed GraphQL contract for AlertBoard configuration, reports and review work.

      AlertBoard GraphQL types
        -> resolver boundary
        -> AlertBoard / ReviewBot domain facts
  """

  use Helper.GqlSchemaSuite

  enum :review_scope_kind do
    value(:platform)
    value(:community)
  end

  enum :review_subject_kind do
    value(:article)
    value(:comment)
    value(:doc)
  end

  enum :review_target_kind do
    value(:article)
    value(:comment)
    value(:user)
  end

  enum :review_recheck_target_kind do
    value(:article)
    value(:comment)
    value(:doc)
  end

  enum :review_case_status do
    value(:open)
    value(:resolved)
    value(:superseded)
    value(:all)
  end

  enum :review_case_priority do
    value(:normal)
    value(:high)
  end

  enum :review_report_reason do
    value(:spam)
    value(:harassment)
    value(:illegal_content)
    value(:impersonation)
    value(:other)
  end

  enum :review_publish_mode do
    value(:immediate)
    value(:ai_first)
    value(:human_first)
  end

  enum :review_edit_mode do
    value(:immediate)
    value(:ai_first)
  end

  enum :review_case_action do
    value(:approve)
    value(:restrict)
    value(:release)
    value(:dismiss)
    value(:record_handled)
  end

  enum :content_review_status do
    value(:public)
    value(:checking)
    value(:waiting_human)
    value(:restricted)
  end

  enum :review_decision_action do
    value(:approve)
    value(:restrict)
    value(:release)
    value(:dismiss)
    value(:recheck)
    value(:record_handled)
  end

  input_object :review_scope_input do
    field(:kind, non_null(:review_scope_kind))
    field(:community, :string)
  end

  input_object :review_case_filter_input do
    field(:status, :review_case_status)
    field(:kind, :review_target_kind)
    field(:priority, :review_case_priority)
  end

  input_object :review_target_input do
    field(:kind, non_null(:review_target_kind))
    field(:article, :article_path_input)
    field(:comment, :comment_path_input)
    field(:user, :string)
  end

  input_object :submit_report_input do
    field(:target, non_null(:review_target_input))
    field(:reason_code, non_null(:review_report_reason))
    field(:details, :string)
  end

  input_object :review_config_input do
    field(:publish_mode, non_null(:review_publish_mode))
    field(:edit_mode, non_null(:review_edit_mode))
    field(:background_check, non_null(:boolean))
    field(:rules, non_null(:json))
    field(:prompt, :string)
    field(:provider_profile, :string)
    field(:required_modalities, non_null(list_of(non_null(:string))))
  end

  input_object :update_review_config_input do
    field(:scope, non_null(:review_scope_input))
    field(:subject_kind, non_null(:review_subject_kind))
    field(:expected_version, non_null(:integer))
    field(:config, non_null(:review_config_input))
  end

  input_object :review_decision_input do
    field(:expected_case_version, non_null(:integer))
    field(:expected_content_token, non_null(:string))
    field(:action, non_null(:review_case_action))
    field(:restriction_ids, non_null(list_of(non_null(:integer))))
    field(:reason_code, :string)
    field(:note, :string)
  end

  input_object :review_recheck_target_input do
    field(:kind, non_null(:review_recheck_target_kind))
    field(:article, :article_path_input)
    field(:comment, :comment_path_input)
    field(:doc_article_id, :id)
    field(:doc_branch_id, :integer)
  end

  object :review_config do
    field(:scope_key, non_null(:string))
    field(:subject_kind, non_null(:review_subject_kind))
    field(:version, non_null(:integer))
    field(:publish_mode, non_null(:review_publish_mode))
    field(:edit_mode, non_null(:review_edit_mode))
    field(:background_check, non_null(:boolean))
    field(:ruleset_id, :id)

    field(:rules, :json,
      resolve: fn config, _, _ -> {:ok, config.ruleset && config.ruleset.rules} end
    )

    field(:prompt, :string,
      resolve: fn config, _, _ -> {:ok, config.ruleset && config.ruleset.prompt} end
    )

    field(:provider_profile, :string,
      resolve: fn config, _, _ -> {:ok, config.ruleset && config.ruleset.provider_profile} end
    )

    field(:required_modalities, non_null(list_of(non_null(:string))),
      resolve: fn config, _, _ ->
        {:ok, (config.ruleset && config.ruleset.required_modalities) || []}
      end
    )
  end

  object :review_case do
    field(:id, non_null(:id))
    field(:target_key, non_null(:string))
    field(:scope_key, non_null(:string))
    field(:content_token, non_null(:string))
    field(:status, non_null(:review_case_status))
    field(:priority, non_null(:review_case_priority))
    field(:version, non_null(:integer))
    field(:opened_at, non_null(:datetime))
    field(:resolved_at, :datetime)
    field(:resolution, :string)
  end

  object :review_report do
    field(:id, non_null(:id))
    field(:target_key, non_null(:string))
    field(:reason_code, non_null(:string))
    field(:details, :string)
    field(:reporter_id, non_null(:id))
    field(:inserted_at, non_null(:datetime))
    field(:withdrawn_at, :datetime)
  end

  object :review_decision do
    field(:id, non_null(:id))
    field(:action, non_null(:review_decision_action))
    field(:source, non_null(:string))
    field(:actor_id, :id)
    field(:check_id, :id)
    field(:restriction_ids, non_null(list_of(non_null(:integer))))
    field(:reason_code, :string)
    field(:note, :string)
    field(:inserted_at, non_null(:datetime))
  end

  object :review_case_detail do
    field(:case, non_null(:review_case), resolve: fn detail, _, _ -> {:ok, detail.case} end)
    field(:safe_summary, non_null(:string))
    field(:allowed_actions, non_null(list_of(non_null(:review_case_action))))
    field(:reports, non_null(list_of(non_null(:review_report))))
    field(:decisions, non_null(list_of(non_null(:review_decision))))
    field(:active_restrictions, non_null(list_of(non_null(:json))))
    field(:signals, non_null(list_of(non_null(:json))))
  end

  object :content_review do
    field(:status, non_null(:content_review_status))
    field(:content_token, :string)
    field(:check_unavailable, non_null(:boolean))
    field(:can_edit, non_null(:boolean))
    field(:can_request_review, non_null(:boolean))
    field(:viewer_report_id, :id)
    field(:reason_codes, non_null(list_of(non_null(:string))))
  end

  object :review_case_page do
    field(:entries, non_null(list_of(non_null(:review_case))))
    field(:page_info, non_null(:page_info))
  end

  object :review_report_page do
    field(:entries, non_null(list_of(non_null(:review_report))))
    field(:page_info, non_null(:page_info))
  end

  object :review_command_result do
    field(:command_id, non_null(:id))
    field(:case_version, :integer)
    field(:report, :review_report)
    field(:review_config, :review_config)
    field(:case, :review_case)
    field(:review_decision, :review_decision)
    field(:check_ids, non_null(list_of(non_null(:id))))
  end
end
