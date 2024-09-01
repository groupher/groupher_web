import type { TColor } from '~/spec'
import styled, { css, rainbow, theme, animate } from '~/css'

import Img from '~/Img'

import { WithPosition } from '~/widgets/Common'
import DiscussSVG from '~/icons/Comment'

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
type TSingleUser = TColor & { $width: number; $opacity?: number }
export const SingleWrapper = styled(WithPosition)<TSingleUser>`
  ${({ $width }) => css.circle($width)};
  ${css.row('align-both')};
  border: 3px solid;
  border-color: ${({ $color }) => rainbow($color)};
  opacity: ${({ $opacity }) => $opacity || 0.8};
`
export const SingleUser = styled(Img)<{ $width: number }>`
  padding: 1px;
  ${({ $width }) => css.circle($width)};
`
type TComemntUsers = { $rotate?: number; $width?: number }
export const CommentAnimate = styled(WithPosition)`
  animation: ${animate.jump} 4s linear infinite;
`
export const CommentUsers = styled.div<TComemntUsers>`
  ${css.row('align-both')};
  border: 1px solid;
  background: ${theme('htmlBg')};
  border-color: #d3d3d3;
  width: ${({ $width }) => `${$width || 100}px`};
  padding-left: 5px;
  height: 38px;
  border-radius: 20px;
  transform: ${({ $rotate }) => `rotate(${$rotate || 0}deg)`};
  opacity: 0.8;
`
export const DiscussIcon = styled(DiscussSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};
`

export const Emoji = styled(Img)`
  ${css.size(18)};
`
