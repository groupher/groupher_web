import type { TMetric } from '@/spec'
import styled, { css, WIDTH, theme } from '@/css'

import { BaseBanner } from '..'

const getMinHeight = (isMobile) => {
  if (isMobile) {
    return '140px'
  }

  return '412px'
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
  margin-left: 20px;

  border-bottom: 1px solid transparent;
  border-bottom-color: ${theme('divider')};
`
export const CommunityBaseInfo = styled.div`
  ${css.row('justify-between', 'align-start')};
  width: 100%;

  ${css.media.mobile`
    padding-right: 0;
  `};
`
