import { createFileRoute } from '@tanstack/react-router'

import ReviewBotSettings from '~/unit/ReviewBot/Settings'

export const Route = createFileRoute('/review-bot')({ component: PlatformReviewBotPage })

function PlatformReviewBotPage() {
  return <ReviewBotSettings />
}
