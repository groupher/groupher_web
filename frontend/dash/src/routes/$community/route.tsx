import CommunityBoundary from '@dash/components/CommunityBoundary'
import DsbShell from '@dash/components/DsbShell'
import RouteError from '@dash/components/RouteError'
import { loadCommunity } from '@dash/server/community'
import { loadLocale } from '@dash/server/locale'
import { validateCommunitySearch } from '@dash/utils/route-search'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { communityQueries, dsbQueries, wallpaperQueries } from '~/query'

export const Route = createFileRoute('/$community')({
  staleTime: 300_000,
  errorComponent: RouteError,
  validateSearch: validateCommunitySearch,
  loaderDeps: ({ search }) => ({
    lang: search.lang,
    mode: search.mode,
  }),
  beforeLoad: ({ params, location }) => {
    const pathname = location.pathname
    const communityRoot = `/${params.community}`

    if (pathname === communityRoot || pathname === `${communityRoot}/`) {
      throw redirect({
        to: '/$community/overview',
        params: true,
      })
    }
  },
  loader: async ({ context, deps, params }) => {
    const [shell, locale] = await Promise.all([
      loadCommunity({ data: { community: params.community, ...deps } }),
      loadLocale({ data: { lang: deps.lang } }),
    ])

    await Promise.all([
      context.queryClient.ensureQueryData(
        communityQueries.config(params.community, () => shell.community),
      ),
      context.queryClient.ensureQueryData(
        dsbQueries.config(params.community, () => shell.dashboard),
      ),
      context.queryClient.ensureQueryData(
        wallpaperQueries.config(params.community, () => shell.wallpaper),
      ),
    ])

    return {
      shell: {
        account: shell.account,
        community: params.community,
        demoMode: shell.demoMode,
      },
      head: {
        title: shell.dashboard.ogTitle || shell.dashboard.title || 'Groupher Dash',
        themeCssText: shell.themeCssText,
      },
      locale,
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.head.title || 'Groupher Dash',
      },
    ],
    styles: loaderData?.head.themeCssText ? [{ children: loaderData.head.themeCssText }] : [],
  }),
  component: CommunityLayout,
})

function CommunityLayout() {
  const { shell, locale } = Route.useLoaderData()

  return (
    <CommunityBoundary
      key={shell.community}
      account={shell.account}
      community={shell.community}
      locale={locale}
    >
      <DsbShell shell={shell}>
        <Outlet />
      </DsbShell>
    </CommunityBoundary>
  )
}
