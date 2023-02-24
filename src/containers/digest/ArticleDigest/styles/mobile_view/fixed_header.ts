import styled from 'styled-components'

import type { TTestable, TMetric, TActive } from '@/spec'
import css, { theme, zIndex } from '@/utils/css'
import Img from '@/Img'

type TWrapper = TTestable & TActive
export const Wrapper = styled.nav.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('justify-center')};
  top: ${({ show }) => (show ? 0 : '-48px;')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  z-index: ${({ show }) => (show ? zIndex.articleFixedHeader : -1)};

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  transition-property: top, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  ${css.flex('align-both')};
  /* background: white; */
  background: radial-gradient(circle, rgb(255 255 255) 15%, rgb(255 255 255 / 0%) 56%),
    radial-gradient(circle, rgb(255 255 255 / 53%) 30%, transparent 68%);
  backdrop-filter: blur(8px);

  width: 100%;
  height: 46px;
  ${({ metric }) => css.fitPageWidth(metric)};
  border-radius: 5px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 0 10px;
  padding-left: 0;

  ${css.media.mobile`
    height: 36px;
    background: radial-gradient(circle,rgb(255 255 255) 15%,rgb(255 255 255 / 0%) 56%),radial-gradient(circle,rgb(255 255 255 / 70%) 80% 68%);
    backdrop-filter: blur(10px);
  `};
`
export const ContentWrapper = styled.div<{ metric: TMetric }>`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  height: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};

  ${css.media.mobile`
    margin-left: 30px;
  `};
`
export const Cover = styled(Img)`
  ${css.size(28)};
  margin-right: 15px;
`
export const Title = styled.div`
  ${css.cutRest('300px')};
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 17px;

  ${css.media.mobile`
    font-size: 14px;
    font-weight: 400;
    height: 24px;
    ${css.cutRest('210px')};
  `};
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  ${css.cutRest('300px')};
`
