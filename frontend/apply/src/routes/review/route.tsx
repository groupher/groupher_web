import { createFileRoute } from '@tanstack/react-router'

import ReviewerShell from '../../components/ReviewerShell'
import { loadReviewAdmission } from '../../server/application'

export const Route = createFileRoute('/review')({
  beforeLoad: async () => ({ reviewAllowed: await loadReviewAdmission() }),
  component: ReviewerShell,
})
