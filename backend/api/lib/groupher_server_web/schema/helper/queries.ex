defmodule GroupherServerWeb.Schema.Helper.Queries do
  @moduledoc """
  Reusable Absinthe query macros for thread lists, entries, and viewer state.

  Business position:

      Client
        -> Absinthe schema / Queries
        -> resolver or domain context
        -> GraphQL response
  """
  import Helper.Utils, only: [plural: 1, past_verb: 1]

  alias GroupherServer.CMS
  alias GroupherServerWeb.Middleware, as: M
  alias GroupherServerWeb.Resolvers, as: R

  @threads CMS.artiment_config_threads()

  # user published articles
  defmacro published_article_queries do
    @threads
    |> Enum.map(fn thread ->
      quote do
        @desc unquote("paged published #{plural(thread)}")
        field unquote(:"paged_published_#{plural(thread)}"),
              unquote(:"#{thread}_page") do
          arg(:login, non_null(:string))
          arg(:filter, :article_page_filter)
          arg(:pagi, :pagi_input)
          arg(:thread, unquote(:"#{thread}_thread"), default_value: unquote(thread))

          middleware(M.FrontDesk, :user)
          resolve(&R.Accounts.Profiles.paged_published_articles/3)
        end
      end
    end)
  end

  @doc """
  query generator for threads, like:

  post, page_posts ...
  """
  defmacro article_queries do
    @threads
    |> Enum.map(fn thread ->
      quote do
        @desc unquote("get #{thread} by id")
        field unquote(thread), non_null(unquote(thread)) do
          arg(:article, non_null(:article_path_input))

          resolve(fn root, args, info ->
            R.CMS.Articles.read_article(root, args, info, thread: unquote(thread))
          end)
        end
      end
    end)
  end

  defmacro article_reacted_users_query(action, resolver) do
    quote do
      @desc unquote("get paged #{past_verb(action)} users of an article")
      field unquote(:"#{past_verb(action)}_users"), :user_page do
        arg(:article, non_null(:article_path_input))
        arg(:pagi, :pagi_input)

        middleware(M.FrontDesk, :article)

        resolve(unquote(resolver))
      end
    end
  end
end
