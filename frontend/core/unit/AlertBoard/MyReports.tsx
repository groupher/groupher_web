import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import useTrans from '~/hooks/useTrans'
import { invalidatePrefix } from '~/query/invalidation/executor'
import { viewerQueryKeys } from '~/query/key'
import useAccount from '~/stores/account/hooks'

import { myReports, withdrawReport } from './schema'

type TProps = { show: boolean; onClose: () => void }

/** Lets the signed-in reporter withdraw active reports even when targets are hidden. */
export default function MyReports({ show, onClose }: TProps) {
  const { t } = useTrans()
  const { accountRef } = useAccount()
  const client = useQueryClient()
  const [page, setPage] = useState(1)
  const commandIds = useRef(new Map<string, string>())
  const reports = useQuery({
    queryKey: viewerQueryKeys.myReports(accountRef || 'anonymous', page),
    queryFn: async () => {
      const response = await browserGraphQLRequest(myReports, {
        pagi: { offset: { page, size: 20 } },
      })
      return response.myReports
    },
    enabled: show && Boolean(accountRef),
  })
  useEffect(() => {
    setPage(1)
  }, [accountRef, show])
  useEffect(() => {
    const totalPages = reports.data?.pageInfo.totalPages
    if (totalPages != null && page > Math.max(1, totalPages)) {
      setPage(Math.max(1, totalPages))
    }
  }, [page, reports.data?.pageInfo.totalPages])
  const withdraw = useMutation({
    mutationFn: (reportId: string) => {
      let commandId = commandIds.current.get(reportId)
      if (!commandId) {
        commandId = crypto.randomUUID()
        commandIds.current.set(reportId, commandId)
      }

      return browserGraphQLRequest(withdrawReport, { reportId, commandId })
    },
    onSuccess: async (_result, reportId) => {
      commandIds.current.delete(reportId)
      await invalidatePrefix(client, viewerQueryKeys.myReportsPrefix(accountRef || 'anonymous'))
    },
  })

  if (!show) return null

  const pageInfo = reports.data?.pageInfo

  return (
    <div className='bg-modal-mask fixed inset-0 z-50 grid place-items-center p-4'>
      <section
        role='dialog'
        aria-modal='true'
        aria-labelledby='my-reports-title'
        className='border-divider bg-modal-bg max-h-full w-full max-w-2xl overflow-auto rounded-lg border p-5 shadow-lg'
      >
        <header className='flex items-center justify-between gap-4'>
          <h2 id='my-reports-title' className='text-lg font-semibold'>
            {t('alert_board.my_reports')}
          </h2>
          <button
            type='button'
            className='border-divider rounded-md border px-3 py-1.5 text-sm'
            onClick={onClose}
          >
            {t('alert_board.report_cancel')}
          </button>
        </header>

        {reports.isPending ? (
          <p className='text-digest py-6 text-sm'>{t('alert_board.loading')}</p>
        ) : reports.isError ? (
          <p role='alert' className='py-6 text-sm text-red-600'>
            {t('alert_board.my_reports_error')}
          </p>
        ) : reports.data.entries.length === 0 ? (
          <p className='text-digest py-6 text-sm'>{t('alert_board.my_reports_empty')}</p>
        ) : (
          <ul className='divide-divider mt-4 divide-y'>
            {reports.data.entries.map((report) => (
              <li key={report.id} className='py-4'>
                <div className='flex flex-wrap items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <p className='font-medium'>{report.targetKey}</p>
                    <p className='text-digest mt-1 text-xs'>
                      {report.reasonCode} · {report.insertedAt}
                    </p>
                    {report.details && (
                      <p className='text-digest mt-2 text-sm whitespace-pre-wrap'>
                        {report.details}
                      </p>
                    )}
                  </div>
                  <button
                    type='button'
                    className='border-divider rounded-md border px-3 py-2 text-sm disabled:opacity-50'
                    disabled={withdraw.isPending}
                    onClick={() => withdraw.mutate(report.id)}
                  >
                    {withdraw.isPending
                      ? t('alert_board.report_withdrawing')
                      : t('alert_board.report_withdraw')}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {withdraw.isError && (
          <p role='alert' className='mt-3 text-sm text-red-600'>
            {t('alert_board.report_withdraw_error')}
          </p>
        )}

        {pageInfo && pageInfo.totalPages > 1 && (
          <nav aria-label={t('alert_board.my_reports_pagination')} className='mt-4 flex gap-2'>
            <button
              type='button'
              className='border-divider rounded-md border px-3 py-2 text-sm disabled:opacity-50'
              disabled={!pageInfo.hasPreviousPage}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
            >
              {t('alert_board.previous_page')}
            </button>
            <button
              type='button'
              className='border-divider rounded-md border px-3 py-2 text-sm disabled:opacity-50'
              disabled={!pageInfo.hasNextPage}
              onClick={() => setPage((value) => value + 1)}
            >
              {t('alert_board.next_page')}
            </button>
          </nav>
        )}
      </section>
    </div>
  )
}
