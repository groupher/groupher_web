import { FC } from 'react'

import { ROUTE } from '@/constant'

import {
  Wrapper,
  Brand,
  BrandTitle,
  LinksWrapper,
  LinkItem,
  RequestDemo,
  DemoIcon,
} from './styles/header'

const Header: FC = () => {
  return (
    <Wrapper>
      <Brand>
        <BrandTitle>Groupher</BrandTitle>
      </Brand>
      <LinksWrapper>
        <LinkItem href={ROUTE.HOME}>讨论区</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.KANBAN}`}>看板</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.CHANGELOG}`}>更新日志</LinkItem>
        <LinkItem href={`/${ROUTE.HOME}/${ROUTE.HELP}`}>帮助台</LinkItem>
        <LinkItem href={ROUTE.HOME}>讨论区</LinkItem>
      </LinksWrapper>

      <RequestDemo>
        <DemoIcon />
        <div>预约演示</div>
      </RequestDemo>
    </Wrapper>
  )
}

export default Header
