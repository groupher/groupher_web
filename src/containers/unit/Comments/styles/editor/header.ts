import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'
import styled, { css, theme } from '@/css'
import CommentSVG from '@/icons/Comment'
import UserSVG from '@/icons/User'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  height: 44px;

  cursor: pointer;
  -webkit-mask: linear-gradient(-60deg, #000 30%, #0005, #000 70%) right/300% 100%;

  background-repeat: no-repeat;
  animation: shimmer 3s infinite;
  /* max-width: 300px; */

  @keyframes shimmer {
    100% {
      -webkit-mask-position: left;
    }
  }
`
export const ExpandWrapper = styled.div`
  ${css.row('align-center')};
  height: 60px;
  margin-left: 0;
  position: relative;
`
export const HintText = styled.div`
  position: absolute;
  top: -25px;
  left: 3px;
  font-size: 12px;
  color: ${theme('hint')};
`
export const UnloginUser = styled(UserSVG)`
  ${css.size(12)};
  fill: ${theme('comment.placeholder')};
`
export const UserAvatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(20)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '4px' : '100%')};

  fill: ${theme('comment.placeholder')};
  margin-left: 4%;
  opacity: ${theme('avatar.opacity')};
`
export const LeaveResponseText = styled.div`
  font-size: 14px;
  margin-left: 15px;
  color: ${theme('comment.placeholder')};
`
export const LeaveResponseUsername = styled.div`
  color: ${theme('comment.username')};
  font-size: 16px;
  margin-left: 12px;
  margin-right: 10px;
`
export const PenIcon = styled(CommentSVG)`
  fill: ${theme('comment.placeholder')};
  ${css.size(14)};
  margin-right: 15px;
`
