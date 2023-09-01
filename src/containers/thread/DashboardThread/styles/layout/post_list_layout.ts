import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme } from '@/css'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'

import { BaseSection, BlockBase } from '.'

export { Bar, Circle } from '.'

export const Wrapper = styled(BaseSection)``
export const SelectWrapper = styled.div`
  ${css.row('align-center')};
  flex-wrap: wrap;
  gap: 20px 30px;
  width: 100%;
`
export const Box = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background: ${theme('article.digest')};
  margin-bottom: 8px;
`

export const Cover = styled.div`
  width: 90px;
  height: 62px;
  border-radius: 5px;
  background: ${theme('article.digest')};
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
  width: 300px;
  height: 94px;
  padding: 16px 15px;
`

export const UpvoteIcon = styled(UpvoteSVG)<{ size: number }>`
  ${({ size }) => css.size(size)};
  fill: ${theme('article.title')};
  transform: scaleY(0.8);
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(10)};
  fill: ${theme('article.title')};
`
