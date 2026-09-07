import { CACHE_TAG, isCacheTag } from './cache'

describe('cache tag contract', () => {
  it('accepts tags emitted by the public cache owner', () => {
    expect(isCacheTag(CACHE_TAG.communityCache('home'))).toBe(true)
    expect(isCacheTag(CACHE_TAG.commentsCache('home', 'POST', '42'))).toBe(true)
    expect(isCacheTag(CACHE_TAG.docTreeCache('home'))).toBe(true)
  })

  it('rejects malformed or non-string tags before purge', () => {
    expect(isCacheTag('community[]')).toBe(false)
    expect(isCacheTag('community[home]/all')).toBe(false)
    expect(isCacheTag('community[home]-thread[POST]-article[42]-comments')).toBe(true)
    expect(isCacheTag(null)).toBe(false)
  })
})
