import { describe, expect, it } from 'vitest'

import {
  communityPublicPath,
  isCommunityPathContextTrusted,
  isDirectCommunityOriginPage,
  isPlatformHost,
} from './public-path'

describe('community public path context', () => {
  it('requires the rewritten path to carry the trusted community slug', () => {
    expect(isCommunityPathContextTrusted('/home/post/123', 'home')).toBe(true)
    expect(isCommunityPathContextTrusted('/post/123', 'home')).toBe(false)
    expect(isCommunityPathContextTrusted('/other/post/123', 'home')).toBe(false)
  })

  it('removes the internal slug only for custom-domain paths', () => {
    expect(communityPublicPath('home', '/post/123', true)).toBe('/post/123')
    expect(communityPublicPath('home', '/post/123', false)).toBe('/home/post/123')
  })

  it('keeps the community dev host in platform-path mode', () => {
    expect(isPlatformHost('community.groupher.localhost')).toBe(true)
    expect(isPlatformHost('home.example.com')).toBe(false)
  })

  it('rejects public pages on the production deployment origin but preserves health checks', () => {
    expect(isDirectCommunityOriginPage('community.groupher.com', '/home/post')).toBe(true)
    expect(isDirectCommunityOriginPage('COMMUNITY.GROUPHER.COM.', '/home')).toBe(true)
    expect(isDirectCommunityOriginPage('community.groupher.com', '/health')).toBe(false)
    expect(isDirectCommunityOriginPage('groupher.com', '/home/post')).toBe(false)
    expect(isDirectCommunityOriginPage('community.groupher.localhost', '/home/post')).toBe(false)
  })
})
