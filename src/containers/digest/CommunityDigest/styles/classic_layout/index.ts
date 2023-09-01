import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { WIDTH, theme } from '@/css'

import { BaseBanner } from '../index'

const getMinHeight = (isMobile) => {
  if (isMobile) {
    return '140px'
  }

  return '430px'
}

type TWrapper = {
  isMobile: boolean
  metric?: TMetric
}
export const Wrapper = styled(BaseBanner)<TWrapper>`
  width: 100%;
  min-height: ${({ isMobile }) => getMinHeight(isMobile)};
`
export const InnerWrapper = styled.div<TWrapper>`
  ${css.row('justify-center')};
  min-height: ${({ isMobile }) => getMinHeight(isMobile)};
  width: 100%;
  // if use margin-left will cause horizontal scrollbar
  // 70 是经典布局为缩小帖子列表"视觉宽度"手动缩小的值
  ${({ metric }) => css.fitPageWidth(metric)};
  transition: min-height 0.25s;

  ${css.media.mobile`
     padding-left: 0;
  `};
`
export const BaseBannerContent = styled.div`
  ${css.column('align-center')};
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.PAGE};
`
export const BannerContentWrapper = styled(BaseBannerContent)`
  ${css.column()};
`
export const TabBarWrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.CONTENT};
  margin-left: 85px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const CustomPart = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  padding-right: 45px;
  font-weight: 500;
  cursor: pointer;
  /* color: #f8604e; */
`
export const CommunityBaseInfo = styled.div`
  ${css.row('justify-between', 'align-start')};
  width: 100%;

  ${css.media.mobile`
    padding-right: 0;
  `};
`
