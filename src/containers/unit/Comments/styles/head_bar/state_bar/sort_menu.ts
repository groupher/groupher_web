import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/ArrowSolid'

import ReplyModeSVG from '@/icons/CommentReplyMode'
import TimelineModeSVG from '@/icons/CommentTimelineMode'

import ExpandSVG from '@/icons/Expand'
import FoldSVG from '@/icons/Fold'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const Title = styled.div<TActive>`
  ${css.flex('align-center')};
  font-size: 13px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  margin-right: 15px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }
  transition: all 0.2s;
`
const baseIconStyles = `
  ${css.size(12)};
  margin-right: 10px;
`

export const ReplyModeIcon = styled(ReplyModeSVG)`
  ${baseIconStyles}
  fill: ${theme('article.digest')};
`
export const TimelineModeIcon = styled(TimelineModeSVG)`
  ${baseIconStyles}
  fill: ${theme('article.digest')};
`
export const ExpandIcon = styled(ExpandSVG)`
  ${baseIconStyles}
  fill: ${theme('article.digest')};
`
export const FoldIcon = styled(FoldSVG)`
  ${baseIconStyles}
  fill: ${theme('article.digest')};
`

export const ArrowIcon = styled(ArrowSVG)<TActive>`
  ${css.size(12)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  transform: rotate(90deg);
  opacity: 0.6;
  margin-top: 1px;
  margin-left: 3px;
`

export const Panel = styled.div<{ width?: string }>`
  ${css.flexColumn()};
  margin-top: 3px;
  margin-bottom: 3px;
  gap: 3px 0;
  padding: 6px 4px;
  padding-left: 8px;
  width: ${({ width }) => width};
`

export const MenuItem = styled.div`
  ${css.flex('align-center')};
  font-size: 14px;
  padding: 6px 8px;

  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    background: #e4e4e457;
    text-decoration: none;
    border-color: ${theme('popover.activeBorder')};
  }

  will-change: background;
`
export const MenuTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: 500;
  opacity: 0.8;

  ${MenuItem}:hover & {
    opacity: 1;
    cursor: pointer;
  }
`
