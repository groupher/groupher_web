import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import AllSVG from '@/icons/menu/Dots'
import TimeSVG from '@/icons/TimelineMode'
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import ViewSVG from '@/icons/View'

export const Wrapper = styled.div`
  ${css.column()};
  width: 120px;
  padding-right: 0;
`
export const Block = styled.div<TActive>`
  ${css.row('align-center')};
  padding: 7px 5px;
  width: 100%;
  border-radius: 8px;

  background-color: ${({ active }) => (active ? theme('hoverBg') : 'transparent')}; // to-theme
  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};

  &:hover {
    cursor: pointer;
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
  }
`
export const IconWrapper = styled.div`
  ${css.circle(18)};
  ${css.row('align-both')};
  margin-right: 10px;
`
export const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${theme('article.digest')};

  ${Block}:hover & {
    font-weight: 600;
  }
`

const iconBase = `
  ${css.size(12)};
  opacity: 0.6;
  z-index: 10;
`

export const AllIcon = styled(AllSVG)`
  ${iconBase};
  ${css.size(18)};
  fill: ${theme('article.digest')};
`
export const TimeIcon = styled(TimeSVG)`
  ${iconBase};
  ${css.size(12)};
  fill: ${theme('article.digest')};
`

export const UpvoteIcon = styled(UpvoteSVG)`
  ${iconBase};
  ${css.size(13)};
  fill: ${theme('article.digest')};
  transform: scaleY(0.8);
`

export const CommentIcon = styled(CommentSVG)`
  ${iconBase};
  ${css.size(12)};
  fill: ${theme('article.digest')};
`

export const ViewIcon = styled(ViewSVG)`
  ${iconBase};
  ${css.size(12)};
  fill: ${theme('article.digest')};
`

export const Icon = {
  ALL: AllIcon,
  TIME: TimeIcon,
  UPVOTE: UpvoteIcon,
  COMMENT: CommentIcon,
  VIEW: ViewIcon,
}
