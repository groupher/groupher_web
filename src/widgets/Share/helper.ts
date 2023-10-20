import type { TArticle } from '@/spec'

import { SITE_URL } from '@/config'

export const parseArticleLink = (article: TArticle): string => {
  if (!article?.meta?.thread) return ''

  const { meta, originalCommunity, innerId } = article
  const community = originalCommunity.slug
  const thread = meta.thread.toLowerCase()

  return `${SITE_URL}/${community}/${thread}/${innerId}`
}

export const holder = 1
