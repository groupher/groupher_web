import type { TColorName, TMetric } from '@/spec'
import styled, { css, rainbow, theme } from '@/css'

/**
 * see layout details:
 " @link https://css-tricks.com/the-fixed-background-attachment-hack/
 */
export const Skeleton = styled.div`
  height: 100vh;
  width: 100vw;
`
export const Wrapper = styled.div`
  ${css.row('justify-center')};
`
export const ScrollWrapper = styled.div<{ $noMobilePadding: boolean }>`
  position: absolute;
  width: 100%;

  ${css.media.mobile`
    width: calc(100% - 16px);
    margin-left: 8px;
  `};

  ${({ $noMobilePadding }) =>
    $noMobilePadding ? 'width: 100% !important; margin-left: 0 !important;' : ''};
`

type TInner = { metric: TMetric; $hasTopbar: boolean; $topbarBg: TColorName; $hasShadow: boolean }
export const InnerWrapper = styled.div<TInner>`
  ${css.column()};
  ${({ metric }) => css.fitPageWidth(metric)};
  width: 100%;
  position: relative;
  height: 100%;
  min-height: 100vh;
  background: ${theme('bodyBg')};
  transition: all 0.2s;
  z-index: 1;
  border-top: ${({ $hasTopbar }) => ($hasTopbar ? '3px solid;' : '1px solid;')};
  border-top-color: ${({ $hasTopbar, $topbarBg }) =>
    $hasTopbar ? rainbow($topbarBg) : theme('divider')};

  box-shadow: ${({ $hasShadow }) =>
    $hasShadow ? 'rgb(100 100 111 / 20%) 0px 7px 29px 0px;' : 'none'};

  ${css.media.tablet`
    position: relative;
    padding-left: 0;
    border-top: none;
  `};
`
export const BodyWrapper = styled.div`
  ${css.column('align-both')};

  width: 100%;
`
// 180 is the sidebar full width
export const ContentWrapper = styled.div`
  /* for global blur */
  transition: filter 0.25s;
`
export const ScrollHolder = styled.div`
  height: 100vh;
  width: 100%;
`
