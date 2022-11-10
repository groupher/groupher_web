/* eslint-disable jsx-a11y/accessible-emoji */
import { FC, memo } from 'react'

import type { TArticle, TC11NLayout, TMetric } from '@/spec'
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
} from '../styles/desktop_view/article_layout'

type TProps = {
  article: TArticle
  metric: TMetric
  layout: TC11NLayout
}

const BriefView: FC<TProps> = ({ metric, article, layout }) => {
  return (
    <Wrapper metric={metric} layout={layout}>
      <InnerWrapper>
        <TopInfo metric={METRIC.ARTICLE} article={article} noBottomBorder />
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
            <Item href={`/${ROUTE.FRIENDS}`}>友链</Item>
          </BaseInfo>
        </MainInfos>
      </InnerWrapper>
      <BottomInfo metric={metric} />
    </Wrapper>
  )
}

export default memo(BriefView)
