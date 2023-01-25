import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme } from '@/utils/css'

import { Divider } from '@/widgets/Common'
import { BaseSection, BlockBase } from '.'

export { Bar, Circle } from '.'

export const Wrapper = styled(BaseSection)``
export const SelectWrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 0 30px;
  width: 100%;
`
export const Main = styled.div`
  ${css.flex()};
  width: 100%;
`
export const ListsWrapper = styled.div<{ withDivider?: boolean }>`
  ${css.flex()};
  flex-wrap: wrap;
  border-right: ${({ withDivider }) => (withDivider ? '1px solid' : 'none')};
  border-right-color: ${theme('divider')};
  width: 100%;
`
export const Box = styled.div`
  width: 50%;
`
export const Box3 = styled.div`
  width: 33.3%;
`
export const FAQWrapper = styled.div`
  width: 20%;
  margin-left: 20px;
`
export const FAQFullWrapper = styled.div`
  width: 60%;
  margin-left: 26%;
`
export const ExampleBtn = styled.div`
  display: inline-block;
`
export const Layout = styled.div`
  ${css.flexColumn('align-both')};
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
  width: 290px;
  height: 200px;
  padding: 12px 25px;
`
export const DividerLine = styled(Divider)`
  opacity: 0.8;
`
