import { useCallback, useEffect, useRef } from 'react'

import { browserGraphQLRequest } from '~/graphql/client'
import { saveDocDraft, type TSaveDocDraftInput } from '~/lib/artimentPublisher'
import { ContentPublishError } from '~/lib/contentPublisher'
import { slugify } from '~/lib/slug'
import { createCommandHandle, executeCommand } from '~/query/mutation/optimistic/execute'
import useCommunity from '~/stores/community/hooks'
import { toast } from '~/ui/Toaster'
import S from '~/unit/DsbThread/schema/docs'

import { reloadDocPublishChecklist } from '../../helper'
import type { TSideTreeChild } from '../../SideTree/spec'
import useDocsEditor from '../../store/hooks'
import { DOC_AUTO_SAVE_DELAY } from '../constant'
import {
  composeDraftPublishState,
  composeDraftSaveInput,
  composeEditorDraft,
  composeEditorDraftMeta,
  composeLoadedDraftSession,
} from '../helper'
import type { TDocDraftDTO } from '../spec'
import type { TDraftEditorState } from './useDraftEditorState'

type TParams = {
  patchSideTreeChild: (childId: string, patch: Partial<TSideTreeChild>) => void
}

/** Exposes draft auto save state and actions through the shared React hook boundary. */
export default function useDraftAutoSave(
  draftState: TDraftEditorState,
  { patchSideTreeChild }: TParams,
) {
  const { slug: community } = useCommunity()
  const { attachSaveDocDraft } = useDocsEditor()
  const failedAutoSaveDraftRef = useRef<TDraftEditorState['draft'] | null>(null)
  const saveInFlightRef = useRef(false)
  const rateLimitUntilRef = useRef(0)
  const rateLimitTimerRef = useRef<number | null>(null)
  const latestSaveRef = useRef<() => Promise<void>>(async () => undefined)
  const latestDocIdRef = useRef(draftState.draft.docId)

  const {
    activePage,
    applySaved,
    reconcileConflict,
    dirty,
    draft,
    editable,
    invalid,
    loadStatus,
    saveStatus,
    setSaveError,
    setSaving,
  } = draftState

  useEffect(() => {
    if (latestDocIdRef.current !== draft.docId) {
      if (rateLimitTimerRef.current !== null) window.clearTimeout(rateLimitTimerRef.current)
      rateLimitTimerRef.current = null
      rateLimitUntilRef.current = 0
      failedAutoSaveDraftRef.current = null
    }
    latestDocIdRef.current = draft.docId
  }, [draft.docId])

  const save = useCallback(async (): Promise<void> => {
    if (
      !activePage?.docId ||
      !editable ||
      invalid ||
      loadStatus.loading ||
      saveInFlightRef.current ||
      Date.now() < rateLimitUntilRef.current
    )
      return

    const startedDraft = draft
    const requestDocId = startedDraft.docId || activePage.docId
    const nextTitle = startedDraft.title.trim()
    const nextSubtitle = startedDraft.subtitle.trim()

    saveInFlightRef.current = true
    setSaving()

    try {
      const nextSlug = await slugify(nextTitle)
      const requestDraft = composeEditorDraft({
        bodyValue: startedDraft.bodyValue,
        docId: requestDocId,
        slug: nextSlug,
        subtitle: nextSubtitle,
        title: nextTitle,
      })
      const input = composeDraftSaveInput(requestDraft, nextSlug)
      const command = createCommandHandle({ docId: requestDocId })
      const executeSave = () =>
        executeCommand({
          request: (variables: TSaveDocDraftInput) => saveDocDraft<TDocDraftDTO>(variables),
          variables: {
            value: input.value,
            community,
            id: input.id,
            slug: input.slug,
            subtitle: input.subtitle,
            title: input.title,
            expectedVersion: startedDraft.version,
          },
          commandId: command.commandId,
        })
      let savedDraft: TDocDraftDTO
      try {
        savedDraft = await executeSave()
      } catch (error) {
        if (!(error instanceof ContentPublishError) || error.code !== 'transport_unknown')
          throw error
        savedDraft = await executeSave()
      }
      failedAutoSaveDraftRef.current = null
      if (rateLimitTimerRef.current !== null) window.clearTimeout(rateLimitTimerRef.current)
      rateLimitTimerRef.current = null
      rateLimitUntilRef.current = 0
      const publishState = composeDraftPublishState(activePage.publishState)

      if (latestDocIdRef.current !== requestDocId) return

      patchSideTreeChild(activePage.id, { publishState })
      applySaved({
        meta: composeEditorDraftMeta({
          author: savedDraft?.author ?? null,
          insertedAt: savedDraft?.insertedAt ?? null,
          stage: savedDraft?.stage ?? null,
          updatedAt: savedDraft?.updatedAt ?? new Date().toISOString(),
        }),
        requestDraft: {
          ...requestDraft,
          docId: savedDraft?.docId || requestDraft.docId,
          slug: savedDraft?.slug || requestDraft.slug,
        },
        savedDraft,
        startedDraft,
      })
      reloadDocPublishChecklist()
    } catch (err) {
      if (latestDocIdRef.current !== requestDocId) return

      const message = err instanceof Error ? err.message : String(err)
      if (err instanceof ContentPublishError && err.code === 'version_conflict') {
        const data = await browserGraphQLRequest<{ docDraft?: TDocDraftDTO }>(S.docDraft, {
          community,
          id: requestDocId,
        })
        reconcileConflict(composeLoadedDraftSession(data?.docDraft, activePage))
        toast('The server draft changed. Your local edits were preserved.', 'error')
        return
      }
      if (err instanceof ContentPublishError && err.status === 429) {
        const retrySeconds = Number.isFinite(err.retryAfter) ? Math.max(1, err.retryAfter || 1) : 1
        rateLimitUntilRef.current = Date.now() + retrySeconds * 1000
        if (rateLimitTimerRef.current !== null) window.clearTimeout(rateLimitTimerRef.current)
        rateLimitTimerRef.current = window.setTimeout(() => {
          rateLimitTimerRef.current = null
          rateLimitUntilRef.current = 0
          failedAutoSaveDraftRef.current = null
          void latestSaveRef.current()
        }, retrySeconds * 1000)
      }
      failedAutoSaveDraftRef.current = startedDraft
      setSaveError(message)
      toast(message, 'error')
    } finally {
      saveInFlightRef.current = false
    }
  }, [
    activePage,
    applySaved,
    community,
    draft,
    editable,
    invalid,
    loadStatus.loading,
    patchSideTreeChild,
    reconcileConflict,
    setSaveError,
    setSaving,
  ])

  latestSaveRef.current = save

  useEffect(
    () => () => {
      if (rateLimitTimerRef.current !== null) window.clearTimeout(rateLimitTimerRef.current)
    },
    [],
  )

  useEffect(() => {
    attachSaveDocDraft(save)

    return () => attachSaveDocDraft(null)
  }, [attachSaveDocDraft, save])

  useEffect(() => {
    if (!dirty || !editable || invalid || loadStatus.loading || saveStatus.saving) return
    if (failedAutoSaveDraftRef.current === draft) return

    const timer = window.setTimeout(() => {
      save()
    }, DOC_AUTO_SAVE_DELAY)

    return () => window.clearTimeout(timer)
  }, [dirty, draft, editable, invalid, loadStatus.loading, save, saveStatus.saving])

  return { save }
}
