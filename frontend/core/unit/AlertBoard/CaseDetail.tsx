import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import type { ReviewCaseAction } from '~/graphql/generated/graphql'
import useTrans from '~/hooks/useTrans'
import { invalidatePrefix } from '~/query/invalidation/executor'
import useAccount from '~/stores/account/hooks'

import { decideReviewCase, reviewCase } from './schema'

type TProps = {
  community: string
  scopeKind: 'COMMUNITY' | 'PLATFORM'
  caseId: string | null
  onChanged: () => void
}

const actionLabels = {
  APPROVE: 'alert_board.action.approve',
  DISMISS: 'alert_board.action.dismiss',
  RECORD_HANDLED: 'alert_board.action.record_handled',
  RELEASE: 'alert_board.action.release',
  RESTRICT: 'alert_board.action.restrict',
} as const satisfies Record<ReviewCaseAction, string>

export default function CaseDetail({ community, scopeKind, caseId, onChanged }: TProps) {
  const { t } = useTrans()
  const { accountRef } = useAccount()
  const client = useQueryClient()
  const [note, setNote] = useState('')
  const commandIdRef = useRef<{ key: string; id: string } | null>(null)
  const scope = scopeKind === 'PLATFORM' ? { kind: scopeKind } : { kind: scopeKind, community }
  const detailQuery = useQuery({
    queryKey: ['alert-board-case', accountRef || 'anonymous', community, scopeKind, caseId],
    queryFn: async () => {
      const response = await browserGraphQLRequest(reviewCase, { scope, id: caseId! })
      return response.reviewCase
    },
    enabled: !!caseId,
  })
  const decide = useMutation({
    mutationFn: async (action: ReviewCaseAction) => {
      const detail = detailQuery.data
      if (!detail) throw new Error('Review case is unavailable')
      const restrictionIds = detail.activeRestrictions.flatMap((item) => {
        if (!item || typeof item !== 'object' || !('id' in item)) return []
        const id = Number(item.id)
        if (!Number.isInteger(id) || id <= 0) return []

        const restriction = item as Record<string, unknown>
        const kind = restriction.kind
        const contentToken = restriction.content_token ?? restriction.contentToken
        const source = restriction.source
        const compatible =
          action === 'APPROVE'
            ? contentToken === detail.case.contentToken && kind !== 'manual_hold'
            : action === 'RELEASE'
              ? kind === 'manual_hold' || (kind === 'rule_hit' && source === 'policy')
              : false

        return compatible ? [id] : []
      })
      const intentKey = JSON.stringify([
        detail.case.id,
        action,
        detail.case.version,
        detail.case.contentToken,
        restrictionIds,
        note.trim(),
      ])
      if (commandIdRef.current?.key !== intentKey) {
        commandIdRef.current = { key: intentKey, id: crypto.randomUUID() }
      }
      return browserGraphQLRequest(decideReviewCase, {
        caseId: detail.case.id,
        commandId: commandIdRef.current.id,
        input: {
          action,
          expectedCaseVersion: detail.case.version,
          expectedContentToken: detail.case.contentToken,
          restrictionIds: action === 'APPROVE' || action === 'RELEASE' ? restrictionIds : [],
          reasonCode: 'reviewed',
          note: note.trim() || null,
        },
      })
    },
    onSuccess: async () => {
      commandIdRef.current = null
      setNote('')
      await invalidatePrefix(client, [
        'alert-board-case',
        accountRef || 'anonymous',
        community,
        scopeKind,
        caseId,
      ])
      onChanged()
    },
  })

  if (!caseId) {
    return (
      <div className='border-divider text-digest rounded-lg border p-6 text-sm'>
        {t('alert_board.select_case')}
      </div>
    )
  }
  if (detailQuery.isPending)
    return <p className='text-digest text-sm'>{t('alert_board.loading')}</p>
  if (detailQuery.isError || !detailQuery.data) {
    return (
      <p role='alert' className='text-sm text-red-600'>
        {t('alert_board.detail_error')}
      </p>
    )
  }

  const detail = detailQuery.data

  return (
    <article className='border-divider min-w-0 rounded-lg border p-5'>
      <h2 className='text-lg font-semibold'>{detail.safeSummary}</h2>
      <dl className='mt-4 grid gap-2 text-sm sm:grid-cols-2'>
        <div>
          <dt className='text-digest'>{t('alert_board.target')}</dt>
          <dd>{detail.case.targetKey}</dd>
        </div>
        <div>
          <dt className='text-digest'>{t('alert_board.status')}</dt>
          <dd>{detail.case.status}</dd>
        </div>
        <div>
          <dt className='text-digest'>{t('alert_board.priority')}</dt>
          <dd>{detail.case.priority}</dd>
        </div>
        <div>
          <dt className='text-digest'>{t('alert_board.version')}</dt>
          <dd>{detail.case.version}</dd>
        </div>
      </dl>

      <section className='mt-6'>
        <h3 className='font-medium'>{t('alert_board.reports')}</h3>
        {detail.reports.length === 0 ? (
          <p className='text-digest mt-2 text-sm'>{t('alert_board.no_reports')}</p>
        ) : (
          <ul className='divide-divider mt-2 divide-y'>
            {detail.reports.map((report) => (
              <li key={report.id} className='py-3 text-sm'>
                <p>
                  {report.reasonCode} · {report.reporterId}
                </p>
                {report.details && (
                  <p className='text-digest mt-1 whitespace-pre-wrap'>{report.details}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className='mt-6'>
        <label className='block text-sm font-medium' htmlFor='review-note'>
          {t('alert_board.decision_note')}
        </label>
        <textarea
          id='review-note'
          className='border-divider mt-2 min-h-20 w-full rounded-md border bg-transparent p-3 text-sm'
          maxLength={2000}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        {decide.isError && (
          <p role='alert' className='mt-2 text-sm text-red-600'>
            {t('alert_board.action_error')}
          </p>
        )}
        <div className='mt-3 flex flex-wrap gap-2'>
          {detail.allowedActions.map((action) => (
            <button
              key={action}
              type='button'
              className='border-divider hover:bg-hoverBg rounded-md border px-3 py-2 text-sm disabled:opacity-50'
              disabled={decide.isPending}
              onClick={() => decide.mutate(action)}
            >
              {t(actionLabels[action])}
            </button>
          ))}
        </div>
      </section>
    </article>
  )
}
