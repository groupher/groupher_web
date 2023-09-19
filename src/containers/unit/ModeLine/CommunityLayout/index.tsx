import { FC, useState } from 'react'
import { observer } from 'mobx-react'

import type { TArticle, TTag, TGroupedTags } from '@/spec'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { scrollToHeader } from '@/dom'

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
  activeTag: TTag
  groupedTags: TGroupedTags
}

const CommunityLayout: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  isMobile,
  show,
  article = null,
  activeMenu,
  activeTag,
  groupedTags,
}) => {
  const community = useViewingCommunity()
  const [expand, setExpand] = useState(false)

  return (
    <Wrapper testid={testid} show={show} isMenuActive={!!activeMenu}>
      <InnerWrapper expand={expand}>
        <MainMenusWrapper>
          <CommunityLogo src={community.logo} />
          <MobileThreadNavi mode="modeline" />
          <ArticlesFilter
            isMobile={isMobile}
            mode="modeline"
            activeTag={activeTag}
            groupedTags={groupedTags}
            modelineExpand={expand}
          />

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
