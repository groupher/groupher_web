defmodule GroupherServer.Analysis.MetricEvent.Persist do
  @moduledoc """
  Owns the Analysis metric-event fact table.

  This persistence owner supports producer-owned transactions and idempotent
  retries; aggregation and retention are separate workflows.

      producer transaction -> MetricEvent.Persist -> raw fact row
  """

  import Ecto.Query

  alias GroupherServer.{Analysis, CMS, Repo}
  alias Analysis.{Const, Model.MetricEvent}

  @doc """
  Appends an Article action using the non-visitor `all` dimension.

  ## Examples

      Analysis.MetricEvent.Persist.append_article_action(article, operation_id, :views)
  """
  @spec append_article_action(map(), Ecto.UUID.t(), atom(), keyword()) ::
          {:ok, :pass} | {:error, term()}
  def append_article_action(article, operation_id, metric, opts \\ [])

  def append_article_action(%{id: _id} = article, operation_id, metric, opts) do
    article_id = Map.get(article, :article_id) || Map.get(article, :id)

    with {:ok, %{artiment: article_type}} <-
           GroupherServer.CMS.artiment_matcher_match_interaction(article),
         {:ok, binding} <- article_binding(article, opts),
         true <- article_type in CMS.artiment_threads_article_enums(),
         true <- metric in Const.metrics(),
         {:ok, _article_id} <- cast_article_id(article_id) do
      append(%{
        operation_id: operation_id,
        community_id: binding.community_id,
        binding_id: binding.id,
        article_type: article_type,
        article_id: article_id,
        metric: metric,
        actor_type: :all,
        is_authenticated: false,
        policy_version: 0,
        occurred_at: Keyword.get(opts, :occurred_at, DateTime.utc_now(:second))
      })
    else
      _ -> {:error, :invalid_article_metric}
    end
  end

  def append_article_action(_article, _operation_id, _metric, _opts),
    do: {:error, :invalid_article_metric}

  @doc """
  Appends one metric fact; duplicate producer retries are successful no-ops.

  ## Examples

      Analysis.MetricEvent.Persist.append(%{operation_id: operation_id, metric: :views})
  """
  @spec append(map()) :: {:ok, :pass} | {:error, term()}
  def append(attrs) when is_map(attrs) do
    attrs = Map.merge(defaults(), attrs)

    with {:ok, _} <- validate(attrs) do
      case Repo.insert_all(MetricEvent, [attrs],
             on_conflict: :nothing,
             conflict_target: [:operation_id, :metric]
           ) do
        {1, _rows} -> {:ok, :pass}
        {0, _rows} -> {:ok, :pass}
        result -> {:error, {:metric_event_insert_failed, result}}
      end
    end
  end

  @doc """
  Marks metric events as failed for operational retry inspection.

  ## Examples

      Analysis.MetricEvent.Persist.record_failure(event_ids, reason)
  """
  @spec record_failure([Ecto.UUID.t()], term()) :: {:ok, :pass}
  def record_failure(ids, reason) when is_list(ids) do
    Repo.update_all(
      from(event in MetricEvent, where: event.id in ^ids),
      set: [last_error: inspect(reason)],
      inc: [attempts: 1]
    )

    {:ok, :pass}
  end

  defp article_binding(article, opts) do
    community_ref = Keyword.get(opts, :community_id) || Map.get(article, :community)
    stable_article_id = Map.get(article, :article_id) || Map.get(article, :id)

    case Keyword.get(opts, :binding_id) do
      binding_id when is_integer(binding_id) ->
        case Repo.get(CMS.Model.ArticleBinding, binding_id) do
          %CMS.Model.ArticleBinding{article_id: article_id} = binding
          when article_id == stable_article_id ->
            {:ok, binding}

          _ ->
            {:error, :invalid_article_binding}
        end

      _ ->
        case community_ref do
          community_id when is_integer(community_id) ->
            case Repo.get_by(CMS.Model.ArticleBinding,
                   article_id: stable_article_id,
                   community_id: community_id
                 ) do
              %CMS.Model.ArticleBinding{} = binding -> {:ok, binding}
              nil -> {:error, :article_binding_not_found}
            end

          _ ->
            case GroupherServer.CMS.articles_bindings_get(article, community_ref) do
              {:ok, %{binding: %CMS.Model.ArticleBinding{} = binding}} -> {:ok, binding}
              {:ok, %CMS.Model.ArticleBinding{} = binding} -> {:ok, binding}
              {:error, reason} -> {:error, reason}
            end
        end
    end
  end

  defp defaults do
    now = DateTime.utc_now(:second)

    %{
      value: 1,
      actor_type: :all,
      is_authenticated: false,
      policy_version: 0,
      occurred_at: now,
      inserted_at: now,
      updated_at: now
    }
  end

  defp validate(%{
         operation_id: operation_id,
         community_id: community_id,
         binding_id: binding_id,
         article_id: article_id,
         article_type: article_type,
         metric: metric,
         actor_type: actor_type,
         is_authenticated: is_authenticated
       }) do
    cond do
      Ecto.UUID.cast(operation_id) == :error -> {:error, :invalid_operation_id}
      not (is_integer(community_id) and community_id > 0) -> {:error, :invalid_community_id}
      not (is_integer(binding_id) and binding_id > 0) -> {:error, :invalid_binding_id}
      cast_article_id(article_id) == :error -> {:error, :invalid_article_id}
      article_type not in CMS.artiment_threads_article_enums() -> {:error, :invalid_article_type}
      metric not in Const.metrics() -> {:error, :invalid_metric}
      actor_type not in Const.actor_dimensions() -> {:error, :invalid_actor_type}
      not is_boolean(is_authenticated) -> {:error, :invalid_authentication_flag}
      true -> {:ok, :pass}
    end
  end

  defp validate(_attrs), do: {:error, :invalid_metric_event}

  defp cast_article_id(id) when is_integer(id) and id > 0, do: {:ok, id}
  defp cast_article_id(id) when is_binary(id), do: Ecto.UUID.cast(id)
  defp cast_article_id(_id), do: :error
end
