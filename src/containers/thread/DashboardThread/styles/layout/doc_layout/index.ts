import type { TActive } from '@/spec'

import styled, { css } from '@/css'

import { Divider } from '@/widgets/Common'
import { BaseSection, BlockBase } from '..'

export { Bar, Circle } from '..'

export const Wrapper = styled(BaseSection)``
export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 20px 30px;
  width: 100%;
`
export const Main = styled.div`
  ${css.row()};
  width: 100%;
`
export const FAQWrapper = styled.div`
  width: 20%;
  margin-left: 20px;
`
export const ExampleBtn = styled.div`
  display: inline-block;
`
export const Layout = styled.div`
  ${css.column('align-both')};
  margin-bottom: 30px;
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
  width: 280px;
  height: 200px;
  padding: 12px 25px;
`
export const DividerLine = styled(Divider)`
  opacity: 0.8;
`
export const FileTreeSettings = styled.div`
  ${css.row('align-center')};
`
