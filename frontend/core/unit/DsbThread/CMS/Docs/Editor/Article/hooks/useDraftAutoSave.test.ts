import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ContentPublishError } from '~/lib/contentPublisher'

import { SIDE_TREE_NODE_TYPE } from '../../SideTree/constant'
import useDraftAutoSave from './useDraftAutoSave'
import type { TDraftEditorState } from './useDraftEditorState'

const mocks = vi.hoisted(() => ({
  applySaved: vi.fn(),
  attachSaveDocDraft: vi.fn(),
  patchSideTreeChild: vi.fn(),
  reconcileConflict: vi.fn(),
  saveDocDraft: vi.fn(),
  browserGraphQLRequest: vi.fn(),
  setSaveError: vi.fn(),
  setSaving: vi.fn(),
}))

vi.mock('~/lib/artimentPublisher', () => ({
  saveDocDraft: mocks.saveDocDraft,
}))
vi.mock('~/lib/slug', () => ({ slugify: vi.fn(async () => 'guide') }))
vi.mock('~/graphql/client', () => ({ browserGraphQLRequest: mocks.browserGraphQLRequest }))
vi.mock('~/stores/community/hooks', () => ({
  default: () => ({ slug: 'home' }),
}))
vi.mock('~/ui/Toaster', () => ({ toast: vi.fn() }))
vi.mock('../../helper', () => ({ reloadDocPublishChecklist: vi.fn() }))
vi.mock('../../store/hooks', () => ({
  default: () => ({ attachSaveDocDraft: mocks.attachSaveDocDraft }),
}))

const createDraftState = (): TDraftEditorState =>
  ({
    activePage: {
      id: 'page-a',
      type: SIDE_TREE_NODE_TYPE.PAGE,
      docId: 'doc-a',
      publishState: null,
    },
    applySaved: mocks.applySaved,
    reconcileConflict: mocks.reconcileConflict,
    dirty: true,
    draft: {
      bodyJson: '[{"type":"p","children":[{"text":"Draft"}]}]',
      bodyValue: [{ type: 'p', children: [{ text: 'Draft' }] }],
      docId: 'doc-a',
      version: 3,
      slug: 'guide',
      subtitle: '',
      title: 'Guide',
    },
    editable: true,
    invalid: false,
    loadStatus: { error: null, loadedDocId: 'doc-a', loading: false },
    saveStatus: { error: null, lastSavedAt: null, saving: false },
    setSaveError: mocks.setSaveError,
    setSaving: mocks.setSaving,
  }) as unknown as TDraftEditorState

