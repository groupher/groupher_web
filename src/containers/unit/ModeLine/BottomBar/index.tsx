import { FC, memo } from 'react'
import { useRouter } from 'next/router'
import { includes } from 'ramda'

import type { TArticle, TCommunity, TMetric, TModelineType } from '@/spec'

import METRIC from '@/constant/metric'
import TYPE from '@/constant/type'

import { scrollToHeader } from '@/utils/dom'

// import { MenuBlock, CommunityBlock, MainBlock, ExploreBlock, AccountBlock } from './ArrowBlock'
import {
  Wrapper,
  InnerWrapper,
  MainMenusWrapper,
  Go2TopWrapper,
  GotoTopIcon,
  MenuItem,
  MenuDesc,
} from '../styles/bottom_bar'

// import { openMenu } from '../logic'
import { communityPageMenus, getArticlePageMenus } from './menus'

type TProps = {
  testid?: string
  metric: TMetric
  activeMenu: string // TModelineType
  isCommunityBlockExpand?: boolean
  article: TArticle | null
  community: TCommunity
}

const BottomBar: FC<TProps> = ({
  testid = 'modeline-bottom-bar',
  metric,
  article = null,
  community,
  activeMenu,
  isCommunityBlockExpand = false,
}) => {
  const router = useRouter()

  const menus = includes(metric, [METRIC.ARTICLE, METRIC.WORKS_ARTICLE])
    ? getArticlePageMenus(article)
    : communityPageMenus

  // const communityInfo = article?.originalCommunity?.raw ? article.originalCommunity : community

  //               onClick={multiClick(() => openMenu(item.raw))}

  return (
    <Wrapper testid={testid} isMenuActive={!!activeMenu}>
      <InnerWrapper>
        <MainMenusWrapper>
          <MenuItem>
            <MenuDesc>讨论区</MenuDesc>
          </MenuItem>

          <MenuItem>
            <MenuDesc>排序</MenuDesc>
          </MenuItem>

          <MenuItem>
            <MenuDesc>标签</MenuDesc>
          </MenuItem>

          <MenuItem>
            <MenuDesc>类别</MenuDesc>
          </MenuItem>
        </MainMenusWrapper>
        <Go2TopWrapper onClick={() => scrollToHeader()}>
          <GotoTopIcon />
        </Go2TopWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default memo(BottomBar)
