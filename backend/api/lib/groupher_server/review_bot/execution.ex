defmodule GroupherServer.ReviewBot.Execution do
  @moduledoc """
  Executes one queued provider Check with bounded Attempt records.

      queued Check
        -> transaction: running Check + Attempt
        -> provider adapter outside transaction
        -> transaction: terminal/retryable result
  """

  import Ecto.Query

  alias GroupherServer.{AlertBoard, CMS, Repo, ReviewBot}
  alias AlertBoard.Model.RuleSet
  alias ReviewBot.{CheckInput, CheckOutput, Config, ErrorCat, Media, Policy}
  alias ReviewBot.Model.{Attempt, Check}

  @doc """
  Runs a queued Check, recording each provider call without persisting raw content.

  ## Examples

      Execution.execute_check(check_id, 1, 3)
      #=> {:ok, :pass} | {:error, reason}
  """
  @spec execute_check(Ecto.UUID.t(), pos_integer(), pos_integer()) ::
          {:ok, :pass | :superseded} | {:error, term()}
  def execute_check(check_id, job_attempt, max_attempts)
      when is_binary(check_id) and is_integer(job_attempt) and is_integer(max_attempts) do
    case claim(check_id) do
      {:ok, :already_finished} ->
        {:ok, :pass}

      {:ok, :superseded} ->
        {:ok, :superseded}

      {:ok, claim} ->
        with {:ok, output} <- run_provider(claim),
             {:ok, result} <- complete(claim, output) do
          if result == :superseded, do: {:ok, :superseded}, else: {:ok, :pass}
        else
          {:error, reason} -> fail(check_id, reason, job_attempt, max_attempts)
        end

      {:error, _reason} = error ->
        error
    end
  end

  def execute_check(_check_id, _job_attempt, _max_attempts) do
    {:error, ErrorCat.check_not_found()}
  end

  @doc """
  Applies a completed Check to its already locked Lifecycle in the caller transaction.

  ## Examples

      Execution.apply_completed_check(check, target)
      #=> {:ok, :pass} | {:error, reason}
  """
  @spec apply_completed_check(Check.t(), map()) :: {:ok, :pass} | {:error, term()}
  def apply_completed_check(%Check{state: :completed} = check, target)
      when is_map(target) and is_map_key(target, :lifecycle) do
    cond do
      not Repo.in_transaction?() ->
        {:error, GroupherServer.CMS.error_cat_review_transition_requires_transaction()}

      not current_revision?(target.lifecycle, check) ->
        {:error, ErrorCat.stale_check()}

      true ->
        with {:ok, _application} <- apply_check_result(check, target) do
          {:ok, :pass}
        end
    end
  end

  def apply_completed_check(%Check{state: :completed}, _target) do
    {:error, GroupherServer.CMS.error_cat_review_transition_requires_transaction()}
  end

  def apply_completed_check(_check, _target), do: {:error, ErrorCat.stale_check()}

  defp claim(check_id) do
    Repo.transact_result(fn ->
      case Repo.get(Check, check_id) do
        nil ->
          {:error, ErrorCat.check_not_found()}

        %Check{state: :queued} = snapshot ->
          with {:ok, target} <-
                 CMS.load_review_target_for_update(snapshot.target_key, snapshot.scope_key) do
            claim_locked(snapshot.id, target)
          end

        %Check{state: :superseded} ->
          {:ok, :superseded}

        %Check{state: state} when state in [:completed, :failed] ->
          {:ok, :already_finished}

        %Check{} ->
          {:error, ErrorCat.stale_check()}
      end
    end)
  end

  defp claim_locked(check_id, target) do
    case locked_check(check_id) do
      %Check{state: :queued} = check when is_map(check.payload) ->
        if current_revision?(target.lifecycle, check) do
          claim_queued(check)
        else
          supersede_queued(check)
        end

      %Check{state: :superseded} ->
        {:ok, :superseded}

      %Check{state: state} when state in [:completed, :failed] ->
        {:ok, :already_finished}

      nil ->
        {:error, ErrorCat.check_not_found()}

      %Check{} ->
        {:error, ErrorCat.stale_check()}
    end
  end

  defp claim_queued(check) do
    payload = check.payload
    now = DateTime.utc_now(:second)
    number = check.active_attempt + 1

    attempt_changeset =
      Attempt.changeset(%Attempt{}, %{
        check_id: check.id,
        number: number,
        state: :running,
        started_at: now,
        provider_profile: payload["provider_profile"],
        request_id: Ecto.UUID.generate()
      })

    with {:ok, attempt} <- Repo.insert(attempt_changeset),
         {:ok, running} <-
           check
           |> Check.changeset(%{state: :running, active_attempt: number})
           |> Repo.update(),
         %RuleSet{} = ruleset <- Repo.get(RuleSet, check.ruleset_id) do
      {:ok, %{check: running, attempt: attempt, ruleset: ruleset, payload: payload}}
    else
      nil -> {:error, ErrorCat.invalid_config()}
      {:error, reason} -> {:error, reason}
      _ -> {:error, ErrorCat.invalid_config()}
    end
  end

  defp supersede_queued(check) do
    check
    |> Check.changeset(%{state: :superseded, payload: nil, payload_expires_at: nil})
    |> Repo.update()
    |> case do
      {:ok, _superseded} -> {:ok, :superseded}
      {:error, reason} -> {:error, reason}
    end
  end

  defp run_provider(%{check: check, attempt: attempt, ruleset: ruleset, payload: payload}) do
    with {:ok, payload} <- Media.attach_signed_urls(payload),
         {:ok, input} <- check_input(check, attempt, payload),
         {:ok, profile} <- Config.profile(ruleset.provider_profile),
         {:ok, adapter} <- Config.adapter(profile),
         {:ok, %CheckOutput{} = output} <- adapter.check(input, profile) do
      {:ok, output}
    end
  end

  defp check_input(check, attempt, payload) do
    images = Map.get(payload, "images", [])
    modalities = Map.get(payload, "required_modalities", [])

    cond do
      "image" in modalities and images == [] ->
        {:error, ErrorCat.unsupported_media()}

      Enum.any?(images, &(not is_binary(Map.get(&1, "signed_read_url")))) ->
        {:error, ErrorCat.unsupported_media()}

      true ->
        CheckInput.new(%{
          request_id: attempt.request_id,
          check_id: check.id,
          content_token: check.content_token,
          rules: Map.get(payload, "rules", []),
          prompt: Map.get(payload, "prompt"),
          text: atomize_text(Map.get(payload, "text", %{})),
          images: Enum.map(images, &atomize_image/1),
          required_modalities: Enum.map(modalities, &String.to_existing_atom/1)
        })
    end
  rescue
    _ -> {:error, ErrorCat.invalid_config()}
  end

  defp complete(%{check: check, attempt: attempt, payload: payload}, %CheckOutput{} = output) do
    result =
      Policy.evaluate(
        output,
        Map.get(payload, "rules", []),
        Map.get(payload, "required_modalities", [])
      )

    now = DateTime.utc_now(:second)

    Repo.transact_result(fn ->
      with {:ok, target} <- CMS.load_review_target_for_update(check.target_key, check.scope_key) do
        complete_locked(target, check, attempt, result, output, now)
      end
    end)
  end

  defp complete_locked(target, check, attempt, result, output, now) do
    case locked_check(check.id) do
      %Check{state: :running, active_attempt: number} = current when number == attempt.number ->
        if current_revision?(target.lifecycle, current) do
          persist_completed_result(current, target, attempt, result, output, now)
        else
          supersede(current, attempt, now)
        end

      %Check{state: :superseded} ->
        abandon(attempt, now)

      nil ->
        {:error, ErrorCat.check_not_found()}

      %Check{} ->
        {:error, ErrorCat.stale_check()}
    end
  end

  defp persist_completed_result(current, target, attempt, result, output, now) do
    with {:ok, _attempt} <-
           attempt
           |> Attempt.changeset(%{
             state: :succeeded,
             finished_at: now,
             latency_ms: DateTime.diff(now, attempt.started_at, :millisecond)
           })
           |> Repo.update(),
         {:ok, updated} <-
           current
           |> Check.changeset(%{
             state: :completed,
             result: result.action,
             coverage: stringify_keys(output.coverage),
             signals: %{"items" => result.signals},
             payload: nil,
             payload_expires_at: nil
           })
           |> Repo.update(),
         {:ok, _application} <- apply_check_result(updated, target) do
      {:ok, updated}
    end
  end

  defp current_revision?(lifecycle, check) do
    lifecycle.review_epoch == check.human_epoch and
      lifecycle.review_content_token == check.content_token
  end

  defp supersede(check, attempt, now) do
    with {:ok, _attempt} <-
           attempt
           |> Attempt.changeset(%{state: :abandoned, finished_at: now})
           |> Repo.update(),
         {:ok, _check} <-
           check
           |> Check.changeset(%{
             state: :superseded,
             payload: nil,
             payload_expires_at: nil
           })
           |> Repo.update() do
      {:ok, :superseded}
    end
  end

  defp apply_check_result(check, target) do
    with {:ok, active} <- CMS.active_review_restrictions(target.lifecycle, check.scope_key) do
      plan = AlertBoard.review_check(check, active)
      apply_review_plan(check, target, plan)
    end
  end

  defp apply_review_plan(check, target, %{action: action} = plan)
       when action in [:review, :restrict, :pass] do
    needs_case? = action in [:review, :restrict]

    with {:ok, case_record} <- maybe_open_case(needs_case?, check, target),
         {:ok, added_ids} <- apply_additions(plan.add_restrictions, check, target, case_record),
         {:ok, :pass} <-
           CMS.end_review_restrictions(
             target.lifecycle,
             check.scope_key,
             plan.end_restriction_ids,
             check.operation_ref,
             "policy_check_passed"
           ),
         {:ok, _decision} <-
           maybe_record_policy_decision(
             action,
             check,
             case_record,
             added_ids ++ plan.end_restriction_ids
           ) do
      {:ok, %{action: action, case: case_record, restriction_ids: added_ids}}
    end
  end

  defp maybe_open_case(true, check, target) do
    AlertBoard.open_check_case(check, target)
  end

  defp maybe_open_case(false, _check, _target), do: {:ok, nil}

  defp apply_additions(additions, check, target, case_record) do
    Enum.reduce_while(additions, {:ok, []}, fn attrs, {:ok, ids} ->
      attrs =
        attrs
        |> Map.put(:case_id, case_record && case_record.id)
        |> Map.put(:check_id, check.id)
        |> Map.put(:created_by_operation_ref, check.operation_ref)

      case CMS.apply_review_restriction(target.lifecycle, attrs) do
        {:ok, restriction} -> {:cont, {:ok, [restriction.id | ids]}}
        {:error, reason} -> {:halt, {:error, reason}}
      end
    end)
    |> case do
      {:ok, ids} -> {:ok, Enum.reverse(ids)}
      {:error, _reason} = error -> error
    end
  end

  defp maybe_record_policy_decision(:pass, check, case_record, ids) do
    AlertBoard.record_policy_decision(check, case_record, :approve, ids)
  end

  defp maybe_record_policy_decision(:restrict, check, case_record, ids) do
    AlertBoard.record_policy_decision(check, case_record, :restrict, ids)
  end

  defp maybe_record_policy_decision(:review, _check, _case_record, _ids), do: {:ok, nil}

  defp fail(check_id, reason, job_attempt, max_attempts) do
    retryable? = match?(%{retryable: true}, reason)
    exhausted? = not retryable? or job_attempt >= max_attempts
    now = DateTime.utc_now(:second)

    Repo.transact_result(fn ->
      case locked_check(check_id) do
        %Check{state: :running, active_attempt: number} = check ->
          attempt = Repo.get_by(Attempt, check_id: check.id, number: number)

          if attempt do
            attempt_state = if exhausted?, do: :terminal_error, else: :retryable_error

            with {:ok, _attempt} <-
                   attempt
                   |> Attempt.changeset(%{
                     state: attempt_state,
                     finished_at: now,
                     error_code: error_code(reason)
                   })
                   |> Repo.update(),
                 {:ok, _updated} <-
                   check
                   |> Check.changeset(%{
                     state: if(exhausted?, do: :failed, else: :queued),
                     payload: if(exhausted?, do: nil, else: check.payload),
                     payload_expires_at: if(exhausted?, do: nil, else: check.payload_expires_at)
                   })
                   |> Repo.update() do
              if exhausted?, do: {:ok, :terminal}, else: {:error, reason}
            end
          else
            {:error, ErrorCat.stale_check()}
          end

        %Check{state: :superseded} ->
          {:ok, :superseded}

        %Check{} ->
          {:ok, :terminal}

        nil ->
          {:error, ErrorCat.check_not_found()}
      end
    end)
    |> case do
      {:ok, :terminal} -> {:ok, :pass}
      {:ok, :superseded} -> {:ok, :superseded}
      {:error, _reason} = error -> error
    end
  end

  defp abandon(attempt, now) do
    attempt
    |> Attempt.changeset(%{state: :abandoned, finished_at: now})
    |> Repo.update()
    |> case do
      {:ok, _attempt} -> {:ok, :superseded}
      {:error, reason} -> {:error, reason}
    end
  end

  defp locked_check(check_id) do
    Check
    |> where([check], check.id == ^check_id)
    |> lock("FOR UPDATE")
    |> Repo.one()
  end

  defp stringify_keys(map) do
    Map.new(map, fn {key, value} -> {Atom.to_string(key), Atom.to_string(value)} end)
  end

  defp atomize_text(%{"title" => title, "body" => body}), do: %{title: title, body: body}
  defp atomize_text(%{title: title, body: body}), do: %{title: title, body: body}

  defp atomize_image(%{
         "asset_id" => asset_id,
         "immutable_version" => version,
         "signed_read_url" => url
       }) do
    %{asset_id: asset_id, immutable_version: version, signed_read_url: url}
  end

  defp atomize_image(image) when is_map(image) do
    Map.new(image, fn
      {key, value} when is_atom(key) -> {key, value}
      {key, value} when is_binary(key) -> {String.to_existing_atom(key), value}
    end)
  end

  defp error_code(%{reason: reason}) when is_atom(reason), do: Atom.to_string(reason)
  defp error_code(reason) when is_atom(reason), do: Atom.to_string(reason)
  defp error_code(_reason), do: "provider_error"
end
