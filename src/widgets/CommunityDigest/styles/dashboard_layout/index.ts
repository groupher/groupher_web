import type { THeaderLayout, TMetric } from '@/spec'
import styled, { css, theme } from '@/css'

import { BaseBanner } from '..'
import { HEADER_LAYOUT } from '@/const/layout'

type TWrapper = {
  metric?: TMetric
  $headerLayout?: THeaderLayout
}
export const Wrapper = styled(BaseBanner)<TWrapper>`
  width: 100%;
  min-height: ${({ $headerLayout }) => ($headerLayout === HEADER_LAYOUT.FLOAT ? '74px' : '64px')};
  background: transparent;
  ${({ metric }) => css.fitPageWidth(metric)};

  border-bottom: ${({ $headerLayout }) =>
    $headerLayout === HEADER_LAYOUT.FLOAT ? 'none' : '1px solid transparent'};
  border-image: linear-gradient(
    0.2turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  ${css.media.mobile`
    min-height: 48px;
  `};
`
export const InnerWrapper = styled.div<TWrapper>`
  ${css.row('justify-center')};
  /* padding-top: 10px; */
  margin-bottom: 8px;
  width: 100%;
  // if use margin-left will cause horizontal scrollbar
  ${({ metric }) => css.fitContentWidth(metric)};
  transition: min-height 0.25s;

  ${css.media.mobile`
     padding-left: 0;
  `};
`
export const BaseBannerContent = styled.div`
  ${css.column('align-center')};
  width: 100%;

  ${css.media.mobile`
    padding-left: 18px;
    padding-right: 20px;
  `};
`
export const BannerContentWrapper = styled(BaseBannerContent)`
  ${css.column('justify-between')};
  align-items: 'center';
`
export const BannerContainer = styled(BaseBanner)`
  /* min-height: 125px; */
`
export const CommunityBaseInfo = styled.div`
  ${css.row('justify-between', 'align-center')};
  width: 100%;
  padding-top: 10px;
`
