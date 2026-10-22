import { createFileRoute } from '@tanstack/react-router'

import AlertBoard from '~/unit/AlertBoard'

export const Route = createFileRoute('/$community/review')({ component: ReviewBoardPage })

function ReviewBoardPage() {
  const { community } = Route.useParams()
  return <AlertBoard community={community} />
}
