defmodule GroupherServer.CMS.Articles.Bindings.Persist do
  @moduledoc """
  Resolves the explicit ArticleBinding context used by Article projections and commands.

  Stable Article identity is used only to find the binding; public Community and numbering
  always come from the resolved ArticleBinding row.

  ```text
  Article / ArticleView + Community
                    |
                    v
          get explicit ArticleBinding
                    |
                    +--> Community
                    +--> ArticleBinding.inner_id
                    +--> projection / event context
  ```
  """

  import Ecto.Query

  alias GroupherServer.{CMS, Repo}

  alias CMS.Articles.ArticleView
  alias CMS.Model.{Article, ArticleBinding, Community}

  @type t :: %{
          article_id: Ecto.UUID.t(),
          community: Community.t(),
          binding: ArticleBinding.t(),
          inner_id: integer() | nil
        }

  @doc "Resolves an ArticleBinding from an explicit Community context."
  @spec get(map(), Community.t()) :: {:ok, t()} | {:error, term()}
  def get(%ArticleView{article_id: article_id}, %Community{} = community) do
    binding(article_id, community)
  end

  def get(%Article{id: article_id}, %Community{} = community) do
    binding(article_id, community)
  end

  def get(%{article_id: article_id}, %Community{} = community) do
    binding(article_id, community)
  end

  def get(_article, %Community{}), do: {:error, :article_binding_context_required}
  def get(_article, _community), do: {:error, :article_binding_context_required}

  @doc "Resolves a Binding by id and verifies both Article and optional Community ownership."
  @spec get_by_id(map(), pos_integer(), integer() | nil) ::
          {:ok, ArticleBinding.t()} | {:error, term()}
  def get_by_id(article, binding_id, community_id)
      when is_map(article) and is_integer(binding_id) do
    article_id = Map.get(article, :article_id) || Map.get(article, :id)

    case Repo.get(ArticleBinding, binding_id) do
      %ArticleBinding{article_id: ^article_id, community_id: binding_community_id} = binding
      when is_nil(community_id) or community_id == binding_community_id ->
        {:ok, binding}

      %ArticleBinding{} ->
        {:error, :invalid_article_binding}

      nil ->
        {:error, :article_binding_not_found}
    end
  end

  def get_by_id(_article, _binding_id, _community_id) do
    {:error, :invalid_article_binding}
  end

  @doc "Lists every ArticleBinding for one stable Article."
  @spec all(Article.t() | ArticleView.t() | map()) ::
          {:ok, [ArticleBinding.t()]} | {:error, term()}
  def all(article) when is_map(article) do
    article_id = Map.get(article, :article_id) || Map.get(article, :id)

    if is_binary(article_id) do
      bindings =
        ArticleBinding
        |> where([binding], binding.article_id == ^article_id)
        |> order_by([binding], asc: binding.id)
        |> preload(:community)
        |> Repo.all()

      {:ok, bindings}
    else
      {:error, :article_binding_context_required}
    end
  end

  defp binding(article_id, %Community{id: community_id}) do
    case Repo.get_by(ArticleBinding, article_id: article_id, community_id: community_id) do
      %ArticleBinding{} = binding ->
        binding = Repo.preload(binding, :community)
        inner_id = binding.inner_id

        {:ok,
         %{
           article_id: article_id,
           community: binding.community,
           binding: binding,
           inner_id: inner_id
         }}

      _ ->
        {:error, :article_binding_not_found}
    end
  end
end
