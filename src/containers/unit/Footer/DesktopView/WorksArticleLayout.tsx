import { FC, memo } from 'react'

import type { TArticle } from '@/spec'
import { ICON, GITHUB, ABOUT_LINK } from '@/config'
import { METRIC, ROUTE } from '@/constant'
import { joinUS } from '@/utils/helper'

import TopInfo from './TopInfo'
import BottomInfo from './BottomInfo'

import {
  Wrapper,
  InnerWrapper,
  MainInfos,
  BaseInfo,
  Item,
  NoLinkItem,
  HeartCrabIcon,
} from '../styles/desktop_view/works_article_layout'

type TProps = {
  viewingArticle: TArticle
}

const WorksArticleLayout: FC<TProps> = ({ viewingArticle }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <TopInfo
          metric={METRIC.WORKS_ARTICLE}
          article={viewingArticle}
          noBottomBorder
        />
        <MainInfos>
          <BaseInfo>
            <Item href={`${ABOUT_LINK}`}>关于</Item>
            <Item href={`/${ROUTE.APPLY_COMMUNITY}`}>创建社区</Item>
            <NoLinkItem onClick={() => joinUS()}>加入群聊</NoLinkItem>
            <Item href={`${GITHUB}`} rel="noopener noreferrer" target="_blank">
              Github
            </Item>
            <Item href="/feedback">反馈建议</Item>
            <Item href={`/${ROUTE.SPONSOR}`}>
              <HeartCrabIcon src={`${ICON}/emotion/heart.png`} noLazy />
              特别感谢
            </Item>
            <Item href={`/${ROUTE.FRIENDS}`} passHref>
              友链
            </Item>
          </BaseInfo>
        </MainInfos>
      </InnerWrapper>
      <BottomInfo metric={METRIC.WORKS_ARTICLE} />
    </Wrapper>
  )
}

export default memo(WorksArticleLayout)
