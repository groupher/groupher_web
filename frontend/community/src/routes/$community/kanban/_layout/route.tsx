import { communityQueries } from '@community/query/queries'
import { communityPublicPath } from '@community/server/public-path'
import { Outlet, createFileRoute } from '@tanstack/react-router'

import KanbanThread from '~/unit/KanbanThread'

export const Route = createFileRoute('/$community/kanban/_layout')({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(communityQueries.kanban(params.community)),
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
