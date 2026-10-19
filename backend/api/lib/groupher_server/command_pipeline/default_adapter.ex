defmodule GroupherServer.CommandPipeline.DefaultAdapter do
  @moduledoc """
  No-op adapter for direct pipelines that do not need context-specific effects.

      direct Command -> generic runner -> DefaultAdapter -> ordinary result

  Receipt execution and rejection recording fail closed until a context supplies
  an adapter implementing those boundaries.
  """

  @behaviour GroupherServer.CommandPipeline.Adapter

  @impl true
  def validate_contract(%{pipeline: :receipt_pipeline}) do
    {:error, :default_adapter_does_not_support_receipt_pipeline}
  end

  def validate_contract(%{stages: stages}) do
    if :on_rejection in stages do
      {:error, :default_adapter_does_not_support_on_rejection}
    else
      {:ok, :pass}
    end
  end

  @impl true
  def validate_command_id(_command_id), do: {:error, :receipt_adapter_unconfigured}

  @impl true
  def execute_receipt(_module, _contract, _input, _command_id, _callback) do
    {:error, :receipt_adapter_unconfigured}
  end

  @impl true
  def normalize_gate_result(result), do: result
  @impl true
  def normalize_transaction_error(reason), do: reason
  @impl true
  def normalize_source(source), do: source
  @impl true
  def valid_source?(_source), do: true
  @impl true
  def record_rejection(_log), do: {:error, :rejection_recording_unconfigured}
end
