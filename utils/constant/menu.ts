import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
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
    title: '待办',
    icon: MENU.TODO,
  },
  {
    key: ARTICLE_STATE.WIP,
    title: '进行中',
    icon: MENU.WIP,
  },
  {
    key: ARTICLE_STATE.DONE,
    title: '已完成',
    icon: MENU.DONE,
  },
  {
    key: ARTICLE_STATE.REJECT,
    title: '关闭',
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_DUP,
    title: '重复问题',
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_NO_PLAN,
    title: '无计划',
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_REPRO,
    title: '无法重现',
    icon: MENU.CLOSE,
  },
  {
    key: ARTICLE_STATE.REJECT_STALE,
    title: '过时',
    icon: MENU.CLOSE,
  },
]

export default MENU
