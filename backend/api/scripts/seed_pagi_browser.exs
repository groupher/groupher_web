import Ecto.Query

alias GroupherServer.{CMS, Repo}
alias GroupherServer.CMS.Model.{Article, ArticleBinding, ArticlePublic, Comment, Community}
alias GroupherServer.CMS.Seeds.Helper, as: SeedHelper
alias GroupherServer.Support.Factory

page_size = 20
page_count = 3

endpoint_config =
  Application.get_env(:groupher_server, GroupherServerWeb.Endpoint, [])
  |> Keyword.put(:server, false)

Application.put_env(:groupher_server, GroupherServerWeb.Endpoint, endpoint_config)

repo_config =
  Application.get_env(:groupher_server, GroupherServer.Repo, [])
  |> Keyword.put(:pool_size, 1)

Application.put_env(:groupher_server, GroupherServer.Repo, repo_config)

oban_config =
  Application.get_env(:groupher_server, Oban, [])
  |> Keyword.put(:testing, :manual)
  |> Keyword.put(:plugins, false)
  |> Keyword.put(:queues, false)

Application.put_env(:groupher_server, Oban, oban_config)

{:ok, _apps} = Application.ensure_all_started(:groupher_server)

Application.get_env(:groupher_server, :cache)
|> Keyword.fetch!(:pool)
|> Enum.each(fn {key, %{name: name}} ->
  if Process.whereis(name) == nil do
    {:ok, _pid} = Cachex.start_link(name, Helper.Cache.config(key))
  end
end)

Logger.configure(level: :warning)

community = Repo.get_by!(Community, slug: "home")
target_count = page_size * page_count

current_count =
  ArticleBinding
  |> join(:inner, [binding], article in Article, on: article.id == binding.article_id)
  |> where(
    [binding, article],
    binding.community_id == ^community.id and binding.visible and article.thread == :post
  )
  |> Repo.aggregate(:count)

missing_count = max(target_count - current_count, 0)
{:ok, author} = SeedHelper.seed_bot()

seed_result =
  if missing_count == 0 do
    {:ok, 0}
  else
    Enum.reduce_while(1..missing_count, {:ok, 0}, fn index, {:ok, count} ->
      title =
        "Pagi Browser Fixture #{String.pad_leading(Integer.to_string(current_count + index), 3, "0")}"

      attrs = Factory.mock_attrs(:post, %{community_id: community.id, title: title})

      case CMS.Articles.create(community, :post, attrs, author) do
        {:ok, _article} -> {:cont, {:ok, count + 1}}
        {:error, reason} -> {:halt, {:error, {index, reason}}}
      end
    end)
  end

case seed_result do
  {:ok, added_count} ->
    article_binding =
      ArticleBinding
      |> join(:inner, [binding], public in ArticlePublic,
        on: public.article_id == binding.article_id
      )
      |> where(
        [binding, public],
        binding.community_id == ^community.id and public.title == "Pagi Browser Fixture 055"
      )
      |> select([binding, _public], binding)
      |> Repo.one!()

    article = Repo.get!(Article, article_binding.article_id)

    comment_seed_result =
      if Repo.exists?(from(comment in Comment, where: comment.article_id == ^article.id)) do
        {:ok, {0, 0}}
      else
        roots_result =
          Enum.reduce_while(1..target_count, {:ok, {0, nil}}, fn index, {:ok, {count, _root}} ->
            body = Factory.mock_comment("Pagi Browser Main Comment #{index}")

            case CMS.Comments.create_comment(
                   community,
                   :post,
                   article_binding.inner_id,
                   body,
                   author,
                   Ecto.UUID.generate()
                 ) do
              {:ok, root} -> {:cont, {:ok, {count + 1, root}}}
              {:error, reason} -> {:halt, {:error, {:root_comment, index, reason}}}
            end
          end)

        with {:ok, {root_count, root}} <- roots_result do
          replies_result =
            Enum.reduce_while(1..target_count, {:ok, 0}, fn index, {:ok, count} ->
              body = Factory.mock_comment("Pagi Browser Reply #{index}")

              case CMS.Comments.reply_comment(root.id, body, author, Ecto.UUID.generate()) do
                {:ok, _reply} -> {:cont, {:ok, count + 1}}
                {:error, reason} -> {:halt, {:error, {:reply, index, reason}}}
              end
            end)

          case replies_result do
            {:ok, reply_count} -> {:ok, {root_count, reply_count}}
            {:error, reason} -> {:error, reason}
          end
        end
      end

    case comment_seed_result do
      {:ok, {root_count, reply_count}} ->
        IO.puts("community=home")
        IO.puts("target_posts=#{target_count}")
        IO.puts("added_posts=#{added_count}")
        IO.puts("total_posts=#{current_count + added_count}")
        IO.puts("added_root_comments=#{root_count}")
        IO.puts("added_replies=#{reply_count}")

      {:error, reason} ->
        IO.puts("comment_seed_failed=#{inspect(reason)}")
        System.halt(1)
    end

  {:error, reason} ->
    IO.puts("seed_failed=#{inspect(reason)}")
    System.halt(1)
end
