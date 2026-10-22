import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import useTrans from '~/hooks/useTrans'

import CaseDetail from './CaseDetail'
import ReviewSettings from './ReviewSettings'
import { reviewCases } from './schema'

type TProps = { community: string }

export default function AlertBoard({ community }: TProps) {
  const { t } = useTrans()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [scopeKind, setScopeKind] = useState<'COMMUNITY' | 'PLATFORM'>('COMMUNITY')
  const [status, setStatus] = useState<'OPEN' | 'RESOLVED' | 'ALL'>('OPEN')
  const [page, setPage] = useState(1)
  const scope = scopeKind === 'PLATFORM' ? { kind: scopeKind } : { kind: scopeKind, community }
  const casesQuery = useQuery({
    queryKey: ['alert-board', community, scopeKind, status, page],
    queryFn: async () => {
      const response = await browserGraphQLRequest(reviewCases, {
        scope,
        filter: { status },
        pagi: { offset: { page, size: 30 } },
      })
      return response.reviewCases
    },
  })
  const pageInfo = casesQuery.data?.pageInfo
  const totalPages = pageInfo && 'totalPages' in pageInfo ? pageInfo.totalPages : 1

  return (
    <section className='mx-auto max-w-6xl px-5 py-8'>
      <div className='mb-5 flex justify-end'>
        <button
          type='button'
          className='border-divider rounded-md border px-3 py-2 text-sm'
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? t('alert_board.back_to_queue') : t('alert_board.settings')}
        </button>
      </div>
      {showSettings ? (
        <ReviewSettings community={community} scopeKind={scopeKind} />
      ) : (
        <div className='grid gap-5 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)]'>
          <div className='min-w-0'>
            <header className='mb-5 flex items-center justify-between gap-3'>
              <h1 className='text-xl font-semibold'>{t('alert_board.title')}</h1>
              <div className='flex gap-2'>
                <select
                  className='border-divider rounded-md border bg-transparent px-2 py-1 text-sm'
                  value={scopeKind}
                  onChange={(event) => {
                    setSelectedId(null)
                    setScopeKind(event.target.value as typeof scopeKind)
                    setPage(1)
                  }}
                  aria-label={t('alert_board.scope')}
                >
                  <option value='COMMUNITY'>{t('alert_board.community_scope')}</option>
                  <option value='PLATFORM'>{t('alert_board.platform_scope')}</option>
                </select>
                <select
                  className='border-divider rounded-md border bg-transparent px-2 py-1 text-sm'
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value as typeof status)
                    setPage(1)
                  }}
                  aria-label={t('alert_board.filter_status')}
                >
                  <option value='OPEN'>{t('alert_board.open')}</option>
                  <option value='RESOLVED'>{t('alert_board.resolved')}</option>
                  <option value='ALL'>{t('alert_board.all')}</option>
                </select>
              </div>
            </header>
            {casesQuery.isPending ? (
              <p className='text-digest text-sm'>{t('alert_board.loading')}</p>
            ) : casesQuery.isError ? (
              <p role='alert' className='text-sm text-red-600'>
                {t('alert_board.load_error')}
              </p>
            ) : casesQuery.data.entries.length === 0 ? (
              <p className='border-divider text-digest rounded-lg border p-5 text-sm'>
                {t('alert_board.empty')}
              </p>
            ) : (
              <ul className='divide-divider border-divider divide-y rounded-lg border'>
                {casesQuery.data.entries.map((item) => (
                  <li key={item.id}>
                    <button
                      type='button'
                      className='hover:bg-hoverBg w-full px-4 py-3 text-left'
                      aria-current={selectedId === item.id ? 'true' : undefined}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <span className='block font-medium'>{item.targetKey}</span>
                      <span className='text-digest mt-1 block text-xs'>
                        {item.status.toLowerCase()} · {item.priority.toLowerCase()} · v
                        {item.version}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {(totalPages > 1 || page > 1) && (
              <nav
                aria-label={t('alert_board.queue_pagination')}
                className='mt-4 flex items-center justify-between gap-3'
              >
                <button
                  type='button'
                  className='border-divider rounded-md border px-3 py-2 text-sm disabled:opacity-50'
                  disabled={page <= 1 || casesQuery.isFetching}
                  onClick={() => {
                    setSelectedId(null)
                    setPage((value) => Math.max(1, value - 1))
                  }}
                >
                  {t('alert_board.previous_page')}
                </button>
                <span className='text-digest text-sm'>
                  {page} / {totalPages}
                </span>
                <button
                  type='button'
                  className='border-divider rounded-md border px-3 py-2 text-sm disabled:opacity-50'
                  disabled={page >= totalPages || casesQuery.isFetching}
                  onClick={() => {
                    setSelectedId(null)
                    setPage((value) => value + 1)
                  }}
                >
                  {t('alert_board.next_page')}
                </button>
              </nav>
            )}
          </div>
          <CaseDetail
            community={community}
            scopeKind={scopeKind}
            caseId={selectedId}
            onChanged={async () => {
              const result = await casesQuery.refetch()
              const updatedPageInfo = result.data?.pageInfo

              if (
                updatedPageInfo &&
                'totalPages' in updatedPageInfo &&
                page > updatedPageInfo.totalPages
              ) {
                setPage(Math.max(1, updatedPageInfo.totalPages))
              }
            }}
          />
        </div>
      )}
    </section>
  )
}
