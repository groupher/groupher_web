import { communityQueries } from '@community/query/queries'
import { communityPublicPath } from '@community/server/public-path'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import { THREAD } from '~/const/thread'
import { getPagedArticlesParams } from '~/lib/pagedArticlesFilter'
import { toEffectivePagiConfig } from '~/lib/pagination/params'
import { dsbKeys } from '~/query'
import type { TParseDashboard } from '~/spec'
import ArticleListStoreProvider from '~/stores/articleList/provider'
import PostThread from '~/unit/PostThread'

export const Route = createFileRoute('/$community/post/_layout')({
  loader: async ({ context, params, location }) => {
    const filter = getPagedArticlesParams(params.community, new URLSearchParams(location.searchStr))
    const config = toEffectivePagiConfig(
      context.queryClient.getQueryData<TParseDashboard>(dsbKeys.config(params.community))
        ?.pagination,
      'posts',
    )

    if (config.api === 'cursor') {
      const posts = await context.queryClient.ensureInfiniteQueryData(
        communityQueries.postsInfinite(params.community, config, filter),
      )
      await context.queryClient.ensureQueryData(
        communityQueries.stats(
          context.queryClient,
          params.community,
          THREAD.POST,
          posts.pages.flatMap(({ pinnedEntries, entries }) =>
            [...pinnedEntries, ...entries].flatMap((article) =>
              article.innerId == null ? [] : [article.innerId],
            ),
          ),
        ),
      )
      return { posts }
    }

    const posts = await context.queryClient.ensureQueryData(
      communityQueries.posts(params.community, config, filter),
    )
    await context.queryClient.ensureQueryData(
      communityQueries.stats(
        context.queryClient,
        params.community,
        THREAD.POST,
        (posts?.entries || []).flatMap((article) =>
          article.innerId == null ? [] : [article.innerId],
        ),
      ),
    )
    return { posts }
  },
  head: ({ params, matches }) => ({
    links: [{ rel: 'canonical', href: communityPublicPath(params.community, '/post', matches) }],
  }),
  component: PostListLayout,
})

function PostListLayout() {
  return (
    <ArticleListStoreProvider initData={{ thread: THREAD.POST }}>
      <PostThread />
      <Outlet />
    </ArticleListStoreProvider>
  )
}
