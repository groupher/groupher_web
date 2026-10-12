defmodule GroupherServer.CMS.Outbox.Status do
  @moduledoc """
  Maps the current Outbox lifecycle onto the rolling-deploy-safe database vocabulary.

  The database retains the original values so a previous release can keep
  reading and writing while a new release starts. A later, separately staged
  contract migration may rewrite the stored vocabulary after old writers are gone.

      application lifecycle atom
        -> Outbox.Status
        -> rolling-safe stored string
  """

  @behaviour Ecto.Type

  @statuses [:waiting, :running, :retrying, :done, :failed]
  @dumped %{
    waiting: "pending",
    running: "executing",
    retrying: "failed",
    done: "completed",
    failed: "dead"
  }
  @loaded Map.new(@dumped, fn {application, stored} -> {stored, application} end)

  @impl Ecto.Type
  def type, do: :string

  @impl Ecto.Type
  def cast(value) when value in @statuses, do: {:ok, value}

  def cast(value) when is_binary(value) do
    case Map.fetch(@loaded, value) do
      {:ok, status} -> {:ok, status}
      :error -> :error
    end
  end

  def cast(_value), do: :error

  @impl Ecto.Type
  def dump(value) do
    case Map.fetch(@dumped, value) do
      {:ok, stored} -> {:ok, stored}
      :error -> :error
    end
  end

  @impl Ecto.Type
  def load(value) when is_binary(value) do
    case Map.fetch(@loaded, value) do
      {:ok, status} -> {:ok, status}
      :error -> load_transitional_value(value)
    end
  end

  def load(_value), do: :error

  # Accept the unambiguous values written by an early local version of the
  # rename migration until its forward correction has run.
  defp load_transitional_value("waiting"), do: {:ok, :waiting}
  defp load_transitional_value("running"), do: {:ok, :running}
  defp load_transitional_value("retrying"), do: {:ok, :retrying}
  defp load_transitional_value("done"), do: {:ok, :done}
  defp load_transitional_value(_value), do: :error

  @impl Ecto.Type
  def equal?(left, right), do: left == right

  @impl Ecto.Type
  def embed_as(_format), do: :self
end
