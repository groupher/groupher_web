'use client'

import { useQuery } from '@tanstack/react-query'
import { type FC, lazy, Suspense, useCallback, useMemo, useState } from 'react'

import { DSB_DOC_EVENT } from '~/const/dsb/docs'
import useEvent from '~/hooks/useEvent'
import usePagiPosition from '~/hooks/usePagiPosition'
import useTrans from '~/hooks/useTrans'
import MergeSVG from '~/icons/Merge'
import { graphqlQueryOptions } from '~/query'
import S from '~/unit/DsbThread/schema/docs'

import useDocsEditor from '../Editor/store/hooks'
import { DOC_ACTION_LABEL_KEY } from './constant'
import { buildRevisionHistory } from './RevisionDrawer/model'
import type { TDocBranchRevision, TDocBranchVersionsPayload } from './RevisionDrawer/spec'
import useRevisionDiffModel from './RevisionDrawer/useRevisionDiffModel'
import useSalon, { cn } from './salon/diff_status'

const RevisionDrawer = lazy(() => import('./RevisionDrawer'))

const DiffStatus: FC = () => {
  const s = useSalon()
  const { t } = useTrans()
  const { bodyValue, docDraftInfo } = useDocsEditor()
  const [visible, setVisible] = useState(false)
  const docDraftId = docDraftInfo.id
  const branchId = docDraftInfo.branchId
  const label = t(DOC_ACTION_LABEL_KEY.DIFF)
  const position = usePagiPosition(`${docDraftId}:${branchId}`)
  const query = useQuery({
    ...graphqlQueryOptions<TDocBranchVersionsPayload>(S.docBranchVersions, {
      docId: docDraftId,
      branchId,
      pagi: position.input,
    }),
    enabled: !!docDraftId && !!branchId,
  })
  const loading = query.isFetching
  const error = query.error ? String(query.error) : null
  const publishedRevisions = useMemo<TDocBranchRevision[]>(
    () =>
      (query.data?.docBranchVersions?.entries || []).map((version) => ({
        id: version.revisionId,
        branchVersionId: version.id,
        body: version.content.body,
        insertedAt: version.publishedAt,
        revisionNumber: version.versionNumber,
        title: version.content.title,
        subtitle: version.content.subtitle,
      })),
    [query.data],
  )
  const loadRevisions = useCallback(async () => {
    await query.refetch()
  }, [query.refetch])
  useEvent(
    DSB_DOC_EVENT.REVISION_RELOAD,
    () => {
      void loadRevisions()
    },
    [loadRevisions],
  )

  const revisionHistory = useMemo(
    () =>
      buildRevisionHistory({
        draftRevisions: [],
        publishedRevisions,
      }),
    [publishedRevisions],
  )
  const { loadDiffResult, revisionDiffModel, startHistoryDiff } = useRevisionDiffModel(
    revisionHistory,
    bodyValue,
  )
  const stats = revisionDiffModel.publish.stats
  const hasChanges = revisionDiffModel.publish.hasChanges

  return (
    <>
      <button
        type='button'
        className={cn(s.button, visible && s.buttonActive)}
        aria-label={label}
        title={label}
        onClick={() => setVisible(true)}
      >
        <MergeSVG className={cn(s.icon, visible && s.iconActive)} />
        {hasChanges && (
          <>
            <span className={s.additions}>+{stats.additions}</span>
            <span className={s.deletions}>-{stats.deletions}</span>
          </>
        )}
      </button>

      {visible && (
        <Suspense fallback={null}>
          <RevisionDrawer
            pageInfo={query.data?.docBranchVersions?.pageInfo}
            onPageChange={position.setPage}
            show={visible}
            loading={loading}
            error={error}
            revisionDiffModel={revisionDiffModel}
            loadDiffResult={loadDiffResult}
            startHistoryDiff={startHistoryDiff}
            onClose={() => setVisible(false)}
            onReload={loadRevisions}
          />
        </Suspense>
      )}
    </>
  )
}

export default DiffStatus
