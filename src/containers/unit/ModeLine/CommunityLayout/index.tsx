import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticle } from '@/spec'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { scrollToHeader } from '@/dom'
import { assetSrc } from '@/helper'

import MobileThreadNavi from '@/widgets/MobileThreadNavi'
import ArticlesFilter from '@/widgets/ArticlesFilter'

import {
  Wrapper,
  InnerWrapper,
  MainMenusWrapper,
  CommunityLogo,
  MoreIcon,
  Go2TopWrapper,
  GotoTopIcon,
} from '../styles/community_layout'

type TProps = {
  testid?: string
  isMobile: boolean
  show: boolean
  activeMenu: string // TModelineType
  article: TArticle | null
}

const CommunityLayout: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  isMobile,
  show,
  article = null,
  activeMenu,
}) => {
  const community = useViewingCommunity()
  const [expand, setExpand] = useState(false)

  return (
    <Wrapper testid={testid} show={show} isMenuActive={!!activeMenu}>
      <InnerWrapper expand={expand}>
        <MainMenusWrapper>
          <CommunityLogo src={assetSrc(community.logo)} />
          <MobileThreadNavi mode="modeline" />
          <ArticlesFilter isMobile={isMobile} mode="modeline" />

          {!expand && <MoreIcon onClick={() => setExpand(true)} />}
        </MainMenusWrapper>
        <Go2TopWrapper
          onClick={() => {
            setExpand(false)
            scrollToHeader()
          }}
        >
          <GotoTopIcon />
        </Go2TopWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default observer(CommunityLayout)
