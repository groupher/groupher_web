import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import EmojiSVG from '@/icons/EmojiGood'
import DeleteSVG from '@/icons/Trash'
import ShareSVG from '@/icons/Share'

import css from '@/css'

export const Wrapper = styled.div<{ $hovering: boolean }>`
  ${css.column()};
  padding: 8px 5px;
  padding-bottom: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: absolute;
  left: 0;
  bottom: ${({ $hovering }) => ($hovering ? 0 : '-90px')};
  width: 100%;
  height: 90px;
  z-index: 10;
  background: #403f3f;

  box-shadow: rgb(104 106 108 / 20%) 1px -7px 14px 2px;

  transition: all 0.2s;
`
export const TopActions = styled.div`
  ${css.row('align-center')};
  gap: 0 5px;
`
export const ActionBlock = styled.div`
  ${css.size(28)};
  ${css.row('align-both')};
  height: 25px;
  font-size: 10px;
  border-radius: 4px;
  color: white;
  background: #494949;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(14)};
  fill: #c7c7c7;
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(11)};
  fill: #c7c7c7;
`

export const EmojiIcon = styled(EmojiSVG)`
  ${css.size(11)};
  fill: #c7c7c7;
`
export const BottomActions = styled.div`
  flex-grow: 1;
  margin-top: 5px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 98%;
  background: #494949;
  padding: 5px;
`

export const ActionItem = styled.div`
  ${css.row('align-center')};
  margin-bottom: 5px;
  margin-left: 2px;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(9)};
  margin-left: 1px;
  fill: #c7c7c7;
`
export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(10)};
  fill: #c7c7c7;
`
export const Title = styled.div`
  font-size: 10px;
  color: #eaeaea;
  margin-left: 5px;
`
