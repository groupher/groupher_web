import { renderHook } from '@testing-library/react'

import useCursorArticleChunks from '~/hooks/useCursorArticleChunks'
import type { TPost } from '~/spec'

import { mergeCursorArticlePages } from './merge'

const article = (innerId: string, community = 'home', thread = 'POST'): TPost =>
  ({ innerId, community: { slug: community }, meta: { thread } }) as TPost
const adapt = (page: { entries: TPost[] }) => page.entries

it('deduplicates live pages by public path while preserving pinned precedence and chunk boundaries', () => {
  const pinned = { ...article('1'), isPinned: true }
  const first = [pinned, article('2')]
  const second = [
    article('2'),
    article('1'),
    article('3'),
    article('1', 'other'),
    article('1', 'home', 'CHANGELOG'),
  ]
  const result = mergeCursorArticlePages([first, second])
  expect(result.duplicateCount).toBe(2)
  expect(result.chunks[0]).toEqual(first)
  expect(result.chunks[0][0]).toBe(pinned)
  expect(result.chunks[1]).toEqual(second.slice(2))
  expect(second).toHaveLength(5)
})

it('reports duplicate counts without exposing article coordinates and keeps prior chunk contents when appending', () => {
  const events: unknown[] = []
  const listener = (event: Event) => events.push((event as CustomEvent).detail)
  window.addEventListener('groupher:pagi', listener)
  try {
    const first = { entries: [article('1')] }
    const { result, rerender } = renderHook(
      ({ pages }) => useCursorArticleChunks(pages, adapt, 'posts'),
      { initialProps: { pages: [first] } },
    )
    const prior = result.current[0]
    rerender({ pages: [first, { entries: [article('1'), article('2')] }] })
    expect(result.current[0]).toEqual(prior)
    expect(result.current[1].map((entry) => entry.innerId)).toEqual(['2'])
    expect(events).toEqual([{ surface: 'posts', event: 'duplicate_entries', count: 1 }])
    rerender({ pages: [first] })
    expect(result.current).toEqual([[article('1')]])
  } finally {
    window.removeEventListener('groupher:pagi', listener)
  }
})
