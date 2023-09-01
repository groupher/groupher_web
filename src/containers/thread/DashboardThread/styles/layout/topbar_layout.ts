import styled from 'styled-components'

import type { TActive, TColorName } from '@/spec'
import { COLORS } from '@/constant/colors'

import css, { theme } from '@/css'

import { Divider } from '@/widgets/Common'

import { BaseSection, BlockBase } from '.'

export { Bar, Circle } from '.'

export const Wrapper = styled(BaseSection)``
export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 30px;
  width: calc(100% + 50px);

  ${css.media.mobile`
    width: 100%;
  `}
`
type TTopBar = { center?: boolean; bg: TColorName }
export const TopBar = styled.div<TTopBar>`
  ${css.row('align-center')};
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  width: calc(100% + 2px);
  height: 5px;
  margin-top: -1px;
  margin-left: -1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  background: ${({ bg }) => COLORS[bg]};
  padding: 0 20px;
  padding-bottom: 2px;
`
export const Main = styled.div`
  ${css.row()};
  padding: 0 20px;
  margin-top: 25px;
`
export const ListsWrapper = styled.div`
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
  width: 85%;
`
export const TagssWrapper = styled.div`
  width: 15%;
  margin-left: 20px;
`
export const ExampleBtn = styled.div`
  display: inline-block;
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
  border: 1px solid;
  border-color: ${theme('article.digest')};
  width: 300px;
  height: 200px;
  padding: 0px;
`
export const DividerLine = styled(Divider)`
  opacity: 0.8;
`

export const BgWrapper = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
`
export const BgLabel = styled.div<{ bg: TColorName }>`
  width: 44px;
  height: 24px;
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 15px;
`
export const TheColor = styled.div<{ color: TColorName }>`
  width: 38px;
  height: 18px;
  border-radius: 6px;
  background-color: ${({ color }) => COLORS[color]};
`
