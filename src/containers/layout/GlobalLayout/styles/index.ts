import styled from 'styled-components'

import type { TColorName, TMetric, TGlowEffect } from '@/spec'
import { COLORS } from '@/constant/colors'
import GLOW_EFFECTS from '@/constant/glow_effect'

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

export const ScrollWrapper = styled.div<{ noMobilePadding: boolean }>`
  position: absolute;
  width: 100%;

  ${css.media.mobile`
    width: calc(100% - 16px);
    margin-left: 8px;
  `};

  ${({ noMobilePadding }) =>
    noMobilePadding ? 'width: 100% !important; margin-left: 0 !important;' : ''};
`

export const GrowBackground = styled.div<TGlowEffect>`
  background: ${({ glowType }) => `
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].LEFT.X} ${GLOW_EFFECTS[glowType].LEFT.Y}, ${GLOW_EFFECTS[glowType].LEFT.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].LEFT.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT1.X} ${GLOW_EFFECTS[glowType].RIGHT1.Y}, ${GLOW_EFFECTS[glowType].RIGHT1.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].MAIN.X} ${GLOW_EFFECTS[glowType].MAIN.Y}, ${GLOW_EFFECTS[glowType].MAIN.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].MAIN.RADIUS}),
    radial-gradient(circle at ${GLOW_EFFECTS[glowType].RIGHT2.X} ${GLOW_EFFECTS[glowType].RIGHT2.Y}, ${GLOW_EFFECTS[glowType].RIGHT2.COLOR} 0, transparent ${GLOW_EFFECTS[glowType].RIGHT1.RADIUS});
  `};

  filter: saturate(1.2);

  inset: 0;
  position: ${({ glowPosition }) => glowPosition};
  // width & height must be 100%, without it the wechat will not work
  height: ${({ glowPosition }) => (glowPosition === 'absolute' ? '600px' : '100%')};
  width: 100%;
  opacity: ${({ glowOpacity }) => `${parseFloat(glowOpacity)}` || 1};

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
    border-top: none;
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
