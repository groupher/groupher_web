import type { TActive } from '@/spec'

import styled, { css, theme } from '@/css'

import { WithPosition } from '@/widgets/Common'
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'

import { BlockBase } from '..'

export { Circle } from '..'

export const Wrapper = styled.div`
  background: ${theme('grey.rare')};
  padding: 20px;
  border-radius: 15px;
  width: 608px;
`
export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 20px 30px;
  width: 100%;
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
  width: 255px;
  height: 90px;
  padding: 16px 15px;
`
export const UpvoteIcon = styled(UpvoteSVG)<{ size: number }>`
  ${({ size }) => css.size(size)};
  fill: ${theme('article.digest')};
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(12)};
  margin-top: 2px;
  fill: ${theme('article.digest')};
`
export const Footer = styled(WithPosition)`
  ${css.row('align-center')};
`
