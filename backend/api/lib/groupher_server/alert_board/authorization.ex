defmodule GroupherServer.AlertBoard.Authorization do
  @moduledoc """
  Checks scoped AlertBoard capabilities using the existing Passport registry.

      AlertBoard scope + actor
        -> scoped Gate action
        -> CMS.Passport
        -> allow or permission error
  """

  alias GroupherServer.CMS
  alias CMS.Model.Community

  @community_actions ~w(review.read review.decide review.configure)
  @platform_actions ~w(review.platform.read review.platform.decide review.platform.configure)

  @doc """
  Authorizes a Board action in a typed platform or community scope.

  ## Examples

      authorize(%{kind: :platform}, "review.platform.read", actor)
      #=> {:ok, :pass} | {:error, reason}
  """
  @spec authorize(map(), String.t(), struct()) :: {:ok, :pass} | {:error, term()}
  def authorize(%{kind: :platform}, action, actor) when action in @platform_actions do
    CMS.passport_authorization_check(actor, action)
    |> normalize()
  end

  def authorize(%{kind: :community, community: %Community{slug: slug}}, action, actor)
      when action in @community_actions do
    CMS.passport_authorization_check(actor, action, %{community: slug})
    |> normalize()
  end

  def authorize(_scope, _action, _actor), do: {:error, CMS.passport_error_cat_permission_denied()}

  defp normalize({:ok, true}), do: {:ok, :pass}
  defp normalize({:error, reason}), do: {:error, reason}
  defp normalize(_result), do: {:error, CMS.passport_error_cat_permission_denied()}
end
