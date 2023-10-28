import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'
import css, { theme } from '@/css'

import ExpandSVG from '@/icons/Expand'
import PinSVG from '@/icons/Pin'

import { CreateDate as HeaderCreateDate } from '../header'

export const Wrapper = styled.div`
  position: relative;
  ${css.row('align-center')};
  padding-top: 20px;
  position: relative;
  background: transparent;
  margin-left: -15px;
  cursor: pointer;
`

export const CurveLine = styled.div`
  position: absolute;
  left: -38px;
  top: -15px;
  ${css.size(45)};
  border-radius: 22px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('comment.indentLine')};
  transform: rotate(20deg);
  z-index: -1;

  &:after {
    content: '';
    ${css.circle(26)};
    background: ${theme('alphaBg2')};
    position: absolute;
    bottom: -5px;
    right: -1px;
  }
`
export const ExpandIcon = styled(ExpandSVG)`
  ${css.size(13)};
  fill: ${theme('article.info')};
  opacity: 0.8;
  margin-right: 14px;
`
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(16)};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '3px' : '100%'};
  opacity: ${theme('avatar.opacity')};
  margin-right: 10px;
`
export const CommentBody = styled.div`
  color: ${theme('article.digest')};
  ${css.lineClamp(1)};
  font-size: 14px;
  flex-grow: 1;
`
export const RepliesHint = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-right: 6px;
`
export const CreateDate = styled(HeaderCreateDate)`
  ${css.row('justify-end')};
  min-width: 40px;
  margin-right: 4px;
  word-break: keep-all;
`
export const PinState = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  ${css.row('align-center')};
  margin-left: 1px;
`
export const PinIcon = styled(PinSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  opacity: 0.9;
  transform: rotate(-30deg);
`
export const PinText = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 15px;
  opacity: 0.8;
`
export const BadgePopContent = styled.div`
  padding: 5px 10px;
  font-size: 12px;
`
export const AuthorUpvotedIcon = styled(Img)`
  ${css.size(14)};
  fill: ${theme('comment.icon')};
  opacity: 0.6;
  margin-top: 3px;
`
export const SolutionIcon = styled(Img)<{ isAuthorUpvoted: boolean }>`
  ${css.size(14)};
  fill: ${theme('rainbow.green')};
  margin-top: ${({ isAuthorUpvoted }) => (isAuthorUpvoted ? '7px' : '3px')};
  margin-left: 1px;
`
export const CommentBodyInfo = styled.div`
  ${css.column()};
  width: 100%;
`
export const CommentContent = styled.div`
  font-size: 14px;
  margin-left: 1px;
`
export const LikeIcon = styled(Img)`
  fill: ${theme('comment.icon')};
  margin-right: 3px;
  margin-top: 2px;
  ${css.size(20)};
`
export const ReplyIcon = styled(Img)`
  fill: ${theme('comment.icon')};
  margin-right: 5px;
  margin-top: 1px;
  ${css.size(18)};
`

export const ReplyAction = styled.div`
  ${css.row()};
  color: ${theme('comment.action')};
  margin-right: 12px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 2px;
  opacity: 0;

  ${CommentBodyInfo}:hover & {
    opacity: 1;
  }
  transition: opacity 0.3s;
`
