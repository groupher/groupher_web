import { communityQueries } from '@community/query/queries'
import { communityPublicPath } from '@community/server/public-path'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import { THREAD } from '~/const/thread'
import { getPagedArticlesParams } from '~/lib/pagedArticlesFilter'
import { toEffectivePagiConfig } from '~/lib/pagination/params'
import { dsbKeys } from '~/query'
import type { TParseDashboard } from '~/spec'
import ArticleListStoreProvider from '~/stores/articleList/provider'
import ChangelogThread from '~/unit/ChangelogThread'

export const Route = createFileRoute('/$community/changelog/_layout')({
  loader: async ({ context, params, location }) => {
    const filter = getPagedArticlesParams(params.community, new URLSearchParams(location.searchStr))
    const config = toEffectivePagiConfig(
      context.queryClient.getQueryData<TParseDashboard>(dsbKeys.config(params.community))
        ?.pagination,
      'changelogs',
    )

    if (config.api === 'cursor') {
      const changelogs = await context.queryClient.ensureInfiniteQueryData(
        communityQueries.changelogsInfinite(params.community, config, filter),
      )
      await context.queryClient.ensureQueryData(
        communityQueries.stats(
          context.queryClient,
          params.community,
          THREAD.CHANGELOG,
          changelogs.pages.flatMap(({ pinnedEntries, entries }) =>
            [...pinnedEntries, ...entries].flatMap((article) =>
              article.innerId == null ? [] : [article.innerId],
            ),
          ),
        ),
      )
      return { changelogs }
    }

    const changelogs = await context.queryClient.ensureQueryData(
      communityQueries.changelogs(params.community, config, filter),
    )
    await context.queryClient.ensureQueryData(
      communityQueries.stats(
        context.queryClient,
        params.community,
        THREAD.CHANGELOG,
        (changelogs?.entries || []).flatMap((article) =>
          article.innerId == null ? [] : [article.innerId],
        ),
      ),
    )
    return { changelogs }
  },
  head: ({ params, matches }) => ({
    links: [
      { rel: 'canonical', href: communityPublicPath(params.community, '/changelog', matches) },
    ],
  }),
  component: ChangelogListLayout,
})

function ChangelogListLayout() {
  return (
    <ArticleListStoreProvider initData={{ thread: THREAD.CHANGELOG }}>
      <ChangelogThread />
      <Outlet />
    </ArticleListStoreProvider>
  )
}
