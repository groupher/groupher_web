defmodule GroupherServer.Test.AlertBoard.ModelTest do
  use ExUnit.Case, async: true
  alias GroupherServer.{AlertBoard}

  alias AlertBoard.Model.{Case, Decision, Report, ReviewConfig, RuleSet}

  test "review config accepts only platform/community scope pairs and supported modes" do
    community =
      ReviewConfig.changeset(%ReviewConfig{}, %{
        scope_key: "community:12",
        community_id: 12,
        subject_kind: :article,
        version: 1,
        publish_mode: :human_first,
        edit_mode: :ai_first
      })

    assert community.valid?

    refute ReviewConfig.changeset(%ReviewConfig{}, %{
             scope_key: "platform",
             community_id: 12,
             subject_kind: :article
           }).valid?

    refute ReviewConfig.changeset(%ReviewConfig{}, %{
             scope_key: "community:12",
             subject_kind: :article,
             publish_mode: :unknown
           }).valid?

    refute ReviewConfig.changeset(%ReviewConfig{}, %{
             scope_key: "community:12",
             community_id: 12,
             subject_kind: :doc
           }).valid?

    refute ReviewConfig.changeset(%ReviewConfig{}, %{
             scope_key: "platform",
             subject_kind: :doc,
             publish_mode: :human_first,
             edit_mode: :immediate,
             version: 1
           }).valid?
  end

  test "rule sets pin normalized rule data to an operation" do
    rule_set =
      RuleSet.changeset(%RuleSet{}, %{
        scope_key: "platform",
        version: 1,
        rules: %{"items" => []},
        created_by_id: 1,
        operation_ref: Ecto.UUID.generate(),
        required_modalities: ["text", "image"]
      })

    assert rule_set.valid?

    assert RuleSet.changeset(%RuleSet{}, %{
             scope_key: "platform",
             version: 2,
             rules: %{
               "items" => [
                 %{
                   "id" => "word-1",
                   "kind" => "word",
                   "value" => "spam",
                   "category" => "spam",
                   "action" => "restrict"
                 }
               ]
             },
             created_by_id: 1,
             operation_ref: Ecto.UUID.generate()
           }).valid?

    refute RuleSet.changeset(%RuleSet{}, %{
             scope_key: "platform",
             version: 2,
             rules: %{
               "items" => [
                 %{
                   "id" => "duplicate",
                   "kind" => "judge",
                   "value" => "Check whether the post is harmful.",
                   "category" => "safety",
                   "action" => "review"
                 },
                 %{
                   "id" => "duplicate",
                   "kind" => "judge",
                   "value" => "Check whether the post is spam.",
                   "category" => "spam",
                   "action" => "review"
                 }
               ]
             },
             created_by_id: 1,
             operation_ref: Ecto.UUID.generate()
           }).valid?

    refute RuleSet.changeset(%RuleSet{}, %{
             scope_key: "platform",
             version: 2,
             rules: %{"items" => [%{"kind" => "regex", "value" => ".*"}]},
             created_by_id: 1,
             operation_ref: Ecto.UUID.generate()
           }).valid?

    refute RuleSet.changeset(%RuleSet{}, %{
             scope_key: "platform",
             version: 1,
             rules: %{"items" => []},
             created_by_id: 1,
             operation_ref: Ecto.UUID.generate(),
             required_modalities: ["video"]
           }).valid?
  end

  test "cases and reports require exactly one typed target" do
    article_id = Ecto.UUID.generate()

    assert Case.changeset(%Case{}, %{
             target_key: "article:#{article_id}",
             article_id: article_id,
             scope_key: "platform",
             content_token: "v1",
             opened_at: DateTime.utc_now(),
             status: :open,
             priority: :normal
           }).valid?

    refute Case.changeset(%Case{}, %{
             target_key: "article:#{article_id}",
             article_id: article_id,
             comment_id: 5,
             scope_key: "platform",
             content_token: "v1",
             opened_at: DateTime.utc_now()
           }).valid?

    refute Case.changeset(%Case{}, %{
             target_key: "comment:5",
             article_id: article_id,
             scope_key: "platform",
             content_token: "v1",
             opened_at: DateTime.utc_now()
           }).valid?

    refute Report.changeset(%Report{}, %{
             target_key: "comment:5",
             comment_id: 5,
             user_id: 9,
             scope_key: "platform",
             content_token: "v1",
             reporter_id: 2,
             case_id: 1,
             reason_code: "spam",
             operation_ref: Ecto.UUID.generate()
           }).valid?
  end

  test "policy decisions require a check while human decisions require an actor" do
    base = %{
      target_key: "article:#{Ecto.UUID.generate()}",
      scope_key: "platform",
      content_token: "v1",
      action: :restrict,
      operation_ref: Ecto.UUID.generate()
    }

    refute Decision.changeset(%Decision{}, Map.merge(base, %{source: :policy})).valid?
    refute Decision.changeset(%Decision{}, Map.merge(base, %{source: :human})).valid?

    assert Decision.changeset(
             %Decision{},
             Map.merge(base, %{source: :policy, check_id: Ecto.UUID.generate()})
           ).valid?
  end
end
