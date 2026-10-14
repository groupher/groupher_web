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

  def append_article_action(_article, _operation_id, _metric, _opts) do
    {:error, :invalid_article_metric}
  end

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

    case Keyword.get(opts, :binding_id) do
      binding_id when is_integer(binding_id) ->
        CMS.articles_resolve_binding(
          article,
          {:binding_id, binding_id, explicit_community_id(opts)}
        )

      _ ->
        case community_ref do
          community_id when is_integer(community_id) ->
            CMS.articles_resolve_binding(article, community_id)

          _ ->
            case GroupherServer.CMS.articles_bindings_get(article, community_ref) do
              {:ok, %{binding: %CMS.Model.ArticleBinding{} = binding}} -> {:ok, binding}
              {:ok, %CMS.Model.ArticleBinding{} = binding} -> {:ok, binding}
              {:error, reason} -> {:error, reason}
            end
        end
    end
  end

  defp explicit_community_id(opts) do
    case Keyword.get(opts, :community_id) do
      community_id when is_integer(community_id) -> community_id
      _ -> nil
    end
  end

  @doc """
  Moves Analysis facts for one binding to its new Community inside the caller transaction.

  ## Examples

      Analysis.MetricEvent.Persist.reassign_binding(binding_id, destination_community_id)
  """
  @spec reassign_binding(pos_integer(), pos_integer()) :: {:ok, :pass}
  def reassign_binding(binding_id, community_id)
      when is_integer(binding_id) and is_integer(community_id) do
    Repo.update_all(
      from(event in MetricEvent, where: event.binding_id == ^binding_id),
      set: [community_id: community_id]
    )

    Repo.update_all(
      from(metric in Analysis.Model.ArticleHourlyMetric, where: metric.binding_id == ^binding_id),
      set: [community_id: community_id]
    )

    {:ok, :pass}
  end

  @doc """
  Merges raw and hourly metric history into an existing destination Binding.

  ## Examples

      Analysis.MetricEvent.Persist.merge_binding(source_id, destination_id, community_id)
  """
  @spec merge_binding(pos_integer(), pos_integer(), pos_integer()) ::
          {:ok, :pass} | {:error, term()}
  def merge_binding(source_binding_id, destination_binding_id, community_id)
      when is_integer(source_binding_id) and is_integer(destination_binding_id) and
             is_integer(community_id) do
    Repo.update_all(
      from(event in MetricEvent, where: event.binding_id == ^source_binding_id),
      set: [binding_id: destination_binding_id, community_id: community_id]
    )

    with {:ok, _result} <-
           merge_hourly_metrics(source_binding_id, destination_binding_id, community_id) do
      Repo.delete_all(
        from(metric in Analysis.Model.ArticleHourlyMetric,
          where: metric.binding_id == ^source_binding_id
        )
      )

      {:ok, :pass}
    end
  end

  defp merge_hourly_metrics(source_binding_id, destination_binding_id, community_id) do
    Repo.query(
      """
      INSERT INTO cms.article_hourly_metrics (
        community_id,
        binding_id,
        article_type,
        article_id,
        bucket_started_at,
        metric,
        actor_type,
        is_authenticated,
        policy_version,
        value,
        inserted_at,
        updated_at
      )
      SELECT
        $3,
        $2,
        article_type,
        article_id,
        bucket_started_at,
        metric,
        actor_type,
        is_authenticated,
        policy_version,
        value,
        inserted_at,
        updated_at
      FROM cms.article_hourly_metrics
      WHERE binding_id = $1
      ON CONFLICT (
        community_id,
        binding_id,
        article_type,
        article_id,
        bucket_started_at,
        metric,
        actor_type,
        is_authenticated,
        policy_version
      )
      DO UPDATE SET
        value = cms.article_hourly_metrics.value + EXCLUDED.value,
        inserted_at = LEAST(cms.article_hourly_metrics.inserted_at, EXCLUDED.inserted_at),
        updated_at = GREATEST(cms.article_hourly_metrics.updated_at, EXCLUDED.updated_at)
      """,
      [source_binding_id, destination_binding_id, community_id]
    )
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
    checks = [
      {Ecto.UUID.cast(operation_id) != :error, :invalid_operation_id},
      {positive_integer?(community_id), :invalid_community_id},
      {positive_integer?(binding_id), :invalid_binding_id},
      {cast_article_id(article_id) != :error, :invalid_article_id},
      {article_type in CMS.artiment_threads_article_enums(), :invalid_article_type},
      {metric in Const.metrics(), :invalid_metric},
      {actor_type in Const.actor_dimensions(), :invalid_actor_type},
      {is_boolean(is_authenticated), :invalid_authentication_flag}
    ]

    case Enum.find(checks, fn {valid?, _reason} -> not valid? end) do
      nil -> {:ok, :pass}
      {_valid?, reason} -> {:error, reason}
    end
  end

  defp validate(_attrs), do: {:error, :invalid_metric_event}

  defp cast_article_id(id) when is_integer(id) and id > 0, do: {:ok, id}
  defp cast_article_id(id) when is_binary(id), do: Ecto.UUID.cast(id)
  defp cast_article_id(_id), do: :error

  defp positive_integer?(value), do: is_integer(value) and value > 0
end
