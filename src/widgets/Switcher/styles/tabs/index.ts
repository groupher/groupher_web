import styled from 'styled-components'

import type { TTestable, TPrimaryColor } from '@/spec'
import css, { primaryTheme } from '@/css'

type TSlipBar = {
  slipHeight: string
  width: string
  translateX: string
  noAnimation?: boolean
}

export const Wrapper = styled.nav.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  position: relative;
  overflow: hidden;
  width: auto;
  font-size: 14px;

  ${css.media.mobile`
    overflow: scroll;
  `};
`
export const Nav = styled.nav`
  position: relative;
  ${css.row('align-center')};
  flex-flow: nowrap;
  margin: 0 auto;
  padding: 0;
`

export const SlipBar = styled.span<TSlipBar>`
  position: absolute;
  ${css.row('justify-center')};
  width: ${({ width }) => width};
  bottom: 1px;
  left: 0;
  height: ${({ slipHeight }) => slipHeight};
  transform: ${({ translateX }) => `translate3d(${translateX}, 0, 0);`};

  transition: ${({ noAnimation }) => (noAnimation ? 'none' : 'transform 0.25s')};
`

type TRealBar = { width: string } & TPrimaryColor
export const RealBar = styled.span<TRealBar>`
  width: ${({ width }) => width};
  height: 2px;
  background: ${({ primaryColor }) => primaryTheme(primaryColor, 'article.digest')};
`
// transform: ${({ active }) =>
//     active ? 'translate3d(0,0,0);' : 'translate3d(0, 150%, 0);'};
