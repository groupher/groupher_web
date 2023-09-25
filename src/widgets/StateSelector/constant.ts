import { ARTICLE_STATE } from '@/constant/gtd'
import MENU from '@/constant/menu'

export const MENU_ITEMS = [
  {
    key: ARTICLE_STATE.TODO,
    title: '计划中',
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
]

export const holder = 1
