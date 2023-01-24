/*
 *
 */

import { FC, memo } from 'react'

import { ROUTE } from '@/constant/route'

import { Space } from '@/widgets/Common'
import { Wrapper, MainArea, MenuLink, MenuItem, Icon, AccountWrapper } from './styles/help_layout'

type TProps = {
  testid?: string
}

const HelpLayout: FC<TProps> = ({ testid = 'sidebar-layout-header' }) => {
  const margin = 8
  const community = 'home'

  return (
    <Wrapper testid={testid}>
      <MainArea>
        <MenuLink href={`/${community}/${ROUTE.POST}`}>
          <Icon.Home />
          <MenuItem>官网 </MenuItem>
        </MenuLink>
        <Space right={margin} />
        <MenuLink href={`/${community}/${ROUTE.POST}`}>
          <Icon.Discuss />
          <MenuItem>讨论区</MenuItem>
        </MenuLink>
        <Space right={margin} />
        <MenuLink href={`/${community}/${ROUTE.KANBAN}`}>
          <Icon.Kanban />
          <MenuItem>看板</MenuItem>
        </MenuLink>
        <Space right={margin} />
        <MenuLink href={`/${community}/${ROUTE.CHANGELOG}`}>
          <Icon.Tada />
          <MenuItem>更新日志</MenuItem>
        </MenuLink>
        <Space right={margin} />
        <MenuLink href={`/${community}/${ROUTE.ABOUT}`}>
          <Icon.Info />
          <MenuItem>关于</MenuItem>
        </MenuLink>
      </MainArea>
      <AccountWrapper>account</AccountWrapper>
    </Wrapper>
  )
}

export default memo(HelpLayout)
