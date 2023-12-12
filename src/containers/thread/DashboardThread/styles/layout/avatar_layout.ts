import type { TActive } from '@/spec'
import styled, { css, theme, rainbow, rainbowLight } from '@/css'

import { LineDivider } from '@/widgets/Common'

import { BaseSection, BlockBase } from '.'

export const Wrapper = styled(BaseSection)``

export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 20px 30px;
  width: 100%;
`

type TAvatar = { left?: string; circle?: boolean }
export const Avatar = styled.div<TAvatar>`
  ${css.size(30)};
  ${css.row('align-both')};
  font-size: 13px;
  font-weight: bold;
  border-radius: ${({ circle }) => (circle ? '100px' : '6px')};
  color: ${({ color }) => rainbow(color)};
  background-color: ${({ color }) => rainbowLight(color)};
  margin-left: ${({ left }) => left};
  margin-left: 5px;
  border: 1px solid;
  border-color: ${({ color }) => rainbow(color)};
`
export const AvatarList = styled.div`
  ${css.row('align-center')};
`
export const Layout = styled.div`
  ${css.column('align-both')};
`
export const Divider = styled(LineDivider)`
  background: ${theme('article.digest')};
  height: 16px;
  opacity: 0.6;
`
export const Block = styled(BlockBase)`
  ${css.row('align-center', 'justify-between')};
  width: 270px;
  height: 100px;
  padding: 0 20px;
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
