import type { FC } from 'react'

import { ROUTE } from '~/const/route'

import Tooltip from '~/widgets/Tooltip'

import { Wrapper, ListIcon, Title, Item } from './styles/mobile_menu'

const MobileMenu: FC = () => {
  return (
    <Tooltip
      content={
        <Wrapper>
          <Item href={`/${ROUTE.HOME}`}>官方社区</Item>
          <Item href={`/${ROUTE.HOME}/${ROUTE.KANBAN}`}>开发计划</Item>
          <Title>产品</Title>
          <Item href={`/${ROUTE.HOME}`}>讨论区</Item>
          <Item href={`/${ROUTE.HOME}`}>GTD 看板</Item>
          <Item href={`/${ROUTE.HOME}`}>更新日志</Item>
          <Item href={`/${ROUTE.HOME}`}>帮助台</Item>
          <Item href={`/${ROUTE.BOOK_DEMO}`}>预约演示</Item>
          <Title>了解更多</Title>
          <Item href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>文档中心</Item>
          <Item href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>自定义</Item>
        </Wrapper>
      }
      placement="bottom-end"
      trigger="click"
      offset={[0, -22]}
      noPadding
    >
      <ListIcon />
    </Tooltip>
  )
}

export default MobileMenu
