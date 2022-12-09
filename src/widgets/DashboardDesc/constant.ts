import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant'
import { mockUsers } from '@/utils/mock'
import { getRandomInt } from '@/utils/helper'

import type { TPreviewDevice } from './spec'

const demoPost = {
  id: '0',
  title: '帖子是否可以像评论一样开放表情功能?',
  digest:
    '帖子以及更新日志等文章类除了常见的 Upvote 以外，是否可以支持表情功能，像目前评论一样，但是具体表情有区别',
  views: getRandomInt(50, 399),
  upvotesCount: getRandomInt(10, 99),
  commentsCount: getRandomInt(5, 88),
  articleTags: [
    {
      color: 'GREEN',
      title: 'UI交互',
      raw: 'roadmap',
    },
  ],
  category: ARTICLE_CAT.FEATURE,
  state: ARTICLE_STATE.TODO,
  originalCommunity: {
    raw: 'demo',
  },
  commentsParticipants: mockUsers(3),

  meta: {
    latestUpvotedUsers: mockUsers(3),
  },
  author: mockUsers(1)[0],
}

export const DEMO_POSTS = [
  demoPost,
  {
    ...demoPost,
    id: '1',
    title: '看板板块在手机端显示异常',
    digest: '手机端帖子标题换行有错位问题，看起来不够直观，建议参考电商常见的搜索热榜等展示形式。',
    category: ARTICLE_CAT.BUG,
    state: ARTICLE_STATE.WIP,
    articleTags: [
      {
        color: 'ORANGE',
        title: '移动端',
        raw: 'mobile',
      },
    ],
    views: getRandomInt(5, 39),
    upvotesCount: getRandomInt(5, 99),
    commentsCount: getRandomInt(5, 99),
  },
  {
    ...demoPost,
    id: '11',
    title: '关于帖子布局模式的说明',
    digest: '帖子布局除了可以全局设置以外，还可以针对不同的标签做自定义设置。',
    category: ARTICLE_CAT.FEATURE,
    state: ARTICLE_STATE.DEFAULT,
    articleTags: [
      {
        color: 'CYAN',
        title: '官方公告',
        raw: 'mobile',
      },
    ],
    views: getRandomInt(5, 39),
    upvotesCount: getRandomInt(5, 99),
    commentsCount: getRandomInt(5, 99),
  },
  {
    ...demoPost,
    id: '2',
    title: '用户页能否看到发帖历史？',
    digest: '用户主页能否展示在社区内的历史发帖或评论，提高用户参与的热情？',
    category: ARTICLE_CAT.QUESTION,
    state: ARTICLE_STATE.RESOLVE,
    articleTags: [
      {
        color: 'GREEN',
        title: '账户设置',
        raw: 'account',
      },
    ],
    views: getRandomInt(10, 399),
    upvotesCount: getRandomInt(20, 99),
    commentsCount: getRandomInt(7, 99),
  },
  {
    ...demoPost,
    id: '5',
    title: '是否支持私有部署？',
    digest: '支持，请在帮助中心中查看具体步骤',
    category: ARTICLE_CAT.FEATURE,
    state: ARTICLE_STATE.REJECT_DUP,
    articleTags: [
      {
        color: 'RED',
        title: '部署',
        raw: 'account',
      },
    ],
    views: getRandomInt(10, 399),
    upvotesCount: getRandomInt(2, 99),
    commentsCount: getRandomInt(7, 99),
  },
]

export const PREVIEW_MODE = {
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
} as Record<Uppercase<TPreviewDevice>, TPreviewDevice>
