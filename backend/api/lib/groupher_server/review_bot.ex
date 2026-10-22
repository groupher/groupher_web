defmodule GroupherServer.ReviewBot do
  @moduledoc """
  Routes one validated content snapshot to an operator-approved provider profile.

      immutable CheckInput -> profile validation -> adapter -> CheckOutput
  """

  alias __MODULE__.{CheckInput, Config, ErrorCat, Execution, Registration}

  @doc "Resolves a configured provider profile for validation and execution."
  @spec profile(String.t() | nil) :: {:ok, map()} | {:error, term()}
  defdelegate profile(profile_id), to: Config

  @doc "Extracts current inline image references from a Comment body."
  @spec comment_images(String.t() | nil, pos_integer()) :: [map()]
  defdelegate comment_images(body_json, community_id), to: GroupherServer.ReviewBot.Media

  @doc "Runs a pinned content check through the selected provider profile."
  @spec check(CheckInput.t(), String.t()) ::
          {:ok, GroupherServer.ReviewBot.CheckOutput.t()} | {:error, term()}
  def check(%CheckInput{} = input, profile_id) when is_binary(profile_id) do
    with {:ok, profile} <- Config.profile(profile_id),
         {:ok, adapter} <- Config.adapter(profile) do
      adapter.check(input, profile)
    end
  end

  def check(_input, _profile_id), do: {:error, ErrorCat.invalid_config()}

  @doc """
  Registers deterministic and provider checks in the caller's resource transaction.

  ## Examples

      ReviewBot.register_in_transaction(target, snapshot, config, operation_ref)
      #=> {:ok, %{checks: checks, word_result: result}} | {:error, reason}
  """
  @spec register_in_transaction(map(), map(), term(), Ecto.UUID.t()) ::
          {:ok, map()} | {:error, term()}
  defdelegate register_in_transaction(target, content, config, operation_ref), to: Registration

  @doc """
  Executes one queued Check with Oban retry state.

  ## Examples

      ReviewBot.execute_check(check_id, 1, 3)
      #=> {:ok, :pass | :superseded} | {:error, reason}
  """
  @spec execute_check(Ecto.UUID.t(), pos_integer(), pos_integer()) ::
          {:ok, :pass | :superseded} | {:error, term()}
  defdelegate execute_check(check_id, attempt, max_attempts), to: Execution

  @doc """
  Recovers provider checks whose workers stopped while an Attempt was running.

  ## Examples

      ReviewBot.recover_stale_checks()
      #=> {:ok, recovered_count} | {:error, reason}
  """
  @spec recover_stale_checks() :: {:ok, non_neg_integer()} | {:error, term()}
  defdelegate recover_stale_checks(), to: Execution

  @doc "Invalidates queued or running checks after an authoritative human decision."
  @spec supersede_in_flight_checks(String.t(), String.t()) :: {:ok, :pass} | {:error, term()}
  defdelegate supersede_in_flight_checks(target_key, scope_key), to: Execution

  @doc """
  Applies one completed Check under a caller-locked CMS Lifecycle transaction.

  ## Examples

      ReviewBot.apply_completed_check(check, target)
      #=> {:ok, :pass} | {:error, reason}
  """
  @spec apply_completed_check(GroupherServer.ReviewBot.Model.Check.t(), map()) ::
          {:ok, :pass} | {:error, term()}
  defdelegate apply_completed_check(check, target), to: Execution
end
