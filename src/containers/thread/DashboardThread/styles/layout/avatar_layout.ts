import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import { LineDivider } from '@/widgets/Common'

import { BaseSection, BlockBase } from '.'

export const Wrapper = styled(BaseSection)``

export const SelectWrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 20px 30px;
  width: 100%;
`

type TAvatar = { left?: string; circle?: boolean }
export const Avatar = styled.div<TAvatar>`
  ${css.size(25)};
  border-radius: ${({ circle }) => (circle ? '100px' : '6px')};
  background: ${theme('article.digest')};
  margin-left: ${({ left }) => left};
  border: 2px solid;
  border-color: ${theme('alphaBg')};
`
export const AvatarList = styled.div`
  ${css.flex('align-center')};
`
export const Layout = styled.div`
  ${css.flexColumn('align-both')};
`
export const Divider = styled(LineDivider)`
  background: ${theme('article.digest')};
  height: 16px;
  opacity: 0.6;
`
export const Block = styled(BlockBase)`
  ${css.flex('align-center', 'justify-between')};
  width: 200px;
  height: 80px;
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
