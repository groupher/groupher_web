import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import type { ReviewTargetInput } from '~/graphql/generated/graphql'
import useTrans from '~/hooks/useTrans'
import { invalidateExact } from '~/query/invalidation/executor'
import { authWarn } from '~/signal'
import useAccount from '~/stores/account/hooks'

import { contentReview, submitReport, withdrawReport } from './schema'

const reasons = ['SPAM', 'HARASSMENT', 'ILLEGAL_CONTENT', 'IMPERSONATION', 'OTHER'] as const
const reasonLabels = {
  SPAM: 'alert_board.reason.spam',
  HARASSMENT: 'alert_board.reason.harassment',
  ILLEGAL_CONTENT: 'alert_board.reason.illegal_content',
  IMPERSONATION: 'alert_board.reason.impersonation',
  OTHER: 'alert_board.reason.other',
} as const

type TProps = { target: ReviewTargetInput }

/** Submits an authenticated report through the AlertBoard command boundary. */
export default function ReportAction({ target }: TProps) {
  const { t } = useTrans()
  const account = useAccount()
  const client = useQueryClient()
  const [open, setOpen] = useState(false)
  const [reasonCode, setReasonCode] = useState<(typeof reasons)[number]>('SPAM')
  const [details, setDetails] = useState('')
  const commandIdRef = useRef<string | null>(null)
  const review = useQuery({
    queryKey: ['content-review', target],
    queryFn: async () => {
      const response = await browserGraphQLRequest(contentReview, { target })
      return response.contentReview
    },
  })
  const report = useMutation({
    mutationFn: () =>
      browserGraphQLRequest(submitReport, {
        commandId: (commandIdRef.current ??= crypto.randomUUID()),
        input: { target, reasonCode, details: details.trim() || null },
      }),
    onSuccess: () => {
      commandIdRef.current = null
      setDetails('')
      setOpen(false)
      void invalidateExact(client, [{ queryKey: ['content-review', target] }])
    },
    onError: () => {
      void invalidateExact(client, [{ queryKey: ['content-review', target] }])
    },
  })
  const withdrawalIdRef = useRef<string | null>(null)
  const withdraw = useMutation({
    mutationFn: (reportId: string) =>
      browserGraphQLRequest(withdrawReport, {
        reportId,
        commandId: (withdrawalIdRef.current ??= crypto.randomUUID()),
      }),
    onSuccess: () => {
      withdrawalIdRef.current = null
      void invalidateExact(client, [{ queryKey: ['content-review', target] }])
    },
    onError: () => {
      void invalidateExact(client, [{ queryKey: ['content-review', target] }])
    },
  })

  const openForm = () => {
    if (!account.isLogin) return authWarn()
    setOpen((value) => !value)
  }
  const viewerReportId = review.data?.viewerReportId

  return (
    <div className='my-3'>
      {viewerReportId ? (
        <div className='flex items-center gap-3'>
          <span className='text-digest text-sm'>{t('alert_board.report_submitted')}</span>
          <button
            type='button'
            className='text-digest text-sm underline disabled:opacity-50'
            disabled={withdraw.isPending}
            onClick={() => withdraw.mutate(viewerReportId)}
          >
            {withdraw.isPending
              ? t('alert_board.report_withdrawing')
              : t('alert_board.report_withdraw')}
          </button>
        </div>
      ) : (
        <button type='button' className='text-digest text-sm underline' onClick={openForm}>
          {t('alert_board.report')}
        </button>
      )}
      {withdraw.isError && (
        <p role='alert' className='mt-2 text-sm text-red-600'>
          {t('alert_board.report_withdraw_error')}
        </p>
      )}
      {open && (
        <form
          className='border-divider mt-3 grid gap-3 rounded-lg border p-4'
          onSubmit={(event) => {
            event.preventDefault()
            report.mutate()
          }}
        >
          <label className='grid gap-1 text-sm'>
            {t('alert_board.report_reason')}
            <select
              className='border-divider rounded-md border bg-transparent px-3 py-2'
              value={reasonCode}
              disabled={report.isError}
              onChange={(event) => setReasonCode(event.target.value as (typeof reasons)[number])}
            >
              {reasons.map((reason) => (
                <option key={reason} value={reason}>
                  {t(reasonLabels[reason])}
                </option>
              ))}
            </select>
          </label>
          <label className='grid gap-1 text-sm'>
            {t('alert_board.report_details')}
            <textarea
              className='border-divider min-h-20 rounded-md border bg-transparent p-3'
              maxLength={2000}
              required={reasonCode === 'OTHER'}
              value={details}
              disabled={report.isError}
              onChange={(event) => setDetails(event.target.value)}
            />
          </label>
          {report.isError && (
            <p role='alert' className='text-sm text-red-600'>
              {t('alert_board.report_error')}
            </p>
          )}
          <div className='flex gap-2'>
            <button
              type='submit'
              className='bg-primary text-primary-foreground rounded-md px-3 py-2 text-sm disabled:opacity-50'
              disabled={report.isPending}
            >
              {report.isPending ? t('alert_board.report_sending') : t('alert_board.report_submit')}
            </button>
            <button
              type='button'
              className='border-divider rounded-md border px-3 py-2 text-sm'
              onClick={() => {
                commandIdRef.current = null
                setOpen(false)
              }}
            >
              {t('alert_board.report_cancel')}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
