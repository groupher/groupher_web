import type { TArticle } from '@/spec'

import { SITE_URL } from '@/config'
import { openShareWindow } from '@/helper'

import type { TLinksData } from './spec'
import { SHARE_TYPE } from './constant'

export const parseArticleLink = (article: TArticle): string => {
  if (!article?.meta?.thread) return ''

  const { meta, originalCommunity, innerId } = article
  const community = originalCommunity.slug
  const thread = meta.thread.toLowerCase()

  return `${SITE_URL}/${community}/${thread}/${innerId}`
}

export const parseLinksData = (article: TArticle): TLinksData => {
  if (!article?.meta?.thread) {
    return {
      link: '',
      html: '',
      md: '',
      orgMode: '',
    }
  }

  const { title } = article
  const link = parseArticleLink(article)

  return {
    link,
    html: `<a href="${link}">${title}</a>`,
    md: `[${title}](${link})`,
    orgMode: `[[${link}][${title}]]`,
  }
}

export const toPlatform = (article: TArticle, type: string): void => {
  const url = parseArticleLink(article)
  const { title, digest } = article

  switch (type) {
    case SHARE_TYPE.TWITTER: {
      const param = { url, text: title }

      return openShareWindow('https://twitter.com/intent/tweet', param)
      // return openShareWindow('https://twitter.com/share', param)
    }

    case SHARE_TYPE.TELEGRAM: {
      const param = { url, text: title }

      return openShareWindow('https://telegram.me/share/url', param)
    }

    case SHARE_TYPE.EMAIL: {
      const param = { subject: title, body: `${url}\n\n${digest}` }
      return openShareWindow('mailto:', param)
    }

    case SHARE_TYPE.FACEBOOK: {
      const param = { u: url }
      return openShareWindow('https://facebook.com/share.php', param)
    }

    case SHARE_TYPE.DOUBAN: {
      const param = { href: url, name: title }
      return openShareWindow('https://shuo.douban.com/!service/share', param)
    }

    case SHARE_TYPE.WEIBO: {
      const param = { url, title }
      return openShareWindow('https://service.weibo.com/share/share.php', param)
    }

    default: {
      // eslint-disable-next-line no-useless-return
      return
    }
  }
}
