import styled, { css, rainbowLight, theme } from '@/css'

import type { TColor, TSpace } from '@/spec'
import { WithPosition } from '@/widgets/Common'

import Img from '@/widgets/Img'
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'

export const Wrapper = styled(WithPosition)`
  width: 86px;
  height: 150px;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 6px;
  padding: 5px;

  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  z-index: 2;
  transition: all 0.2s;
`

type TAvatar = { size?: number; hovering: boolean } & TColor & TSpace
export const Avatar = styled(Img)<TAvatar>`
  ${({ size }) => `${css.circle(size)}`};
  border: 2px solid;
  border-color: ${({ $color }) => rainbowLight($color)};
  visibility: ${({ hovering }) => (hovering ? 'visiable' : 'hidden')};

  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  position: absolute;

  ${({ top }) => (top !== undefined ? `top: ${top}px;` : '')}
  ${({ left }) => (left !== undefined ? `left: ${left}px;` : '')}
  ${({ bottom }) => (bottom !== undefined ? `bottom: ${bottom}px;` : '')}
  ${({ right }) => (right !== undefined ? `right: ${right}px;` : '')}
`
export const Action = styled(WithPosition)`
  ${css.circle(18)};
  ${css.row('align-both')};
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('hint')};
  box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
  opacity: 1;
  z-index: 10;
`
export const CommonIcon = styled(CommentSVG)`
  ${css.size(9)};
  margin-left: 1px;
  margin-top: 1px;
  fill: ${theme('article.digest')};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(14)};
  margin-top: -1px;
  fill: ${theme('article.digest')};
`
