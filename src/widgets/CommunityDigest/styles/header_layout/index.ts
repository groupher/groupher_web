import Link from 'next/link'

import type { THeaderLayout, TMetric } from '~/spec'
import styled, { css, theme } from '~/css'

import { BaseBanner } from '..'
import { HEADER_LAYOUT } from '~/const/layout'

export default () => {
  return {
    wrapper: 'container-community debug',
    //
  }
}

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
`
export const InnerWrapper = styled.div<TWrapper>`
  ${css.row('justify-center')};
  /* padding-top: 10px; */
  margin-bottom: 8px;
  width: 100%;
  // if use margin-left will cause horizontal scrollbar
  ${({ metric }) => css.fitContentWidth(metric)};
  transition: min-height 0.25s;
`
export const BaseBannerContent = styled.div`
  ${css.column('align-center')};
  width: 100%;
`
export const BannerContentWrapper = styled(BaseBannerContent)`
  ${css.column('justify-between')};
  align-items: 'center';
`
export const CommunityBaseInfo = styled.div`
  ${css.row('justify-between', 'align-center')};
  width: 100%;
  padding-top: 10px;
`
export const MobileNaviWrapper = styled.div`
  display: none;

  ${css.media.mobile`
    ${css.rowGrow()};
  `};
`

export const GithubItem = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
  gap: 0 8px;
  font-size: 14px;
  margin-right: 25px;
  color: ${theme('article.title')};
  opacity: 0.6;

  img {
    transform: scale(1.15);
  }

  &:hover {
    text-decoration: none;
    opacity: 0.85;
    cursor: pointer;
  }

  transition: all 0.2s;
`