describe('useDraftAutoSave', () => {
  beforeEach(() => {
    for (const mock of Object.values(mocks)) mock.mockReset()
    mocks.saveDocDraft.mockResolvedValue({
      docId: 'doc-a',
      slug: 'guide',
      version: 4,
    })
  })

  afterEach(() => vi.useRealTimers())

  it('saves the current document through the attached draft handler', async () => {
    const draftState = createDraftState()
    const view = renderHook(() =>
      useDraftAutoSave(draftState, {
        patchSideTreeChild: mocks.patchSideTreeChild,
      }),
    )

    await act(async () => view.result.current.save())

    expect(mocks.attachSaveDocDraft).toHaveBeenCalledWith(expect.any(Function))
    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()
    expect(mocks.saveDocDraft).toHaveBeenCalledWith(
      expect.objectContaining({
        expectedVersion: 3,
        id: 'doc-a',
        title: 'Guide',
      }),
    )
  })

  it('retries a failed save only manually or after the draft changes', async () => {
    vi.useFakeTimers()
    mocks.saveDocDraft.mockRejectedValue(new Error('Slug: has already been taken'))
    const draftState = createDraftState()
    const view = renderHook(
      ({ state }) =>
        useDraftAutoSave(state, {
          patchSideTreeChild: mocks.patchSideTreeChild,
        }),
      { initialProps: { state: draftState } },
    )

    await act(async () => vi.runOnlyPendingTimersAsync())
    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()

    view.rerender({
      state: {
        ...draftState,
        saveStatus: { ...draftState.saveStatus, saving: true },
      },
    })
    view.rerender({
      state: {
        ...draftState,
        saveStatus: {
          ...draftState.saveStatus,
          error: 'Slug: has already been taken',
          saving: false,
        },
      },
    })

    await act(async () => vi.runOnlyPendingTimersAsync())
    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()

    await act(async () => view.result.current.save())
    expect(mocks.saveDocDraft).toHaveBeenCalledTimes(2)

    view.rerender({
      state: {
        ...draftState,
        draft: { ...draftState.draft, title: 'Updated guide' },
      },
    })
    await act(async () => vi.runOnlyPendingTimersAsync())
    expect(mocks.saveDocDraft).toHaveBeenCalledTimes(3)
  })

  it('reuses command identity for one bounded unknown-transport recovery', async () => {
    mocks.saveDocDraft
      .mockRejectedValueOnce(
        new ContentPublishError('unknown', { code: 'transport_unknown', status: 0 }),
      )
      .mockResolvedValueOnce({ docId: 'doc-a', slug: 'guide', version: 4 })
    const view = renderHook(() =>
      useDraftAutoSave(createDraftState(), { patchSideTreeChild: mocks.patchSideTreeChild }),
    )

    await act(async () => view.result.current.save())

    expect(mocks.saveDocDraft).toHaveBeenCalledTimes(2)
    expect(mocks.saveDocDraft.mock.calls[0][0].commandId).toBe(
      mocks.saveDocDraft.mock.calls[1][0].commandId,
    )
  })

  it('automatically retries the latest draft after Retry-After expires', async () => {
    vi.useFakeTimers()
    mocks.saveDocDraft
      .mockRejectedValueOnce(
        new ContentPublishError('slow down', {
          code: 'rate_limited',
          retryAfter: 1,
          status: 429,
        }),
      )
      .mockResolvedValueOnce({ docId: 'doc-a', slug: 'guide', version: 4 })
    const draftState = createDraftState()
    const view = renderHook(
      ({ state }) => useDraftAutoSave(state, { patchSideTreeChild: mocks.patchSideTreeChild }),
      { initialProps: { state: draftState } },
    )

    await act(async () => view.result.current.save())
    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()

    view.rerender({
      state: {
        ...draftState,
        draft: { ...draftState.draft, title: 'Latest guide' },
      },
    })
    await act(async () => vi.advanceTimersByTimeAsync(1_000))

    expect(mocks.saveDocDraft).toHaveBeenCalledTimes(2)
    expect(mocks.saveDocDraft.mock.calls[1][0]).toMatchObject({ title: 'Latest guide' })
    expect(mocks.saveDocDraft.mock.calls[1][0].commandId).not.toBe(
      mocks.saveDocDraft.mock.calls[0][0].commandId,
    )
  })

  it('cancels a rate-limit retry when the editor unmounts', async () => {
    vi.useFakeTimers()
    mocks.saveDocDraft.mockRejectedValueOnce(
      new ContentPublishError('slow down', {
        code: 'rate_limited',
        retryAfter: 1,
        status: 429,
      }),
    )
    const view = renderHook(() =>
      useDraftAutoSave(createDraftState(), { patchSideTreeChild: mocks.patchSideTreeChild }),
    )

    await act(async () => view.result.current.save())
    view.unmount()
    await act(async () => vi.advanceTimersByTimeAsync(1_000))

    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()
  })

  it('cancels a rate-limit retry when switching documents', async () => {
    vi.useFakeTimers()
    mocks.saveDocDraft.mockRejectedValueOnce(
      new ContentPublishError('slow down', {
        code: 'rate_limited',
        retryAfter: 1,
        status: 429,
      }),
    )
    const draftState = createDraftState()
    const view = renderHook(
      ({ state }) => useDraftAutoSave(state, { patchSideTreeChild: mocks.patchSideTreeChild }),
      { initialProps: { state: draftState } },
    )

    await act(async () => view.result.current.save())
    view.rerender({
      state: {
        ...draftState,
        activePage: { ...draftState.activePage, docId: 'doc-b', id: 'page-b' },
        dirty: false,
        draft: { ...draftState.draft, docId: 'doc-b' },
      },
    })
    await act(async () => vi.advanceTimersByTimeAsync(1_000))

    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()
  })

  it('reloads canonical version while delegating local-edit preservation on conflict', async () => {
    mocks.saveDocDraft.mockRejectedValueOnce(
      new ContentPublishError('conflict', { code: 'version_conflict', status: 409 }),
    )
    mocks.browserGraphQLRequest.mockResolvedValueOnce({
      docDraft: {
        body: { json: '[{"type":"p","children":[{"text":"Server"}]}]' },
        docId: 'doc-a',
        id: 'draft-a',
        slug: 'guide',
        subtitle: '',
        title: 'Guide',
        version: 4,
      },
    })
    const view = renderHook(() =>
      useDraftAutoSave(createDraftState(), { patchSideTreeChild: mocks.patchSideTreeChild }),
    )

    await act(async () => view.result.current.save())

    expect(mocks.browserGraphQLRequest).toHaveBeenCalledOnce()
    expect(mocks.reconcileConflict).toHaveBeenCalledWith(expect.objectContaining({ version: 4 }))
    expect(mocks.saveDocDraft).toHaveBeenCalledOnce()
  })
})
