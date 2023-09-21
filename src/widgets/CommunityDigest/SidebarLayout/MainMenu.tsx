import { FC } from 'react'

import type { TCommunity, TThread, TEnableConfig } from '@/spec'
import { THREAD } from '@/constant/thread'

import { SpaceGrow } from '@/widgets/Common'

import {
  Wrapper,
  MenuItem,
  IconWrapper,
  HomeIcon,
  KanbanIcon,
  DiscussIcon,
  TadaIcon,
  InfoIcon,
  GuideIcon,
  MenuTitle,
  OutLinkIcon,
} from '../styles/sidebar_layout/main_menu'

type TProps = {
  community: TCommunity
  activeThread: TThread
  enable: TEnableConfig
}

const MainMenu: FC<TProps> = ({ community, activeThread, enable }) => {
  const communityPath = community?.slug || 'home'

  // TODO: refactor later
  return (
    <Wrapper>
      <MenuItem href="/">
        <IconWrapper>
          <HomeIcon />
        </IconWrapper>
        <MenuTitle>官网</MenuTitle>
        <SpaceGrow />
        <OutLinkIcon />
      </MenuItem>
      {enable.post && (
        <MenuItem $active={activeThread === THREAD.POST} href={`/${communityPath}/${THREAD.POST}`}>
          <IconWrapper>
            <DiscussIcon $active={activeThread === THREAD.POST} />
          </IconWrapper>
          <MenuTitle $active={activeThread === THREAD.POST}>讨论区</MenuTitle>
        </MenuItem>
      )}

      {enable.kanban && (
        <MenuItem
          $active={activeThread === THREAD.KANBAN}
          href={`/${communityPath}/${THREAD.KANBAN}`}
        >
          <IconWrapper>
            <KanbanIcon />
          </IconWrapper>
          <MenuTitle>看板</MenuTitle>
        </MenuItem>
      )}
      {enable.changelog && (
        <MenuItem
          $active={activeThread === THREAD.CHANGELOG}
          href={`/${communityPath}/${THREAD.CHANGELOG}`}
        >
          <IconWrapper>
            <TadaIcon />
          </IconWrapper>
          <MenuTitle>更新日志</MenuTitle>
        </MenuItem>
      )}
      {enable.doc && (
        <MenuItem $active={activeThread === THREAD.DOC} href={`/${communityPath}/${THREAD.DOC}`}>
          <IconWrapper>
            <GuideIcon />
          </IconWrapper>
          <MenuTitle>帮助台</MenuTitle>
        </MenuItem>
      )}
      {enable.about && (
        <MenuItem
          $active={activeThread === THREAD.ABOUT}
          href={`/${communityPath}/${THREAD.ABOUT}`}
        >
          <IconWrapper>
            <InfoIcon />
          </IconWrapper>
          <MenuTitle>关于</MenuTitle>
        </MenuItem>
      )}
    </Wrapper>
  )
}

export default MainMenu
