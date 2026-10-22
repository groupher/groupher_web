defmodule GroupherServer.ReviewBot.Registration do
  @moduledoc """
  Pins deterministic and provider checks to one committed content snapshot.

      CMS command transaction
        -> immutable RuleSet + content token
        -> completed word Check / queued provider Check
        -> typed Jobs intent
  """

  import Ecto.Query

  alias GroupherServer.{AlertBoard, Jobs, Repo, ReviewBot}
  alias AlertBoard.Model.{ReviewConfig, RuleSet}
  alias ReviewBot.{Config, ErrorCat, WordRules}
  alias ReviewBot.Model.Check

  @payload_ttl_seconds 86_400

  @doc """
  Registers checks inside the CMS resource transaction.

  The target map must carry the canonical target/scope/content token; content
  contains canonical title/body and immutable asset references. Signed media
  URLs are never persisted.

  ## Examples

      Registration.register_in_transaction(target, content, config, command_ref)
      #=> {:ok, %{checks: checks, word_result: result}} | {:error, reason}
  """
  @spec register_in_transaction(map(), map(), ReviewConfig.t(), Ecto.UUID.t()) ::
          {:ok, map()} | {:error, term()}
  def register_in_transaction(target, content, %ReviewConfig{} = config, operation_ref)
      when is_map(target) and is_map(content) and is_binary(operation_ref) do
    config = Repo.preload(config, :ruleset)

    with true <- Repo.in_transaction?(),
         {:ok, inputs} <- validate_inputs(target, content, config),
         {:ok, word_result} <- evaluate_words(inputs, config.ruleset),
         {:ok, checks} <- persist_checks(inputs, config, word_result, operation_ref) do
      {:ok, %{checks: checks, word_result: word_result}}
    else
      false -> {:error, :review_registration_requires_transaction}
      {:error, _reason} = error -> error
      _ -> {:error, ErrorCat.invalid_config()}
    end
  end

  def register_in_transaction(_target, _content, _config, _operation_ref) do
    {:error, ErrorCat.invalid_config()}
  end

  defp validate_inputs(target, content, %ReviewConfig{} = config) do
    target_key = Map.get(target, :target_key)
    human_epoch = Map.get(target, :human_epoch, 0)
    scope_key = config.scope_key
    content_token = Map.get(content, :content_token)
    title = Map.get(content, :title)
    body = Map.get(content, :body)
    ruleset = config.ruleset

    cond do
      not is_binary(target_key) or target_key == "" ->
        {:error, ErrorCat.invalid_config()}

      not is_integer(human_epoch) or human_epoch < 0 ->
        {:error, ErrorCat.invalid_config()}

      not is_binary(content_token) or content_token == "" ->
        {:error, ErrorCat.invalid_config()}

      not is_binary(title) or not is_binary(body) ->
        {:error, ErrorCat.invalid_config()}

      not is_nil(config.ruleset_id) and is_nil(ruleset) ->
        {:error, ErrorCat.invalid_config()}

      effective_mode(config, target) == :ai_first and is_nil(ruleset) ->
        {:error, ErrorCat.invalid_config()}

      is_nil(ruleset) ->
        {:ok,
         %{
           target_key: target_key,
           human_epoch: human_epoch,
           scope_key: scope_key,
           content_token: content_token,
           title: title,
           body: body,
           mode: effective_mode(config, target),
           ruleset: nil,
           images: [],
           required_modalities: [],
           trigger: trigger(target)
         }}

      true ->
        {:ok,
         %{
           target_key: target_key,
           human_epoch: human_epoch,
           scope_key: scope_key,
           content_token: content_token,
           title: title,
           body: body,
           mode: effective_mode(config, target),
           ruleset: ruleset,
           images: normalize_images(Map.get(content, :images, [])),
           required_modalities: ruleset.required_modalities || [],
           trigger: trigger(target)
         }}
    end
  end

  defp evaluate_words(%{ruleset: nil}, _ruleset), do: {:ok, nil}

  defp evaluate_words(inputs, %RuleSet{} = ruleset) do
    if Enum.any?(rule_items(ruleset), &(rule_value(&1, "kind") == "word")) do
      WordRules.check(inputs.title, inputs.body, ruleset)
    else
      {:ok, nil}
    end
  end

  defp evaluate_words(_inputs, _ruleset), do: {:error, ErrorCat.invalid_config()}

  defp persist_checks(%{ruleset: nil}, _config, _word_result, _operation_ref) do
    {:ok, []}
  end

  defp persist_checks(inputs, %ReviewConfig{} = config, word_result, operation_ref) do
    items = rule_items(inputs.ruleset)
    word_rules = Enum.filter(items, &(rule_value(&1, "kind") == "word"))
    model_rules = Enum.filter(items, &(rule_value(&1, "kind") == "judge"))
    model_rules = if config.background_check, do: model_rules, else: []

    with {:ok, generation} <- next_generation(inputs, config) do
      cond do
        config.publish_mode == :ai_first and model_rules == [] ->
          {:error, ErrorCat.invalid_config()}

        model_rules != [] ->
          with {:ok, _profile} <- Config.profile(inputs.ruleset.provider_profile),
               {:ok, word_check} <-
                 maybe_insert_word_check(
                   inputs,
                   config,
                   word_rules,
                   word_result,
                   operation_ref,
                   generation
                 ),
               {:ok, model_check} <-
                 insert_model_check(
                   inputs,
                   config,
                   model_rules,
                   word_result,
                   operation_ref,
                   generation + if(word_rules == [], do: 0, else: 1)
                 ),
               {:ok, _job} <- Jobs.review_bot_check(model_check.id) do
            {:ok, Enum.reject([word_check, model_check], &is_nil/1)}
          end

        word_rules != [] ->
          with {:ok, check} <-
                 insert_word_check(
                   inputs,
                   config,
                   word_rules,
                   word_result,
                   operation_ref,
                   generation
                 ) do
            {:ok, [check]}
          end

        true ->
          {:ok, []}
      end
    end
  end

  defp next_generation(
         %{trigger: trigger} = inputs,
         %ReviewConfig{ruleset: %RuleSet{} = ruleset} = config
       )
       when trigger in [:manual, :binding] do
    target_key = inputs.target_key
    scope_key = config.scope_key
    content_token = inputs.content_token
    ruleset_id = ruleset.id
    config_version = config.version

    generation =
      from(check in Check,
        where:
          check.target_key == ^target_key and check.scope_key == ^scope_key and
            check.content_token == ^content_token and check.ruleset_id == ^ruleset_id and
            check.config_version == ^config_version,
        select: max(check.generation)
      )
      |> Repo.one()

    {:ok, if(is_integer(generation), do: generation + 1, else: 1)}
  end

  defp next_generation(_inputs, _config), do: {:ok, 1}

  defp maybe_insert_word_check(
         _inputs,
         _config,
         [],
         _word_result,
         _operation_ref,
         _generation
       ) do
    {:ok, nil}
  end

  defp maybe_insert_word_check(
         inputs,
         config,
         word_rules,
         word_result,
         operation_ref,
         generation
       ) do
    insert_word_check(inputs, config, word_rules, word_result, operation_ref, generation)
  end

  defp insert_word_check(inputs, config, _word_rules, word_result, operation_ref, generation) do
    matches = word_result.matches
    result = word_result_result(matches)

    insert_check(%{
      target_key: inputs.target_key,
      human_epoch: inputs.human_epoch,
      scope_key: config.scope_key,
      content_token: inputs.content_token,
      ruleset_id: inputs.ruleset.id,
      config_version: config.version,
      mode: inputs.mode,
      generation: generation,
      trigger: inputs.trigger,
      state: :completed,
      result: result,
      coverage: %{"text" => "complete", "image" => "unsupported"},
      signals: %{"items" => word_result.signals},
      operation_ref: stable_operation_ref(operation_ref, inputs.scope_key, generation)
    })
  end

  defp insert_model_check(inputs, config, model_rules, word_result, operation_ref, generation) do
    now = DateTime.utc_now(:second)
    images = inputs.images

    with {:ok, check} <-
           insert_check(%{
             target_key: inputs.target_key,
             human_epoch: inputs.human_epoch,
             scope_key: config.scope_key,
             content_token: inputs.content_token,
             ruleset_id: inputs.ruleset.id,
             config_version: config.version,
             mode: inputs.mode,
             generation: generation,
             trigger: inputs.trigger,
             state: :queued,
             coverage: %{},
             signals: %{"items" => if(word_result, do: word_result.signals, else: [])},
             payload: %{
               "text" => %{"title" => inputs.title, "body" => inputs.body},
               "images" => images,
               "rules" => model_rules,
               "prompt" => inputs.ruleset.prompt,
               "provider_profile" => inputs.ruleset.provider_profile,
               "required_modalities" => inputs.required_modalities
             },
             payload_expires_at: DateTime.add(now, @payload_ttl_seconds, :second),
             operation_ref: stable_operation_ref(operation_ref, inputs.scope_key, generation)
           }) do
      {:ok, check}
    end
  end

  defp insert_check(attrs) do
    changeset = Check.changeset(%Check{}, attrs)

    case Repo.insert(changeset, mode: :savepoint) do
      {:ok, check} ->
        {:ok, check}

      {:error, changeset} ->
        identity =
          Map.take(attrs, [
            :target_key,
            :scope_key,
            :content_token,
            :ruleset_id,
            :config_version,
            :generation
          ])

        case Repo.get_by(Check, identity) do
          %Check{} = check -> {:ok, check}
          nil -> {:error, changeset}
        end
    end
  end

  defp normalize_images(images) when is_list(images) do
    Enum.map(images, fn image ->
      %{
        "asset_id" => Map.get(image, :asset_id) || Map.get(image, "asset_id"),
        "immutable_version" =>
          Map.get(image, :immutable_version) || Map.get(image, "immutable_version")
      }
    end)
  end

  defp normalize_images(_images), do: []

  defp rule_items(%RuleSet{rules: %{"items" => items}}) when is_list(items), do: items
  defp rule_items(%RuleSet{rules: %{items: items}}) when is_list(items), do: items
  defp rule_items(_ruleset), do: []

  defp rule_value(rule, "kind"), do: Map.get(rule, "kind", Map.get(rule, :kind))
  defp rule_value(rule, "id"), do: Map.get(rule, "id", Map.get(rule, :id))

  defp word_result_result(matches) do
    cond do
      Enum.any?(matches, &(&1.action == "restrict")) -> :restrict
      matches != [] -> :review
      true -> :pass
    end
  end

  defp stable_operation_ref(base, scope_key, generation) do
    <<a::48, _version::4, b::12, _variant::2, c::62, _rest::binary>> =
      :crypto.hash(:sha256, "#{base}:#{scope_key}:#{generation}")

    uuid_bytes = <<a::48, 5::4, b::12, 2::2, c::62>>

    <<part_1::binary-size(8), part_2::binary-size(4), part_3::binary-size(4),
      part_4::binary-size(4), part_5::binary-size(12)>> =
      Base.encode16(uuid_bytes, case: :lower)

    Enum.join([part_1, part_2, part_3, part_4, part_5], "-")
  end

  defp trigger(target) do
    case Map.get(target, :trigger) do
      trigger when trigger in [:submit, :edit, :report, :manual, :binding] -> trigger
      _ -> :submit
    end
  end

  defp effective_mode(%ReviewConfig{edit_mode: mode}, %{trigger: :edit}), do: mode
  defp effective_mode(%ReviewConfig{publish_mode: mode}, _target), do: mode
end
