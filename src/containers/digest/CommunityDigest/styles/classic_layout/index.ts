import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { WIDTH, theme } from '@/utils/css'
import { pixelAdd } from '@/utils/dom'

import { BaseBanner } from '../index'

const getMinHeight = (isMobile) => {
  if (isMobile) {
    return '140px'
  }

  return '180px'
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
  ${css.flex('justify-center')};
  padding-top: 10px;
  min-height: ${({ isMobile }) => getMinHeight(isMobile)};
  width: 100%;
  // if use margin-left will cause horizontal scrollbar
  // 70 是经典布局为缩小帖子列表"视觉宽度"手动缩小的值
  padding-left: ${pixelAdd(WIDTH.COMMUNITY.CONTENT_OFFSET, 70)};
  ${({ metric }) => css.fitPageWidth(metric)};
  transition: min-height 0.25s;

  ${css.media.mobile`
     padding-left: 0;
  `};
`
export const BaseBannerContent = styled.div`
  ${css.flexColumn('align-center')};
  width: 100%;
  max-width: ${WIDTH.COMMUNITY.CONTENT};

  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};

  ${css.media.mobile`
    padding-left: 6%;
    padding-right: 5.5%;
  `};
`
export const BannerContentWrapper = styled(BaseBannerContent)`
  ${css.flexColumn('justify-between')};
`

export const TabBarWrapper = styled.div`
  ${css.flex('align-center')};
  width: 100%;
  margin-left: -16px;

  ${css.media.tablet`
    padding-left: calc(2%);
  `};

  ${css.media.mobile`
    padding-left: 0;
    margin-left: -10px;
  `};
`
export const CustomPart = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  padding-right: 45px;
  font-weight: 500;
  cursor: pointer;
  /* color: #f8604e; */
`
export const CommunityBaseInfo = styled.div`
  ${css.flex('justify-between', 'align-start')};
  width: 100%;
  margin-top: 10px;
  /* padding-top: 20px; */
  // 60 是经典布局为缩小帖子列表"视觉宽度"手动缩小的值
  padding-right: 60px;
  height: 130px;

  /* margin-left: -30px;
  width: 1000px;
  margin-top: 10px;
  padding-left: 30px;
  background-image: url('https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 18px;
  height: 180px; */

  ${css.media.mobile`
    padding-right: 0;
  `};
`
