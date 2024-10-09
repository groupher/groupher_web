import type { FC } from 'react'

import type { TThread } from '~/spec'
import { THREAD } from '~/const/thread'
import { COLOR_NAME } from '~/const/colors'

import PreviewBars from './PreviewBars'

import useSalon, { cn, ICON } from '../styles/articles_intro_tabs/tabs'

const TAB_ITEMS = [
  {
    key: THREAD.POST,
    title: '讨论区',
    desc: '功能请求 / Bug / 技术支持',
    color: COLOR_NAME.PURPLE,
  },
  {
    key: THREAD.KANBAN,
    title: '看板',
    desc: '已规划 / 进行中 / 已完成',
    color: COLOR_NAME.BLUE,
  },
  {
    key: THREAD.CHANGELOG,
    title: '更新日志',
    desc: '新功能 / 修复 / 版本日志',
    color: COLOR_NAME.RED,
  },
  {
    key: THREAD.DOC,
    title: '帮助台',
    desc: '知识库 / 教程 / 产品手册',
    color: COLOR_NAME.CYAN,
  },
]

type TProps = {
  tab: TThread
  onChange: (tab: TThread) => void
}
const Tabs: FC<TProps> = ({ tab, onChange }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      {TAB_ITEMS.map((item) => {
        const color = item.color.toLowerCase()
        const active = item.key === tab
        const CurIcon = ICON[item.key]

        return (
          <div
            key={item.key}
            className={cn(s.tabItem, active && s.tabActive, active && s[`${color}Border`])}
            onClick={() => onChange(item.key as TThread)}
          >
            <div className={cn(s.iconBox, s[`${color}Border`], active && s[`${color}Bg`])}>
              <PreviewBars color={color} tab={item.key} />
              <CurIcon
                className={cn(
                  s.icon,
                  s[`${color}Fill`],
                  item.key === THREAD.KANBAN && 'rotate-180 -bottom-2.5',
                )}
              />
            </div>

            <h3 className={cn(s.title, active && s.titleActive)}>{item.title}</h3>
            <div className={cn(s.desc, active && s.descActive)}>{item.desc}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Tabs
