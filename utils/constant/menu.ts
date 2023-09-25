import { ARTICLE_CAT } from '@/constant/gtd'
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
    title: '功能建议',
    desc: '提需求，功能建议等',
    icon: MENU.FEATURE,
  },
  {
    key: ARTICLE_CAT.BUG,
    title: '问题报告',
    desc: '使用中遇到的错误，问题等',
    icon: MENU.BUG,
  },
  {
    key: ARTICLE_CAT.QUESTION,
    title: '求助/疑问',
    desc: '请求帮助，使用疑惑等',
    icon: MENU.HELP,
  },
  {
    key: ARTICLE_CAT.OTHER,
    title: '其他讨论',
    desc: '一般讨论，其他话题',
    icon: MENU.OTHER,
  },
]

export default MENU
