import { THREAD } from '~/const/thread'

import { viewerQueries } from './viewer'

const { browserGraphQLRequest } = vi.hoisted(() => ({ browserGraphQLRequest: vi.fn() }))
vi.mock('~/graphql/client', () => ({ browserGraphQLRequest }))

describe('viewer query factories', () => {
  beforeEach(() => browserGraphQLRequest.mockReset())

  it('loads canonical article viewer state from the batch operation', async () => {
    const state = {
      community: 'home',
      thread: THREAD.DOC,
      innerId: '42',
      viewerHasViewed: true,
      viewerHasUpvoted: true,
    }
    browserGraphQLRequest.mockResolvedValue({ articleViewerStates: [state] })
    const options = viewerQueries.articleStates('alice', [
      { community: 'home', thread: THREAD.DOC, innerId: '42' },
    ])

    await expect(options.queryFn?.({} as never)).resolves.toEqual({
      'home:DOC:42': { articleKey: 'home:DOC:42', viewerHasViewed: true, viewerHasUpvoted: true },
    })
    expect(browserGraphQLRequest).toHaveBeenCalledOnce()
  })

  it('owns comment summary and viewer participation state in a viewer-scoped query', async () => {
    const summary = {
      totalCount: 3,
      isViewerJoined: true,
      participantsCount: 1,
      participants: [{ login: 'alice' }],
    }
    browserGraphQLRequest.mockResolvedValue({ commentsState: summary })
    const options = viewerQueries.commentSummary('alice', 'home', THREAD.POST, '42')

    await expect(options.queryFn?.({} as never)).resolves.toEqual(summary)
    expect(options.queryKey).toEqual(['viewer', 'alice', 'comment-summary', 'home:POST:42'])
  })

  it('deduplicates and chunks article refs while keeping one canonical query key', async () => {
    browserGraphQLRequest.mockResolvedValue({ articleViewerStates: [] })
    const refs = Array.from({ length: 101 }, (_, index) => ({
      community: 'home',
      thread: THREAD.POST,
      innerId: String(101 - index),
    }))
    const options = viewerQueries.articleStates('alice', [...refs, refs[0]])

    await options.queryFn?.({} as never)

    expect(browserGraphQLRequest).toHaveBeenCalledTimes(2)
    expect(browserGraphQLRequest.mock.calls[0][1].refs).toHaveLength(100)
    expect(browserGraphQLRequest.mock.calls[1][1].refs).toHaveLength(1)
    expect(options.queryKey).toEqual([
      'viewer',
      'alice',
      'article-state',
      Array.from({ length: 101 }, (_, index) => `home:POST:${index + 1}`).sort((a, b) =>
        a.localeCompare(b),
      ),
    ])
  })

  it('chunks comment ids and returns only viewer-owned fields', async () => {
    browserGraphQLRequest.mockResolvedValue({
      commentViewerStates: [
        {
          innerId: '7',
          viewerHasUpvoted: true,
          viewerHasReported: false,
          emotions: [{ type: 'HEART', viewerHasReacted: true }],
        },
      ],
    })
    const ids = Array.from({ length: 101 }, (_, index) => String(index + 1))
    const options = viewerQueries.commentStates(
      'alice',
      { community: 'home', thread: THREAD.POST, innerId: '42' },
      [...ids, '7'],
    )

    await expect(options.queryFn?.({} as never)).resolves.toMatchObject({
      '7': {
        viewerHasUpvoted: true,
        viewerHasReported: false,
        emotionFlags: { HEART: true },
      },
    })
    expect(browserGraphQLRequest).toHaveBeenCalledTimes(2)
    expect(browserGraphQLRequest.mock.calls[0][1].commentInnerIds).toHaveLength(100)
    expect(browserGraphQLRequest.mock.calls[1][1].commentInnerIds).toHaveLength(1)
  })
})
