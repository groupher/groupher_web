import { Bar as BarBase } from '~/widgets/Common'

import UpvoteSVG from '~/icons/Upvote'
import CommentSVG from '~/icons/Comment'

import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-end')};
  position: relative;
  margin-left: 36px;
`
export const ListsWrapper = styled.div`
  background: ${theme('htmlBg')};
  height: 380px;
  padding: 25px;
  z-index: 2;
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 5px;
  margin-bottom: 20px;
`
export const DetailWrapper = styled.div`
  background: ${theme('htmlBg')};
  flex-grow: 1;
  height: 100%;
  padding: 30px;
  padding-top: 18px;
  z-index: 2;

  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;

  width: 340px;
  height: 450px;
  margin-left: -20px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 10px;
  transform: scale(0.8);
  margin-left: -30px;
`
export const Tag = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 16px;
`
export const Status = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  margin-bottom: 22px;
`
export const UpvoteWrapper = styled.div`
  ${css.row('align-center')};
  border: 1px solid;
  color: ${theme('article.title')};
  border-color: ${theme('button.upvoteBorder')};
  padding: 2px 6px;
  border-radius: 5px;
  margin-top: 2px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const UpvoteCount = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: 500;
  margin-left: 3px;
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(10)};
  fill: ${theme('hint')};
  opacity: 0.6;
`
export const Count = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  font-weight: 400;
  margin-left: 3px;
  opacity: 0.8;
`
export const Bar = styled(BarBase)`
  background: ${theme('article.title')};
`
export const CommentsHeader = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 12px;
  margin-top: 24px;
  margin-bottom: 15px;
  opacity: 0.8;
`
