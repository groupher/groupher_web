import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'

import ViewSVG from '@/icons/View'
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('justify-between')};
  position: relative;
  padding: 30px;
  opacity: 0.8;
`
export const ListsWrapper = styled.div`
  width: 240px;
  height: 380px;
`
export const DetailWrapper = styled.div`
  flex-grow: 1;
  height: 360px;
  padding: 8px 20px;
  padding-left: 40px;
  margin-top: -10px;

  border-left: 1px solid transparent;
  border-image: linear-gradient(0.5turn, transparent, #eae3ef, #eae3ef, #eae3ef, transparent);

  border-image-slice: 1;
`
export const Status = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  margin-bottom: 22px;
`
export const UpvoteWrapper = styled.div`
  ${css.row('align-center')};
  border: 1px solid;
  color: ${theme('rainbow.purple')};
  font-size: 11px;
  font-weight: 500;
  border-color: #e5d7ea;
  padding: 0 10px;
  border-radius: 10px;
  margin-top: 2px;
`
export const ViewIcon = styled(ViewSVG)`
  ${css.size(10)};
  fill: ${theme('rainbow.purple')};
  opacity: 0.6;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(10)};
  fill: ${theme('rainbow.purple')};
  transform: scaleY(0.8);
  opacity: 0.8;
  margin-right: 3px;
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(10)};
  fill: ${theme('rainbow.purple')};
  opacity: 0.6;
`
export const Count = styled.div`
  color: ${theme('rainbow.purple')};
  font-size: 12px;
  font-weight: 400;
  margin-left: 3px;
  opacity: 0.8;
`
export const Bar = styled(BarBase)`
  background: ${theme('rainbow.purple')};
`
export const CommentsHeader = styled.div`
  ${css.row('align-center')};
  color: ${theme('rainbow.purple')};
  font-weight: 500;
  font-size: 12px;
  margin-top: 24px;
  margin-bottom: 15px;
  opacity: 0.8;
`
