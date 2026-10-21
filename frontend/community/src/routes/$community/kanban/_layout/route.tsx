import { communityQueries } from '@community/query/queries'
import { communityPublicPath } from '@community/server/public-path'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import { toEffectivePagiConfig } from '~/lib/pagination/params'
import { readPagiMobileLayout } from '~/lib/pagination/viewport'
import { dsbKeys } from '~/query'
import type { TParseDashboard } from '~/spec'
import KanbanThread from '~/unit/KanbanThread'

export const Route = createFileRoute('/$community/kanban/_layout')({
  loader: ({ context, params }) => {
    const mobile = readPagiMobileLayout()
    if (mobile === null) return
    return context.queryClient.ensureQueryData(
      communityQueries.kanban(
        params.community,
        toEffectivePagiConfig(
          context.queryClient.getQueryData<TParseDashboard>(dsbKeys.config(params.community)),
          mobile,
        ),
      ),
    )
  },
  head: ({ params, matches }) => ({
    links: [{ rel: 'canonical', href: communityPublicPath(params.community, '/kanban', matches) }],
  }),
  component: KanbanBoardLayout,
})

function KanbanBoardLayout() {
  return (
    <>
      <KanbanThread />
      <Outlet />
    </>
  )
}
