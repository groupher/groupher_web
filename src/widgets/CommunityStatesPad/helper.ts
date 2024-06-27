import type { TCommunity } from '~/spec'

// use articlesCount instead
export const getContentCount = (community: TCommunity): number => {
  const { meta } = community
  if (!meta) return 0

  const { postsCount, changelogsCount, blogsCount, docsCount } = meta
  return postsCount + changelogsCount + blogsCount + docsCount
}

export const holder = 1
