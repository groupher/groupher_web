import styled from 'styled-components'

import type { TActive, TColor } from '@/spec'
import css, { theme, rainbow, rainbowLight } from '@/css'

import HashTagSVG from '@/icons/HashTag'

import { BaseSection, BlockBase } from '.'

export const Wrapper = styled(BaseSection)``

export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 20px 30px;
  width: 100%;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
  gap: 0 8px;
`
export const BgWrapper = styled.div<TColor>`
  ${css.size(22)};
  ${css.row('align-both')};
  border-radius: 4px;
  background: ${({ $color }) => rainbowLight($color)};
`
export const HashTagIcon = styled(HashTagSVG)<TColor>`
  ${css.size(18)};
  fill: ${({ $color }) => rainbow($color)};
`
export const Dot = styled.div<TColor>`
  ${css.circle(14)};
  background: ${({ $color }) => rainbow($color)};
`
export const Bar = styled.div`
  width: 60px;
  height: 10px;
  border-radius: 5px;
  background: ${theme('hint')};
  opacity: 0.4;
`
export const Layout = styled.div`
  ${css.column('align-both')};
`
export const Block = styled(BlockBase)`
  ${css.row('align-center', 'justify-center')};
  width: 270px;
  height: 100px;
  padding: 0 20px;
  gap: 0 20px;
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
