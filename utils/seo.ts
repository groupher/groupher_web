import { SITE_URL } from '@/config'

import type { TCommunity, TThread, TArticle, TUser } from '@/spec'
import { ROUTE } from '@/constant/route'
import { THREAD } from '@/constant/thread'

import { plural } from './fmt'

const SLOGAN =
  '让你的产品聆听用户的声音。互动讨论，GTD 看板，更新日志，帮助文档多合一，收集整理用户用户反馈，助你打造更好的产品。'

type TSEO = {
  url: string
  title: string
  description: string
  //
  datePublished?: string
  dateModified?: string
  authorName?: string
  images?: string[]
  // user
}

export const communitySEO = (community: TCommunity, thread: TThread): TSEO => {
  const { raw, title, desc } = community

  return {
    url: `${SITE_URL}/${raw}/${plural(thread)}`,
    title: raw === 'home' ? 'Groupher' : `${title} 社区`,
    description: raw === 'home' ? SLOGAN : `${desc}`,
  }
}

export const articleSEO = (thread: TThread = THREAD.POST, article: TArticle): TSEO => {
  const { id, title, insertedAt, updatedAt, author } = article

  return {
    url: `${SITE_URL}/${thread}/${id}`,
    title: `${title}`,
    datePublished: `${insertedAt}`,
    dateModified: `${updatedAt}`,
    authorName: `${author.nickname}`,
    description: `${title}`, // TODO:
    images: [],
  }
}

export const articlePublishSEO = (thread: TThread = THREAD.POST): TSEO => {
  switch (thread) {
    default: {
      return {
        url: `${SITE_URL}/publish/post`,
        title: '发布帖子',
        description: '发布新帖子到社区',
      }
    }
  }
}

export const landingSEO = (): TSEO => {
  return {
    url: `${SITE_URL}`,
    title: 'Groupher | 让你的产品聆听用户的声音',
    description: SLOGAN,
  }
}

export const articleUpdateSEO = (): TSEO => {
  return {
    url: `${SITE_URL}/todo`,
    title: '编辑帖子',
    description: '编辑帖子',
  }
}

export const userSEO = (user: TUser): TSEO => {
  return {
    title: `${user.nickname}`,
    url: `${SITE_URL}/${ROUTE.USER}/${user.login}`,
    description: user.bio,
  }
}

export const publishCommunitySEO = (): TSEO => {
  return {
    url: `${SITE_URL}/apply/community`,
    title: '建立新社区',
    description: '建立新社区',
  }
}
