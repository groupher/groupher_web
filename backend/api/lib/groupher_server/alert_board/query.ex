defmodule GroupherServer.AlertBoard.Query do
  @moduledoc """
  Reads caller-scoped report state and authorized AlertBoard work queues.

      actor + typed target -> scope filter -> report/case facts
  """

  import Ecto.Query

  alias GroupherServer.{Accounts, AlertBoard, CMS, Pagi, Repo, ReviewBot}
  alias AlertBoard.Authorization
  alias AlertBoard.Model.{Case, Report, ReviewConfig}

  alias CMS.Model.{
    ArticleLifecycle,
    Article,
    Author,
    Author,
    ArticleReviewRestriction,
    Comment,
    CommentLifecycle,
    CommentReviewRestriction,
    Community,
    DocLifecycle,
    DocReviewRestriction
  }

  alias Accounts.Model.User

  alias ReviewBot.Model.Check
  alias Helper.ORM
  alias Helper.ORM.Pagi.{Order, Page}

  @doc """
  Returns the required platform and community configs for one target.

  ## Examples

      configs_for_target(community_id, :article)
      #=> {:ok, [platform_config, community_config]} | {:error, reason}
  """
  @spec configs_for_target(pos_integer() | nil, atom()) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  def configs_for_target(community_id, subject_kind)
      when (is_integer(community_id) or is_nil(community_id)) and
             subject_kind in [:article, :comment, :doc] do
    configs_for_targets(List.wrap(community_id), subject_kind)
  end

  def configs_for_target(_community_id, _subject_kind) do
    {:error, AlertBoard.ErrorCat.review_config_invalid()}
  end

  @doc "Returns platform and Community policies for all supplied Article bindings."
  @spec configs_for_targets([pos_integer()], :article | :comment | :doc) ::
          {:ok, [ReviewConfig.t()]} | {:error, term()}
  def configs_for_targets(community_ids, subject_kind)
      when is_list(community_ids) and subject_kind in [:article, :comment, :doc] do
    if Enum.all?(community_ids, &(is_integer(&1) and &1 > 0)) do
      scopes =
        case subject_kind do
          :doc -> ["platform"]
          _ -> ["platform" | Enum.map(Enum.uniq(community_ids), &"community:#{&1}")]
        end

      configs =
        ReviewConfig
        |> where([config], config.subject_kind == ^subject_kind and config.scope_key in ^scopes)
        |> Repo.all()
        |> Repo.preload(:ruleset)

      if length(configs) == length(scopes) do
        {:ok, Enum.sort_by(configs, &(&1.scope_key != "platform"))}
      else
        {:error, AlertBoard.ErrorCat.review_config_not_found()}
      end
    else
      {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  def configs_for_targets(_community_ids, _subject_kind) do
    {:error, AlertBoard.ErrorCat.review_config_invalid()}
  end

  @doc """
  Returns only the active report submitted by the given actor for a target.

  ## Examples

      viewer_report(%{target_key: "comment:42"}, actor)
      #=> {:ok, %AlertBoard.Model.Report{}} | {:ok, nil}
  """
  @spec viewer_report(map(), struct() | nil) :: {:ok, Report.t() | nil} | {:error, term()}
  def viewer_report(%{target_key: target_key, scope_key: scope_key}, %{id: reporter_id})
      when is_binary(target_key) and is_binary(scope_key) and is_integer(reporter_id) do
    report =
      Report
      |> where(
        [report],
        report.target_key == ^target_key and report.scope_key == ^scope_key and
          report.reporter_id == ^reporter_id and
          is_nil(report.withdrawn_at)
      )
      |> Repo.one()

    {:ok, report}
  end

  def viewer_report(%{target_key: target_key, scope_key: scope_key}, _actor)
      when is_binary(target_key) and is_binary(scope_key) do
    {:ok, nil}
  end

  def viewer_report(_target, _actor), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  @doc """
  Lists the current actor's active reports without resolving their targets.

  ## Examples

      my_reports(%{offset: %{page: 1, size: 20}}, actor)
      #=> {:ok, %{entries: reports, page_info: info}} | {:error, reason}
  """
  @spec my_reports(term(), struct()) :: {:ok, map()} | {:error, term()}
  def my_reports(pagi, %{id: reporter_id}) when is_integer(reporter_id) do
    pagi = pagi || %{offset: %{page: 1, size: 20}}

    with {:ok, params} <- Pagi.from_input(pagi, 20),
         {:ok, order} <-
           Order.new(%{
             fields: [:inserted_at, :id],
             directions: [:desc, :desc],
             cursor_fields: [:inserted_at, :id]
           }),
         query <-
           Report
           |> where([report], report.reporter_id == ^reporter_id and is_nil(report.withdrawn_at)),
         {:ok, page} <-
           ORM.pagi(query, params,
             for: Report,
             order: order,
             resource: :alert_board_my_reports,
             surface: "alert_board.my_reports:#{reporter_id}",
             query_fingerprint:
               :erlang.term_to_binary({:active_reports, reporter_id}) |> Base.encode64()
           ) do
      {:ok, %{entries: page.entries, page_info: Page.info(page)}}
    end
  end

  def my_reports(_pagi, _actor), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  @doc "Counts active reports filed against one account."
  @spec reported_count(pos_integer()) :: {:ok, non_neg_integer()} | {:error, term()}
  def reported_count(user_id) when is_integer(user_id) and user_id > 0 do
    count =
      Report
      |> where([report], report.user_id == ^user_id and is_nil(report.withdrawn_at))
      |> Repo.aggregate(:count, :id)

    {:ok, count}
  end

  def reported_count(_user_id), do: {:error, AlertBoard.ErrorCat.invalid_target()}

  @doc "Reads one policy after authorizing the exact platform or community scope."
  @spec review_config(map(), atom(), struct()) :: {:ok, ReviewConfig.t()} | {:error, term()}
  def review_config(scope, subject_kind, actor)
      when subject_kind in [:article, :comment, :doc] do
    with {:ok, scope_key} <- config_scope_key(scope),
         {:ok, :pass} <- Authorization.authorize(scope, configure_action(scope), actor),
         %ReviewConfig{} = config <-
           Repo.get_by(ReviewConfig, scope_key: scope_key, subject_kind: subject_kind) do
      {:ok, Repo.preload(config, :ruleset)}
    else
      nil -> {:error, AlertBoard.ErrorCat.review_config_not_found()}
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  def review_config(_scope, _subject_kind, _actor) do
    {:error, AlertBoard.ErrorCat.review_config_invalid()}
  end

  @doc "Lists only cases in the authorized scope, filtering before pagination."
  @spec list_cases(map(), map(), term(), struct()) :: {:ok, map()} | {:error, term()}
  def list_cases(scope, filter, pagi, actor) when is_map(filter) do
    with {:ok, scope_key} <- config_scope_key(scope),
         {:ok, :pass} <- Authorization.authorize(scope, read_action(scope), actor),
         {:ok, status, kind, priority} <- normalize_case_filter(filter),
         {:ok, params} <- Pagi.from_input(pagi, 20),
         {:ok, order} <-
           Order.new(%{
             fields: [:inserted_at, :id],
             directions: [:desc, :desc],
             cursor_fields: [:inserted_at, :id]
           }),
         query <-
           Case
           |> where([case_record], case_record.scope_key == ^scope_key)
           |> maybe_status(status)
           |> maybe_kind(kind)
           |> maybe_priority(priority),
         {:ok, page} <-
           ORM.pagi(query, params,
             for: Case,
             order: order,
             resource: :alert_board_cases,
             surface: "alert_board.#{scope_key}",
             query_fingerprint: :erlang.term_to_binary({scope_key, filter}) |> Base.encode64()
           ) do
      {:ok, %{entries: page.entries, page_info: Page.info(page)}}
    end
  end

  def list_cases(_scope, _filter, _pagi, _actor) do
    {:error, AlertBoard.ErrorCat.review_config_invalid()}
  end

  @doc "Reads one Case and its evidence only after filtering by authorized scope."
  @spec get_case(map(), pos_integer(), struct()) :: {:ok, map()} | {:error, term()}
  def get_case(scope, case_id, actor) when is_integer(case_id) do
    with {:ok, scope_key} <- config_scope_key(scope),
         {:ok, :pass} <- Authorization.authorize(scope, read_action(scope), actor),
         %Case{} = case_record <-
           Case
           |> where(
             [case_record],
             case_record.id == ^case_id and case_record.scope_key == ^scope_key
           )
           |> Repo.one() do
      case_record = Repo.preload(case_record, reports: :reporter, decisions: :actor)
      active_restrictions = active_restrictions(case_record)
      signals = case_signals(case_record)

      {:ok,
       %{
         case: case_record,
         reports: case_record.reports,
         decisions: case_record.decisions,
         active_restrictions: active_restrictions,
         signals: signals,
         safe_summary: safe_summary(case_record, signals),
         allowed_actions: allowed_actions(scope, case_record, active_restrictions, actor)
       }}
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
      {:error, _reason} = error -> error
      _ -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  def get_case(_scope, _case_id, _actor) do
    {:error, AlertBoard.ErrorCat.invalid_target()}
  end

  @doc "Builds a safe current review projection for one canonical Article or Comment."
  @spec content_review(map(), Community.t(), struct() | nil) :: {:ok, map()} | {:error, term()}
  def content_review(
        %{kind: :article, resource: %Article{} = article},
        %Community{} = community,
        actor
      ) do
    with %ArticleLifecycle{} = lifecycle <- Repo.get_by(ArticleLifecycle, article_id: article.id) do
      review_projection(
        "article:#{article.id}",
        lifecycle.review_content_token,
        lifecycle.id,
        ArticleReviewRestriction,
        community,
        actor,
        article
      )
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  def content_review(
        %{kind: :comment, resource: %Comment{} = comment},
        %Community{} = community,
        actor
      ) do
    with %CommentLifecycle{} = lifecycle <- Repo.get_by(CommentLifecycle, comment_id: comment.id) do
      review_projection(
        "comment:#{comment.id}",
        lifecycle.review_content_token,
        lifecycle.id,
        CommentReviewRestriction,
        community,
        actor,
        comment
      )
    else
      nil -> {:error, AlertBoard.ErrorCat.invalid_target()}
    end
  end

  def content_review(_target, _community, _actor) do
    {:error, AlertBoard.ErrorCat.invalid_target()}
  end

  defp config_scope_key(%{kind: :platform}), do: {:ok, "platform"}

  defp config_scope_key(%{kind: :community, community: %Community{id: id}}) do
    {:ok, "community:#{id}"}
  end

  defp config_scope_key(_scope), do: {:error, AlertBoard.ErrorCat.review_config_invalid()}

  defp review_projection(
         target_key,
         token,
         lifecycle_id,
         restriction_schema,
         community,
         actor,
         resource
       ) do
    scope_keys = ["platform", "community:#{community.id}"]

    restrictions =
      restriction_schema
      |> where(
        [restriction],
        restriction.lifecycle_id == ^lifecycle_id and restriction.scope_key in ^scope_keys and
          is_nil(restriction.ended_at)
      )
      |> Repo.all()

    checks =
      Check
      |> where(
        [check],
        check.target_key == ^target_key and check.scope_key in ^scope_keys and
          check.content_token == ^token
      )
      |> Repo.all()

    unavailable_scopes =
      checks
      |> Enum.group_by(& &1.scope_key)
      |> Enum.flat_map(fn {scope_key, scoped_checks} ->
        latest_generation = Enum.max_by(scoped_checks, & &1.generation).generation

        if Enum.any?(scoped_checks, &(&1.generation == latest_generation and &1.state == :failed)) do
          [scope_key]
        else
          []
        end
      end)

    unavailable_scopes =
      Case
      |> where(
        [case_record],
        case_record.target_key == ^target_key and case_record.content_token == ^token and
          case_record.scope_key in ^unavailable_scopes and case_record.status == :open
      )
      |> select([case_record], case_record.scope_key)
      |> Repo.all()

    is_reviewer? = review_decision_allowed?(community, actor)
    actor_id = Map.get(actor || %{}, :id)
    is_owner? = is_integer(actor_id) and owner_id(resource) == actor_id
    privileged? = is_owner? or is_reviewer?

    {:ok, viewer_report} =
      viewer_report(
        %{target_key: target_key, scope_key: "community:#{community.id}"},
        actor
      )

    {:ok,
     %{
       status: review_status(restrictions),
       content_token: if(privileged?, do: token),
       check_unavailable: unavailable_scopes != [],
       can_edit: resource_edit_allowed?(resource, community, actor),
       can_request_review: is_reviewer?,
       viewer_report_id: if(viewer_report, do: viewer_report.id),
       reason_codes:
         if(privileged?, do: Enum.map(restrictions, &Atom.to_string(&1.kind)), else: [])
     }}
  end

  defp review_status(restrictions) do
    cond do
      Enum.any?(restrictions, &(&1.kind in [:rule_hit, :manual_hold])) -> :restricted
      Enum.any?(restrictions, &(&1.kind == :awaiting_human)) -> :waiting_human
      Enum.any?(restrictions, &(&1.kind == :awaiting_ai)) -> :checking
      true -> :public
    end
  end

  defp owner_id(%Article{author_id: author_id}) do
    case Repo.get(Author, author_id) do
      %Author{user_id: user_id} -> user_id
      _ -> nil
    end
  end

  defp owner_id(%Comment{author_id: author_id}), do: author_id
  defp owner_id(_resource), do: nil

  defp resource_edit_allowed?(%Article{} = article, community, actor) do
    action =
      case article.thread do
        :post -> :edit_post
        :blog -> :edit_blog
        :changelog -> :edit_changelog
        _ -> :invalid
      end

    action != :invalid and
      match?(
        {:ok, _},
        CMS.gate_access_check(actor, :edit, %{
          id: article.id,
          thread: article.thread,
          community: community
        })
      )
  end

  defp resource_edit_allowed?(%Comment{} = comment, _community, actor) do
    match?({:ok, _}, CMS.gate_access_check(actor, :edit, comment))
  end

  defp resource_edit_allowed?(_resource, _community, _actor), do: false

  defp review_decision_allowed?(_community, nil), do: false

  defp review_decision_allowed?(community, actor) do
    Authorization.authorize(
      %{kind: :community, community: community},
      "review.decide",
      actor
    ) == {:ok, :pass}
  end

  defp read_action(%{kind: :platform}), do: "review.platform.read"
  defp read_action(_scope), do: "review.read"
  defp configure_action(%{kind: :platform}), do: "review.platform.configure"
  defp configure_action(_scope), do: "review.configure"

  defp normalize_case_filter(filter) do
    if Map.keys(filter) -- [:status, :kind, :priority] == [] do
      status = Map.get(filter, :status, :open)
      kind = Map.get(filter, :kind)
      priority = Map.get(filter, :priority)

      if status in [:open, :resolved, :superseded, :all] and
           (is_nil(kind) or kind in [:article, :comment, :doc, :user]) and
           (is_nil(priority) or priority in [:normal, :high]) do
        {:ok, status, kind, priority}
      else
        {:error, AlertBoard.ErrorCat.review_config_invalid()}
      end
    else
      {:error, AlertBoard.ErrorCat.review_config_invalid()}
    end
  end

  defp maybe_status(query, :all), do: query
  defp maybe_status(query, status), do: where(query, [case_record], case_record.status == ^status)
  defp maybe_priority(query, nil), do: query

  defp maybe_priority(query, priority) do
    where(query, [case_record], case_record.priority == ^priority)
  end

  defp maybe_kind(query, nil), do: query

  defp maybe_kind(query, :article) do
    where(query, [case_record], like(case_record.target_key, "article:%"))
  end

  defp maybe_kind(query, :comment) do
    where(query, [case_record], like(case_record.target_key, "comment:%"))
  end

  defp maybe_kind(query, :doc) do
    where(query, [case_record], like(case_record.target_key, "doc:%"))
  end

  defp maybe_kind(query, :user) do
    where(query, [case_record], like(case_record.target_key, "user:%"))
  end

  defp active_restrictions(%Case{article_id: article_id, branch_id: branch_id, scope_key: scope})
       when is_binary(article_id) and is_integer(branch_id) do
    case Repo.get_by(DocLifecycle, article_id: article_id, branch_id: branch_id) do
      %DocLifecycle{id: lifecycle_id} -> active_rows(DocReviewRestriction, lifecycle_id, scope)
      _ -> []
    end
  end

  defp active_restrictions(%Case{article_id: article_id, scope_key: scope})
       when is_binary(article_id) do
    case Repo.get_by(ArticleLifecycle, article_id: article_id) do
      %ArticleLifecycle{id: lifecycle_id} ->
        active_rows(ArticleReviewRestriction, lifecycle_id, scope)

      _ ->
        []
    end
  end

  defp active_restrictions(%Case{comment_id: comment_id, scope_key: scope})
       when is_integer(comment_id) do
    case Repo.get_by(CommentLifecycle, comment_id: comment_id) do
      %CommentLifecycle{id: lifecycle_id} ->
        active_rows(CommentReviewRestriction, lifecycle_id, scope)

      _ ->
        []
    end
  end

  defp active_restrictions(_case_record), do: []

  defp active_rows(schema, lifecycle_id, scope_key) do
    schema
    |> where(
      [restriction],
      restriction.lifecycle_id == ^lifecycle_id and restriction.scope_key == ^scope_key and
        is_nil(restriction.ended_at)
    )
    |> order_by([restriction], asc: restriction.id)
    |> Repo.all()
    |> Enum.map(
      &Map.take(&1, [:id, :scope_key, :cause_key, :kind, :source, :content_token, :applied_at])
    )
  end

  defp case_signals(%Case{target_key: target_key, scope_key: scope_key, content_token: token}) do
    Check
    |> where(
      [check],
      check.target_key == ^target_key and check.scope_key == ^scope_key and
        check.content_token == ^token
    )
    |> order_by([check], desc: check.inserted_at, desc: check.id)
    |> select([check], check.signals)
    |> Repo.all()
    |> Enum.flat_map(&Map.get(&1 || %{}, "items", []))
  end

  defp safe_summary(%Case{target_key: target_key}, signals) do
    kind = target_key |> String.split(":", parts: 2) |> hd()

    categories =
      signals
      |> Enum.map(&signal_value(&1, "category"))
      |> Enum.filter(&(is_binary(&1) and String.trim(&1) != ""))
      |> Enum.uniq()
      |> Enum.take(3)

    case categories do
      [] -> "#{String.capitalize(kind)} review case"
      values -> "#{String.capitalize(kind)} review: " <> Enum.join(values, ", ")
    end
  end

  defp allowed_actions(_scope, %Case{status: status}, _restrictions, _actor)
       when status != :open do
    []
  end

  defp allowed_actions(scope, %Case{} = case_record, restrictions, actor) do
    with {:ok, :pass} <- Authorization.authorize(scope, decide_action(scope), actor),
         false <- case_owner_id(case_record) == Map.get(actor, :id) do
      if String.starts_with?(case_record.target_key, "user:") do
        [:dismiss, :record_handled]
      else
        approve? =
          Enum.any?(restrictions, fn restriction ->
            restriction.content_token == case_record.content_token and
              restriction.kind != :manual_hold
          end)

        release? =
          Enum.any?(restrictions, fn restriction ->
            restriction.kind == :manual_hold or
              (restriction.kind == :rule_hit and restriction.source == :policy)
          end)

        dismiss? = restrictions == []

        actions =
          if approve? do
            [:approve]
          else
            []
          end

        actions = actions ++ [:restrict]

        actions =
          if dismiss? do
            actions ++ [:dismiss]
          else
            actions
          end

        if release? do
          actions ++ [:release]
        else
          actions
        end
      end
    else
      _ -> []
    end
  end

  defp case_owner_id(%Case{article_id: id}) when is_binary(id) do
    case Repo.get(Article, id) do
      %Article{author_id: author_id} ->
        case Repo.get(Author, author_id) do
          %Author{user_id: user_id} -> user_id
          _ -> nil
        end

      _ ->
        nil
    end
  end

  defp case_owner_id(%Case{comment_id: id}) when is_integer(id) do
    case Repo.get(Comment, id) do
      %Comment{author_id: author_id} -> author_id
      _ -> nil
    end
  end

  defp case_owner_id(%Case{user_id: id}) when is_integer(id) do
    case Repo.get(User, id) do
      %User{id: user_id} -> user_id
      _ -> nil
    end
  end

  defp case_owner_id(_case_record), do: nil

  defp signal_value(signal, "category") when is_map(signal) do
    Map.get(signal, "category") || Map.get(signal, :category)
  end

  defp signal_value(_signal, _key), do: nil

  defp decide_action(%{kind: :platform}), do: "review.platform.decide"
  defp decide_action(_scope), do: "review.decide"
end
