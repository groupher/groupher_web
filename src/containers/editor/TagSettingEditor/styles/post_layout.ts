import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme } from '@/utils/css'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 0 45px;
  width: 100%;
  padding-left: 35px;
  background: ${theme('hoverBg')};
  padding-top: 10px;
  padding-bottom: 30px;
`
export const BlockBase = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 0.7 : 0.2)};
  box-shadow: ${({ $active }) => ($active ? 'rgb(0 0 0 / 7%) 0px 0px 24px' : '')};

  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  border: 1px solid;
  border-radius: 7px;
  border-color: ${theme('article.title')};
  padding: 16px 15px;

  &:hover {
    opacity: ${({ $active }) => ($active ? 0.65 : 0.3)};
    cursor: pointer;
  }

  transform: scale(0.6);
  transition: all 0.2s;
`

type TBar = { long: number; thin?: boolean; bold?: boolean }
export const Bar = styled.div<TBar>`
  width: ${({ long }) => `${long || 10}%`};
  height: ${({ thin }) => (thin ? '4px' : '10px;')};
  background: ${({ thin, bold }) => {
    if (bold) return theme('article.title')

    return thin ? theme('article.digest') : theme('article.title')
  }};
  z-index: 3;
  border-radius: 5px;
  opacity: ${({ thin, bold }) => {
    if (bold) return 0.8

    return thin ? 0.6 : 1
  }};
`

export const Circle = styled.div<{ radius?: number }>`
  ${({ radius }) => `${css.circle(radius || 22)}`};
  background: ${theme('article.title')};
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
  ${css.flexColumn()};
  ${({ center }) => (center ? 'align-items: center;' : '')};
  ${({ grow }) => (grow ? 'flex-grow: 1;' : '')};
`
export const Layout = styled.div`
  ${css.flexColumn('align-both')};
  width: 150px;
  height: 100px;
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};
  margin-top: -20px;

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
