defmodule GroupherServer.RequestActor do
  @moduledoc """
  Classifies the trusted subject behind one request.

  Public callers provide complete verified business objects. Internal Evidence
  selects exactly one typed source before Classifier creates the immutable
  shared Classification. Caller-selected actor fields and bare credential IDs
  are ignored.

      trusted request objects
        -> Evidence.select/1
        -> Classifier.classify/1
        -> Classification
  """

  alias GroupherServer.RequestActor
  alias RequestActor.{Classification, Classifier, Evidence}

  @doc """
  Classifies one request from complete trusted identity and credential objects.

  ## Examples

      RequestActor.classify(account_session: user)
  """
  @spec classify(keyword()) ::
          {:ok, Classification.t()} | {:error, :conflicting_evidence | :invalid_evidence}
  def classify(opts) when is_list(opts) do
    with {:ok, evidence} <- Evidence.select(opts) do
      {:ok, Classifier.classify(evidence)}
    end
  end

  def classify(_opts), do: {:error, :invalid_evidence}

  @doc """
  Delegates RequestActor.Const.actor_types/0 through the RequestActor Context boundary.

  ## Examples

      iex> GroupherServer.RequestActor.const_actor_types(...)
  """
  defdelegate const_actor_types(), to: GroupherServer.RequestActor.Const, as: :actor_types
end
