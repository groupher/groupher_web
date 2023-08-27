import styled from 'styled-components'
import * as NextLink from 'next/link'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/css'

// @ts-ignore
export const Link = styled(NextLink)`
  color: ${theme('link')};
  text-decoration: none;

  &:hover {
    color: ${theme('link')};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Row = styled.div`
  ${css.flex('align-center')};
`
export const Br = styled.div<TSpace>`
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const Space = styled.span<TSpace>`
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
export const SpaceGrow = styled.div`
  flex-grow: 1;
`
type TDivider = { width?: string } & TSpace
export const Divider = styled.div<TDivider>`
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
  width: ${({ width }) => width || '100%'};
  margin-top: ${({ top }) => `${top === undefined ? 20 : top}px`};
  margin-bottom: ${({ bottom }) => `${bottom === undefined ? 20 : bottom}px`};
`
export const SexyDivider = styled.div<TSpace>`
  height: 1px;
  width: 100%;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;

  margin-top: ${({ top }) => `${top === undefined ? 20 : top}px`};
  margin-bottom: ${({ bottom }) => `${bottom === undefined ? 20 : bottom}px`};
`

type TLineDivider = TSpace & { height?: number }
export const LineDivider = styled.div<TLineDivider>`
  background-color: ${theme('divider')};
  width: 1px;
  height: ${({ height }) => `${height || 12}px`};

  margin-left: ${({ left }) => `${left || 15}px`};
  margin-right: ${({ right }) => `${right || 15}px`};
`
// see https://stackoverflow.com/questions/27900053/css-transition-with-visibility-not-working
export const FadeToggle = styled.div<TActive>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: visibility 0.3s linear, opacity 0.3s linear;
`

export const Inline = styled.div<TSpace>`
  display: inline-block;
  margin-left: ${({ left }) => `${left || 0}px`};
  margin-right: ${({ right }) => `${right || 0}px`};
`

type TBar = { width?: number; opacity?: number; height?: number } & TSpace

export const Bar = styled.div<TBar>`
  width: ${({ width }) => `${width}px` || '20px'};
  height: ${({ height }) => `${height}px` || '5px'};
  border-radius: 5px;
  opacity: ${({ opacity }) => opacity || 1};

  ${(props) => css.spaceMargins(props)};
`

type TDesktopOnly = { flex?: boolean; width?: string }
export const DesktopOnly = styled.div<TDesktopOnly>`
  display: ${({ flex }) => (flex ? 'flex' : 'block')};
  width: ${({ width }) => width || '100%'};
  ${css.media.mobile`
    display: none;
  `};
`

export const MobileOnly = styled.div`
  display: none;
  width: auto;
  ${css.media.mobile`
    display: block;
  `};
`

/**
 * used for markdown render component
 */
export const MarkdownStyles = styled.div`
  ul {
    margin-left: 2px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme('article.title')};
  }
  li {
    list-style: disc inside;
  }
`
