import { useQuery } from '@tanstack/react-query'

import { browserGraphQLRequest } from '~/graphql/client'
import type { ReviewTargetInput } from '~/graphql/generated/graphql'
import useTrans from '~/hooks/useTrans'

import { contentReview } from './schema'

type TProps = { target: ReviewTargetInput }

const statusMessages = {
  CHECKING: 'content_review.status.checking',
  WAITING_HUMAN: 'content_review.status.waiting_human',
  RESTRICTED: 'content_review.status.restricted',
} as const

export default function ReviewNotice({ target }: TProps) {
  const { t } = useTrans()
  const query = useQuery({
    queryKey: ['content-review', target],
    queryFn: async () => {
      const response = await browserGraphQLRequest(contentReview, { target })
      return response.contentReview
    },
    staleTime: 10_000,
  })

  if (!query.data || (query.data.status === 'PUBLIC' && !query.data.checkUnavailable)) return null

  const message =
    query.data.status === 'PUBLIC'
      ? t('content_review.status.check_unavailable')
      : t(statusMessages[query.data.status])

  return (
    <aside
      role='status'
      className='border-divider bg-notice-bg my-4 rounded-md border-l-4 px-4 py-3'
    >
      <p className='text-sm font-medium'>{message}</p>
      {query.data.checkUnavailable && query.data.status !== 'PUBLIC' && (
        <p className='mt-1 text-sm'>{t('content_review.status.check_unavailable')}</p>
      )}
      {query.data.canEdit && query.data.reasonCodes.length > 0 && (
        <p className='text-digest mt-1 text-xs'>{query.data.reasonCodes.join(', ')}</p>
      )}
    </aside>
  )
}
