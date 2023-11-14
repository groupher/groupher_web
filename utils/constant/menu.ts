import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { ARTICLE_SORT } from '@/constant/sort'

import type { TMenu } from '@/spec'

const MENU = {
  ARROW_LEFT: 'ARROW_LEFT',
  ARROW_TO_LEFT: 'ARROW_TO_LEFT',
  ARROW_RIGHT: 'ARROW_RIGHT',
  ARROW_TO_RIGHT: 'ARROW_TO_RIGHT',
  //

  ARROW_UP: 'ARROW_UP',
  ARROW_TO_TOP: 'ARROW_TO_TOP',
  ARROW_DOWN: 'ARROW_DOWN',
  ARROW_TO_BOTTOM: 'ARROW_TO_BOTTOM',
  SETTING: 'SETTING',
  DELETE: 'DELETE',

  // sort
  PUBLISH: 'PUBLISH',
  UPVOTE: 'UPVOTE',
  COMMENT: 'COMMENT',
  VIEWS: 'VIEWS',
  // gtd
  TODO: 'TODO',
  WIP: 'WIP',
  DONE: 'DONE',
  CLOSE: 'CLOSE',
  FEATURE: 'FEATURE',
  BUG: 'BUG',
  HELP: 'HELP',
  ALL: 'ALL',
  OTHER: 'OTHER',
  TOOL: 'TOOL',
} as Record<Uppercase<TMenu>, Uppercase<TMenu>>

export const POST_CAT_MENU_ITEMS = [
  {
    key: ARTICLE_CAT.FEATURE,
    desc: '提需求，功能建议等',
    icon: MENU.FEATURE,
  },
  {
    key: ARTICLE_CAT.BUG,
    desc: '使用中遇到的错误，问题等',
    icon: MENU.BUG,
  },
  {
    key: ARTICLE_CAT.QUESTION,
    desc: '请求帮助，使用疑惑等',
    icon: MENU.HELP,
  },
  {
    key: ARTICLE_CAT.OTHER,
    desc: '一般讨论，其他话题',
    icon: MENU.OTHER,
  },
]

export const POST_STATE_MENU_ITEMS = [
  {
    key: ARTICLE_STATE.TODO,
    icon: MENU.TODO,
  },
  {
    key: ARTICLE_STATE.WIP,
    icon: MENU.WIP,
  },
  {
    key: ARTICLE_STATE.DONE,
    icon: MENU.DONE,
  },
  {
    key: ARTICLE_STATE.REJECT,
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_DUP,
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_NO_PLAN,
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_REPRO,
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_STALE,
    icon: MENU.CLOSE,
  },
]

export const POST_SORT_MENU_ITEMS = [
  {
    key: ARTICLE_SORT.PUBLISH,
    title: '发布时间',
    icon: MENU.PUBLISH,
  },
  {
    key: ARTICLE_SORT.UPVOTE,
    title: '投票数',
    icon: MENU.UPVOTE,
  },
  {
    key: ARTICLE_SORT.COMMENT,
    title: '评论数',
    icon: MENU.COMMENT,
  },
  {
    key: ARTICLE_SORT.VIEWS,
    title: '浏览量',
    icon: MENU.VIEWS,
  },
]

export default MENU
