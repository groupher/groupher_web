defmodule GroupherServer.Accounts.ProfileViewTracker.Policy do
  @moduledoc """
  Decides whether a classified request may enter Profile view counting.

      tracking identity + read purpose -> Policy -> admitted or excluded
  """

  @read_purposes [
    :public_read,
    :author_preview,
    :moderation_review,
    :operations_inspection,
    :internal_probe
  ]

  @doc "Allows only public reads from identified humans or verified agents."
  @spec allowed?(map(), atom()) :: boolean()
  def allowed?(identity, :public_read) when is_map(identity), do: allowed_actor?(identity)
  def allowed?(_identity, purpose) when purpose in @read_purposes, do: false
  def allowed?(_identity, _purpose), do: false

  defp allowed_actor?(%{
         actor_type: :human,
         actor_confidence: confidence,
         viewer_tracking_key: key
       })
       when confidence in [:verified, :probable] and is_binary(key),
       do: true

  defp allowed_actor?(%{
         actor_type: :agent,
         actor_confidence: :verified,
         viewer_tracking_key: key
       })
       when is_binary(key),
       do: true

  defp allowed_actor?(_identity), do: false
end
