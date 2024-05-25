import { FC } from 'react'

import type { TThread } from '@/spec'
import { THREAD } from '@/const/thread'
import { COLOR_NAME } from '@/const/colors'

import PreviewBars from './PreviewBars'

import { Wrapper, TabItem, IconBox, Icon, Title, Desc } from '../styles/articles_intro_tabs/tabs'

const TAB_ITEMS = [
  {
    key: THREAD.POST,
    title: '讨论区',
    desc: '功能请求 / Bug / 问题 / 交流',
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
    desc: '文档中心 / 产品手册',
    color: COLOR_NAME.CYAN,
  },
]

type TProps = {
  tab: TThread
  onChange: (tab: TThread) => void
}
const Tabs: FC<TProps> = ({ tab, onChange }) => {
  return (
    <Wrapper>
      {TAB_ITEMS.map((item) => {
        const $color = item.color
        const $active = item.key === tab
        const CurIcon = Icon[item.key]

        return (
          <TabItem key={item.key} $active={$active} onClick={() => onChange(item.key as TThread)}>
            <IconBox $color={$color} $active={$active}>
              <PreviewBars $color={$color} tab={item.key} />
              <CurIcon $color={$color} />
            </IconBox>
            <Title $active={$active}>{item.title}</Title>
            <Desc>{item.desc}</Desc>
          </TabItem>
        )
      })}
    </Wrapper>
  )
}

export default Tabs
