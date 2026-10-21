import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import usePagiPosition from '~/hooks/usePagiPosition'
import { viewerQueryKeys } from '~/query'
import useAccount from '~/stores/account/hooks'
import Pagi from '~/ui/Pagi'

import { loadReviewQueue } from '../../server/application'

export const Route = createFileRoute('/review/')({
  loader: ({ context }) => (context.reviewAllowed ? loadReviewQueue({ data: {} }) : null),
  component: ReviewQueue,
})

function ReviewQueue() {
  const initial = Route.useLoaderData()
  const { accountRef } = useAccount()
  const [seedOwner] = useState(accountRef)
  const position = usePagiPosition(`application-review:${accountRef}`)
  const query = useQuery({
    queryKey: [...viewerQueryKeys.all, accountRef, 'application-review', position.input],
    queryFn: () => loadReviewQueue({ data: { pagi: position.input } }),
    enabled: !!accountRef && initial !== null,
    initialData:
      accountRef === seedOwner && position.request.api === 'offset' && position.request.page === 1
        ? initial
        : undefined,
  })
  const result = query.data
  const error = query.error ? String(query.error) : null
  const applications = result?.entries ?? []
  return (
    <>
      {error && (
        <p role='alert'>
          {error}{' '}
          <button type='button' onClick={() => void query.refetch()}>
            Retry
          </button>
        </p>
      )}
      <ul className='apply-list'>
        {applications.map((application) => (
          <li key={application.publicRef}>
            <Link to={`/review/${application.publicRef}` as never}>
              <strong>{application.title}</strong>
              <div className='apply-copy'>
                /{application.slug} · {application.status.replaceAll('_', ' ')}
              </div>
            </Link>
          </li>
        ))}
        {query.isPending ? (
          <li role='status'>Loading...</li>
        ) : applications.length === 0 ? (
          <li className='apply-card'>The queue is empty.</li>
        ) : null}
      </ul>
      <Pagi
        labels={{ previousPage: 'Previous page', nextPage: 'Next page', pageNumber: 'Page number' }}
        pageInfo={result?.pageInfo}
        onChange={position.setPage}
      />
    </>
  )
}
