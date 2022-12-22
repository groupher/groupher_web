import styled from 'styled-components'

import type { TColorName, TMetric } from '@/spec'
import { COLORS, COLOR_NAME } from '@/constant'
// import { METRIC } from '@/constant'
// import { ASSETS_ENDPOINT } from '@/config'
import css, { theme } from '@/utils/css'

/**
 * see layout details:
 " @link https://css-tricks.com/the-fixed-background-attachment-hack/
 */
export const Skeleton = styled.div`
  height: 100vh;
  width: 100vw;
`

// background: #3b5456;
export const Wrapper = styled.div`
  ${css.flex('justify-center')};
`

export const ScrollWrapper = styled.div`
  position: absolute;
  width: 100%;
`

type TInner = { metric: TMetric; hasTopbar: boolean; topbarBg: TColorName; hasShadow: boolean }
export const InnerWrapper = styled.div<TInner>`
  ${css.flexColumn()};
  ${({ metric }) => css.fitPageWidth(metric)};
  width: 100%;
  position: relative;
  height: 100%;
  min-height: 100vh;
  background: ${theme('bodyBg')};
  transition: all 0.2s;
  z-index: 1;
  border-top: ${({ hasTopbar }) => (hasTopbar ? '3px solid;' : '1px solid;')};
  border-top-color: ${({ hasTopbar, topbarBg }) =>
    hasTopbar ? COLORS[topbarBg] : theme('divider')};

  box-shadow: ${({ hasShadow }) =>
    hasShadow ? 'rgb(100 100 111 / 20%) 0px 7px 29px 0px;' : 'none'};

  ${css.media.tablet`
    position: relative;
    padding-left: 0;
  `};
`
type TBody = { isMobile: boolean }
export const BodyWrapper = styled.div<TBody>`
  ${css.flexColumn('align-both')};

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
