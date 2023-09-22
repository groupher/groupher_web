import styled from 'styled-components'

import type { TBannerLayout, TMetric, TTestable } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'

export const BaseWrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  min-height: 70vh;
  width: 100%;

  ${css.media.tablet`
    width: 100%;
    margin: 0;
    padding: .6em;
    padding-top: 0;
    padding-right: 0;
  `};
`
export const BaseInnerWrapper = styled.div<{ metric?: TMetric }>`
  ${({ metric }) => css.fitContentWidth(metric)};

  color: ${theme('font')};
  width: 100%;
  margin-top: 15px;
  padding-top: 0;

  ${css.media.mobile`
    margin: 0;
    padding: 0;
  `};
`
export const BaseContentWrapper = styled.div`
  ${css.column()};
  width: 100%;
`
export const Wrapper = styled(BaseWrapper)<{ metric?: TMetric }>`
  ${css.column('justify-start', 'align-center')};

  ${css.media.mobile`
    padding-left: 0;
  `};
`
export const SidebarWrapper = styled(BaseWrapper)<{ metric: TMetric }>`
  ${css.row('justify-between')};
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const MobileCardsWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  display: none;

  ${css.media.mobile`
    ${css.column()};
  `};
`
export const InnerWrapper = styled(BaseInnerWrapper)<{ bannerLayout?: TBannerLayout }>`
  ${({ bannerLayout }) => (bannerLayout === BANNER_LAYOUT.SIDEBAR ? 'width: 100%;' : '')};

  ${css.media.mobile`
    display: none;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
  `};
`
export const ContentWrapper = styled(BaseContentWrapper)``
