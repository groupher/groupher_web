defmodule GroupherServer.Analysis.Web.Community do
  @moduledoc """
  Route-derived analysis context for one community.

  Business position:

      CMS community -> Analysis.Web.Community -> provider request scope
  """

  alias GroupherServer.CMS

  @type t :: %__MODULE__{
          community: String.t(),
          path_prefix: String.t(),
          umami_website_id: String.t() | nil
        }

  defstruct [:community, :path_prefix, :umami_website_id]

  @doc """
  Builds the route-derived analytics scope for one CMS community.

  ## Examples

      from_community(%GroupherServer.CMS.Model.Community{slug: "home"})
      #=> %GroupherServer.Analysis.Web.Community{community: "home", path_prefix: "/home", umami_website_id: nil}

  """
  @spec from_community(CMS.Model.Community.t()) :: t()
  def from_community(%CMS.Model.Community{slug: slug}) when is_binary(slug) do
    %__MODULE__{community: slug, path_prefix: "/#{slug}", umami_website_id: nil}
  end

  @doc """
  Builds a community scope with a server-resolved provider website ID.

  ## Examples

      Analysis.Web.Community.from_community(community, "website-id")
  """
  @spec from_community(CMS.Model.Community.t(), String.t() | nil) :: t()
  def from_community(%CMS.Model.Community{slug: slug}, umami_website_id) when is_binary(slug) do
    %__MODULE__{
      community: slug,
      path_prefix: "/#{slug}",
      umami_website_id: umami_website_id
    }
  end
end
