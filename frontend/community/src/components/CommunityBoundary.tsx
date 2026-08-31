import { communityQueries } from '@community/query/queries'
import type { TCommunityLocale } from '@community/server/locale'
import type { TThemeSeed } from '@community/utils/first-paint'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'

import CommunityShellProvider from '~/stores/CommunityShellProvider'

export default function CommunityBoundary({
  children,
  community,
  locale,
  initialNow,
  theme,
}: {
  children: ReactNode
  community: string
  locale: TCommunityLocale
  initialNow: number
  theme: TThemeSeed
}) {
  const { data: shell } = useSuspenseQuery(communityQueries.shell(community))

  return (
    <CommunityShellProvider
      initData={{
        account: shell.account,
        community: shell.community,
        dashboard: shell.dashboard,
        wallpaper: shell.wallpaper,
        theme,
      }}
      locale={locale.locale}
      localeData={locale.localeData}
      initialNow={initialNow}
    >
      {children}
    </CommunityShellProvider>
  )
}
