import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import AllSVG from '@/icons/menu/Dots'
import TimeSVG from '@/icons/TimelineMode'
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import ViewSVG from '@/icons/View'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 120px;
  padding-right: 0;
`
export const Block = styled.div<TActive>`
  ${css.flex('align-center')};
  padding: 8px 5px;
  width: 100%;
  border-radius: 8px;

  background-color: ${({ active }) => (active ? theme('textBadge') : 'transparent')}; // to-theme
  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};

  &:hover {
    cursor: pointer;
    background-color: ${({ active }) =>
      active ? theme('textBadge') : theme('hoverBg')}; // to-theme
    color: ${theme('article.title')};
  }
`
export const Title = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${theme('article.title')};

  ${Block}:hover & {
    font-weight: 600;
  }
`

const iconBase = `
  ${css.size(12)};
  margin-right: 12px;
  opacity: 0.8;
  z-index: 10;
`

export const AllIcon = styled(AllSVG)`
  ${iconBase};
  ${css.size(18)};
  fill: ${theme('article.digest')};
  margin-left: -2px;
`
export const TimeIcon = styled(TimeSVG)`
  ${iconBase};
  ${css.size(12)};
  margin-left: 2px;
  fill: ${theme('article.digest')};
`

export const UpvoteIcon = styled(UpvoteSVG)`
  ${iconBase};
  ${css.size(13)};
  fill: ${theme('article.digest')};
  transform: scaleY(0.8);
  margin-left: 1px;
`

export const CommentIcon = styled(CommentSVG)`
  ${iconBase};
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-left: 1px;
`

export const ViewIcon = styled(ViewSVG)`
  ${iconBase};
  ${css.size(13)};
  fill: ${theme('article.digest')};
  margin-left: 0px;
`

export const Icon = {
  ALL: AllIcon,
  TIME: TimeIcon,
  UPVOTE: UpvoteIcon,
  COMMENT: CommentIcon,
  VIEW: ViewIcon,
}
