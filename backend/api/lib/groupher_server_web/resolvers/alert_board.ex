defmodule GroupherServerWeb.Resolvers.AlertBoard do
  @moduledoc """
  Resolves scoped AlertBoard GraphQL requests through FrontDesk and domain APIs.

      GraphQL scope/path
        -> FrontDesk canonical load
        -> AlertBoard command/query
        -> typed GraphQL result
  """

  alias GroupherServer.{Accounts, AlertBoard, CMS}
  alias CMS.Model.{Article, Comment, Community}

  @doc "Loads a scoped review configuration after AlertBoard authorization."
  def review_config(_root, %{scope: scope_input, subject_kind: subject}, %{
        context: %{cur_user: actor}
      }) do
    with {:ok, scope} <- resolve_scope(scope_input, actor) do
      AlertBoard.review_config(scope, subject, actor)
    end
  end

  @doc """
  Loads only the authenticated actor's active reports, without reading targets.

  ## Examples

      my_reports(nil, %{pagi: nil}, %{context: %{cur_user: actor}})
      #=> {:ok, %{entries: reports, page_info: info}} | {:error, reason}
  """
  def my_reports(_root, %{pagi: pagi}, %{context: %{cur_user: actor}}) do
    AlertBoard.my_reports(pagi, actor)
  end

  def my_reports(_root, _args, %{context: %{cur_user: actor}}) do
    AlertBoard.my_reports(nil, actor)
  end

  @doc "Resolves the active AlertBoard report count for one account."
  def reported_count(%{user_id: user_id}, _args, _resolution) do
    AlertBoard.reported_count(user_id)
  end

  @doc "Updates a scoped ReviewConfig through AlertBoard's command receipt boundary."
  def update_review_config(
        _root,
        %{input: input, command_id: command_id},
        %{context: %{cur_user: actor}}
      ) do
    with {:ok, scope} <- resolve_scope(input.scope, actor),
         {:ok, config} <-
           AlertBoard.update_config(
             scope,
             input.subject_kind,
             input.expected_version,
             input.config,
             actor,
             command_id
           ) do
      {:ok, %{review_config: config, command_id: command_id, check_ids: []}}
    end
  end

  @doc "Lists cases after resolving and authorizing the exact workboard scope."
  def review_cases(_root, args, %{context: %{cur_user: actor}}) do
    with {:ok, scope} <- resolve_scope(args.scope, actor) do
      AlertBoard.list_cases(scope, Map.get(args, :filter, %{}), Map.get(args, :pagi), actor)
    end
  end

  @doc "Loads one case only within the caller-authorized platform/community scope."
  def review_case(_root, %{scope: scope_input, id: id}, %{context: %{cur_user: actor}}) do
    with {:ok, scope} <- resolve_scope(scope_input, actor),
         {:ok, case_id} <- parse_positive_id(id) do
      AlertBoard.get_case(scope, case_id, actor)
    end
  end

  @doc "Resolves a read-authorized Article or Comment to the current Gate-derived review DTO."
  def content_review(_root, %{target: %{kind: :article, article: path}}, resolution) do
    actor = Map.get(resolution.context, :cur_user)

    with {:ok, projection} <- review_article_projection(path, actor),
         article_id when is_binary(article_id) <- Map.get(projection, :id),
         {:ok, %Article{} = article} <-
           CMS.front_desk_article(article_id, nil, mode: :internal, view: :command_context),
         {:ok, %Community{} = community} <- CMS.front_desk_community(path.community, nil, []) do
      AlertBoard.content_review(%{kind: :article, resource: article}, community, actor)
    else
      _ -> {:error, AlertBoard.target_not_readable()}
    end
  end

  def content_review(_root, %{target: %{kind: :comment, comment: path}}, resolution) do
    actor = Map.get(resolution.context, :cur_user)

    with {:ok, %Comment{} = comment} <- review_comment(path, actor),
         {:ok, %Community{} = community} <-
           CMS.front_desk_community(comment.community_id, nil, []) do
      AlertBoard.content_review(%{kind: :comment, resource: comment}, community, actor)
    else
      _ -> {:error, AlertBoard.target_not_readable()}
    end
  end

  def content_review(_root, _args, _resolution) do
    {:error, AlertBoard.invalid_target()}
  end

  @doc "Creates a new report against a canonical, currently readable target."
  def submit_report(
        _root,
        %{input: input, command_id: command_id},
        %{context: %{cur_user: actor}}
      ) do
    with {:ok, target} <- resolve_report_target(input.target, actor),
         {:ok, report} <-
           AlertBoard.submit_report(
             target,
             input.reason_code |> Atom.to_string() |> String.upcase(),
             Map.get(input, :details),
             actor,
             command_id
           ) do
      {:ok, %{report: report, command_id: command_id, check_ids: []}}
    end
  end

  @doc "Withdraws the authenticated actor's report without requiring the target to remain public."
  def withdraw_report(
        _root,
        %{report_id: report_id, command_id: command_id},
        %{context: %{cur_user: actor}}
      ) do
    with {:ok, report_id} <- parse_positive_id(report_id),
         {:ok, report} <- AlertBoard.withdraw_report(report_id, actor, command_id) do
      {:ok, %{report: report, command_id: command_id, check_ids: []}}
    end
  end

  @doc "Applies an authorized, version-checked human decision to one AlertBoard Case."
  def decide_review_case(
        _root,
        %{case_id: case_id, input: input, command_id: command_id},
        %{context: %{cur_user: actor}}
      ) do
    with {:ok, case_id} <- parse_positive_id(case_id),
         {:ok, decision} <- AlertBoard.decide_case(case_id, input, actor, command_id) do
      {:ok,
       %{
         review_decision: decision,
         command_id: command_id,
         case_version: (decision.expected_case_version || 0) + 1,
         case: nil,
         review_config: nil,
         report: nil,
         check_ids: []
       }}
    end
  end

  @doc "Registers a scoped manual recheck for the latest Article or Comment content."
  def recheck_review_target(
        _root,
        %{target: target_input, scope: scope_input, command_id: command_id},
        %{context: %{cur_user: actor}}
      ) do
    with {:ok, scope} <- resolve_scope(scope_input, actor),
         {:ok, target} <- resolve_recheck_target(target_input, actor),
         {:ok, checks} <- AlertBoard.recheck(target, scope, actor, command_id) do
      {:ok,
       %{
         command_id: command_id,
         check_ids: Enum.map(checks, & &1.id),
         review_config: nil,
         review_decision: nil,
         report: nil,
         case: nil
       }}
    end
  end

  defp resolve_scope(%{kind: :platform} = input, _actor) do
    if is_nil(Map.get(input, :community)) do
      {:ok, %{kind: :platform}}
    else
      {:error, AlertBoard.review_config_invalid()}
    end
  end

  defp resolve_scope(%{kind: :community, community: community_ref}, actor)
       when is_binary(community_ref) and community_ref != "" do
    with {:ok, %Community{} = community} <- CMS.front_desk_community(community_ref, actor, []) do
      {:ok, %{kind: :community, community: community}}
    end
  end

  defp resolve_scope(_scope, _actor), do: {:error, AlertBoard.review_config_invalid()}

  defp resolve_report_target(%{kind: :article, article: path}, actor) when is_map(path) do
    with {:ok, projection} <- CMS.front_desk_article(path, actor),
         article_id when is_binary(article_id) <- Map.get(projection, :id),
         {:ok, %Article{} = resource} <-
           CMS.front_desk_article(article_id, nil, mode: :internal, view: :command_context),
         {:ok, %Community{} = community} <- CMS.front_desk_community(path.community, actor, []) do
      {:ok, %{resource: resource, community_id: community.id}}
    else
      _ -> {:error, AlertBoard.target_not_readable()}
    end
  end

  defp resolve_report_target(%{kind: :comment, comment: path}, actor) when is_map(path) do
    with {:ok, %Comment{} = comment} <- CMS.front_desk_comment(path, actor) do
      {:ok, %{resource: comment}}
    else
      _ -> {:error, AlertBoard.target_not_readable()}
    end
  end

  defp resolve_report_target(%{kind: :user, user: login}, _actor) when is_binary(login) do
    with {:ok, user} <- Accounts.front_desk_user(login) do
      {:ok, %{resource: user}}
    end
  end

  defp resolve_report_target(_target, _actor) do
    {:error, AlertBoard.invalid_target()}
  end

  defp resolve_recheck_target(%{kind: :article, article: path}, actor) when is_map(path) do
    with {:ok, projection} <- CMS.front_desk_article(path, actor, mode: :management),
         article_id when is_binary(article_id) <- Map.get(projection, :id),
         {:ok, article} <-
           CMS.front_desk_article(article_id, nil, mode: :internal, view: :command_context),
         thread when thread in [:post, :blog, :changelog] <- Map.get(article, :thread) do
      {:ok, %{kind: :article, id: Map.get(article, :id)}}
    else
      _ -> {:error, AlertBoard.invalid_target()}
    end
  end

  defp resolve_recheck_target(%{kind: :comment, comment: path}, actor) when is_map(path) do
    with {:ok, %Comment{} = comment} <-
           CMS.front_desk_comment(path, actor, mode: :management, view: :with_author) do
      {:ok, %{kind: :comment, id: comment.id}}
    else
      _ -> {:error, AlertBoard.invalid_target()}
    end
  end

  defp resolve_recheck_target(_target, _actor) do
    {:error, AlertBoard.invalid_target()}
  end

  defp review_article_projection(path, actor) do
    case CMS.front_desk_article(path, actor, mode: :management) do
      {:ok, projection} -> {:ok, projection}
      {:error, _reason} -> CMS.front_desk_article(path, actor)
      _ -> CMS.front_desk_article(path, actor)
    end
  end

  defp review_comment(path, actor) do
    case CMS.front_desk_comment(path, actor, mode: :management, view: :with_author) do
      {:ok, %Comment{} = comment} -> {:ok, comment}
      {:error, _reason} -> CMS.front_desk_comment(path, actor)
      _ -> CMS.front_desk_comment(path, actor)
    end
  end

  defp parse_positive_id(value) when is_integer(value) and value > 0, do: {:ok, value}

  defp parse_positive_id(value) when is_binary(value) do
    case Integer.parse(value) do
      {id, ""} when id > 0 -> {:ok, id}
      _ -> {:error, AlertBoard.invalid_target()}
    end
  end

  defp parse_positive_id(_value), do: {:error, AlertBoard.invalid_target()}
end
