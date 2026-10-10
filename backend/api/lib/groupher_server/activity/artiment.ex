defmodule GroupherServer.Activity.Artiment do
  @moduledoc """
  Routes Article-like resources to their thread-specific Activity handler.

      Activity facade -> CMS Artiment matcher -> thread handler
  """

  alias GroupherServer.{Activity, CMS}
  alias Activity.ErrorCat
  alias CMS.Artiment.Matcher

  @handlers %{
    post: Activity.Post,
    blog: Activity.Blog,
    changelog: Activity.Changelog,
    doc: Activity.Doc
  }

  @doc """
  Returns the closed mapping from Activity thread names to handlers.

  ## Examples

      Activity.Artiment.handlers()
  """
  @spec handlers() :: %{atom() => module()}
  def handlers, do: @handlers

  @doc """
  Resolves an Article-like resource to its Activity handler.

  ## Examples

      Activity.Artiment.handler(%{thread: :post, id: "article-1"})
  """
  @spec handler(struct()) :: {:ok, module()} | {:error, term()}
  def handler(resource) do
    try do
      with {:ok, %{thread: thread}} <- Matcher.match(resource),
           {:ok, handler} <- Map.fetch(@handlers, thread) do
        {:ok, handler}
      else
        :error -> {:error, ErrorCat.unsupported_resource("unsupported Activity thread")}
        {:error, _reason} = error -> error
      end
    rescue
      FunctionClauseError ->
        {:error, ErrorCat.unsupported_resource("unsupported Activity thread")}
    end
  end

  @doc """
  Builds and persists an Activity event through the resource's handler.

  ## Examples

      Activity.Artiment.log(post, :created, actor: actor)
  """
  @spec log(struct(), atom(), keyword()) :: {:ok, struct()} | {:error, term()}
  def log(resource, action, opts) do
    with {:ok, handler} <- handler(resource), do: handler.log(resource, action, opts)
  end
end
