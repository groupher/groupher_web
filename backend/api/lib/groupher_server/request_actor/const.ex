defmodule GroupherServer.RequestActor.Const do
  @moduledoc """
  Closed vocabulary for the platform request-actor classifier.

  This module owns classification vocabulary only. It does not decide whether
  a request is counted, authorized, rate limited, or rendered differently.

  Business position:

      RequestActor classifier -> Const vocabulary -> schemas and consumers
  """

  @actor_types [:human, :agent, :crawler, :unknown]
  @confidences [:verified, :probable, :unknown]

  @classified_by [
    :account_session,
    :signed_anonymous_session,
    :agent_credential,
    :delegation_credential,
    :verified_crawler,
    :self_reported,
    :fallback
  ]

  @doc """
  Returns the closed request-actor vocabulary.

  ## Examples

      RequestActor.Const.actor_types()
  """
  @spec actor_types() :: [atom()]
  def actor_types, do: @actor_types

  @doc """
  Returns the confidence values emitted by RequestActor.

  ## Examples

      RequestActor.Const.confidences()
  """
  @spec confidences() :: [atom()]
  def confidences, do: @confidences

  @doc """
  Returns the trusted or fallback classification sources.

  ## Examples

      RequestActor.Const.classified_by()
  """
  @spec classified_by() :: [atom()]
  def classified_by, do: @classified_by

  @doc """
  Checks whether a value is a supported request-actor type.

  ## Examples

      RequestActor.Const.valid_actor_type?(:agent)
  """
  @spec valid_actor_type?(term()) :: boolean()
  def valid_actor_type?(type), do: type in @actor_types
end
