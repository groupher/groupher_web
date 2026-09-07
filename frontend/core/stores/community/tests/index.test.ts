import { COMMUNITY_THREADS, THREAD_PATH } from '~/const/thread'
import type { TCommunityThread } from '~/spec'

import setupStore from '..'

describe('stores/community', () => {
  it('fills defaults and hydrates a confirmed Query projection', () => {
    const store = setupStore({ slug: 'home' })

    expect(store.slug).toBe('home')
    expect(store.title).toBe('')
    expect(store.threads).toEqual(COMMUNITY_THREADS)

    const threads: readonly TCommunityThread[] = [
      { slug: THREAD_PATH.POST, title: 'Posts', index: 2 },
      { slug: THREAD_PATH.ABOUT, title: 'About', index: 1 },
    ]

    store.hydrate({
      slug: 'home',
      title: 'Edge Community',
      // meta only supports count fields
      meta: {
        postsCount: 99999,
        docsCount: 0,
        changelogsCount: 1,
      },
      threads,
      contributesDigest: [1, 2, 3],
      subscribersCount: 99999,
    })

    expect(store.title).toBe('Edge Community')
    expect(store.meta).toEqual({
      postsCount: 99999,
      docsCount: 0,
      changelogsCount: 1,
    })
    expect(store.threads).toEqual(threads)
  })
})
