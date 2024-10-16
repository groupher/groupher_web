import styled, { css, theme, zIndex } from '~/css'
import type { TActive } from '~/spec'
import { pixelAdd } from '~/dom'

import type { TDrawer, TSwipe } from '../spec'
import { NARROW_HEIGHT_OFFSET } from '../constant'
import {
  getTransform,
  getMobileContentHeight,
  getContentLinearGradient,
  getDim,
  isWideMode,
  getDrawerWidth,
  getDrawerMinWidth,
} from './metrics'

export const DrawerOverlay = styled.div<TActive>`
  bottom: 0;
  left: 0;
  overflow: auto;
  position: fixed;
  height: 100%;
  right: 0;
  top: 0;
  z-index: ${zIndex.drawerOverlay};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  background: ${({ $visible }) => ($visible ? theme('drawer.mask') : 'none')};
  opacity: ${({ $visible }) => ($visible ? 0.5 : 0)};

  transition: visibility 0.1s ease-in, opacity 0.1s ease-in, background 0.1s ease-in;
`
// see https://stackoverflow.com/questions/60079950/when-do-i-use-attrs-vs-passing-props-directly-with-styled-components

// TL;DR:
// - Use styled components for static styles and dynamic styles that don't change very often;
// - Use inline styles (through .attrs) for styles that change frequently, like for animations.
export const DrawerWrapper = styled.div.attrs<TDrawer>(
  ({
    $testid,
    $visible,
    $mobile,
    swipeUpY = 0,
    swipeDownY = 0,
    $fromContentEdge,
    options,
  }: TDrawer) => ({
    'data-test-id': $testid,
    style: {
      transform: getTransform($visible, $mobile, swipeUpY, swipeDownY, $fromContentEdge, options),
    },
  }),
)<TDrawer>`
  ${css.row()};
  position: fixed;
  right: ${({ $rightOffset, type }) =>
    isWideMode(type) ? $rightOffset : pixelAdd($rightOffset, 30)};
  top: ${({ type }) => (isWideMode(type) ? 0 : '25px')};

  box-sizing: border-box;
  font-family: Roboto, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  height: 100%;
  width: ${({ type }) => getDrawerWidth(type)};
  min-width: ${({ type }) => getDrawerMinWidth(type)};
  z-index: ${({ $visible }) => ($visible ? zIndex.drawer : -1)};

  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  opacity: ${({ $visible, $fromContentEdge }) => (!$visible && !$fromContentEdge ? 0 : 1)};

  max-width: 985px;

  ${({ $fromContentEdge }) =>
    $fromContentEdge
      ? 'transition: transform 850ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;'
      : 'transition-property: transform, max-width, opacity;transition-duration: 0.4s, 0.3s, 0.3s;transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1) 0ms, ease-out,ease-in'};

  border: 1px solid;
  border-color: ${theme('divider')};
  will-change: transform, max-width, opacity;
  // 在宽屏时滑出来时，是从内容页而不是实际的 window 页滑出, 加 delay 可以在视觉上抵消从外部滑入的跳动感
  transition-delay: 0s, 0s, 0.14s;

  ${css.media.mobile`
    right: 0;
    width: 100%;
    min-width: 100%;
    overflow: scroll;
    height: auto;
  `};
`

export const DrawerContent = styled.div<{ type: string }>`
  position: relative;
  width: 100%;
  background-color: ${theme('drawer.bg')};
  height: ${({ type }) =>
    isWideMode(type) ? '100vh' : `calc(100vh - ${NARROW_HEIGHT_OFFSET * 2}px)`};
  border-radius: ${({ type }) => (isWideMode(type) ? 0 : '10px')};
  box-shadow: ${({ type }) =>
    isWideMode(type) ? theme('drawer.shadow') : theme('drawer.shadowLite')};
  border: 1px solid;
  border-color: ${theme('drawer.border')};
  border-top-left-radius: 10px;
`
export const NaviArea = styled.div`
  position: absolute;
  left: 0;
  top: 5%;
  height: 85%;
  width: 50px;
  z-index: 2;
`
type TDrawerMobile = { options: Record<string, unknown>; bgColor: string }
export const DrawerMobileContent = styled.div<TDrawerMobile>`
  width: 100%;
  height: ${({ options }) => getMobileContentHeight(options)};
  background: ${({ options, bgColor }) => getContentLinearGradient(options, bgColor)};
`

export const MobileInnerContent = styled.div.attrs<TSwipe>(({ swipeUpY, swipeDownY, options }) => ({
  style: {
    filter: getDim(swipeUpY, swipeDownY, options),
  },
}))<TSwipe>`
  width: 100%;
  max-height: calc(100% - 30px);
  margin-top: ${({ options }) => (options.direction === 'bottom' ? '15px' : '0')};
  overflow-y: scroll;
  transition: filter 0.3s;
  box-shadow: ${theme('drawer.shadow')};
`
export const PreviewHeader = styled.div`
  ${css.row()};
  border-bottom: 1px solid grey;
  line-height: 30px;
`

export const LavaLoadingWrapper = styled.div`
  margin-left: 45%;
  margin-top: 160px;
`
