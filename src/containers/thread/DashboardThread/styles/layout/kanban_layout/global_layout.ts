import type { TActive } from '~/spec'

import styled, { css } from '~/css'

import { BlockBase } from '..'

export { Circle } from '..'

export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 20px 30px;
  width: 100%;
  margin-bottom: 35px;
`
type TColumn = { center?: boolean; grow?: boolean }
export const Column = styled.div<TColumn>`
  ${css.column()};
  ${({ center }) => (center ? 'align-items: center;' : '')};
  ${({ grow }) => (grow ? 'flex-grow: 1;' : '')};
`
export const Layout = styled.div`
  ${css.column('align-both')};
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const Block = styled(BlockBase)`
  width: 286px;
  height: 180px;
  padding: 16px 15px;
`
