import styled from 'styled-components'

import type { TColorName, TMetric } from '@/spec'
import { COLORS } from '@/constant'
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

export const GrowBackground = styled.div`
  background: radial-gradient(circle at 30% -20%, #bf3a2c29 0, #2cbf6f00 30%),
    radial-gradient(circle at 100% 0, #ffeba824 0, #ffeba800 40%),
    radial-gradient(circle at 68% 3%, #4e4bd212 0, #4e4bd200 40%),
    radial-gradient(circle at 84% 20%, #961fb31a 0, #e000 30%);

  /* background: radial-gradient(circle at 30% -20%, #bf3a2c21 0, #2cbf6f00 30%),
    radial-gradient(circle at 100% 0, #ffeba824 0, #ffeba800 40%),
    radial-gradient(circle at 68% 3%, #4e4bd212 0, #4e4bd200 40%),
    radial-gradient(circle at 84% 6%, #ee00000d 0, #e000 40%); */
  filter: saturate(1);
  inset: 0;
  position: fixed;
  z-index: -1;
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
