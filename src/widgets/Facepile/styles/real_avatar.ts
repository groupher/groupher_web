import styled from 'styled-components'

import type { TAvatarLayout, TColorName } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'

import Img from '@/Img'
import ImgFallback from '@/widgets/ImgFallback'

import type { TAvatarSize } from '../spec'
import { getLiSize, getAvatarSize } from './metric'

// height: 49px;
type TWrapper = { size: TAvatarSize }
export const Wrapper = styled.li<TWrapper>`
  margin: 0px 0px 0px 0px;
  padding: 0px 0px 0px 0px;
  position: relative;
  width: ${({ size }) => getLiSize(size)};

  &:hover {
    z-index: 3;
  }
`
export const InnerWrapper = styled.div`
  &:hover {
    filter: grayscale(0);
    transform: scale(1.2);
  }

  transition: all 0.2s;
`

type TAvatarsImg = {
  size: string
  onClick: () => void
  scrollPosition: any
  avatarLayout: TAvatarLayout
}
export const AvatarsImg = styled(Img)<TAvatarsImg>`
  border: 2px solid;
  border-color: ${theme('thread.commentsUserBorder')};
  color: #ffffff;
  font-size: 12px;
  font-weight: 100;

  ${({ size }) => css.size(getAvatarSize(size))};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};

  text-align: center;
`
type TAvatarsMore = { size: TAvatarSize; total: number }
export const AvatarsMore = styled.span<TAvatarsMore>`
  ${css.flex('align-both')};
  font-size: 14px;
  border-color: #113744;
  color: ${theme('article.title')};
  background-color: #113744;
  border-radius: 100px 100px 100px 100px;
  font-family: sans-serif;
  font-weight: ${({ total }) => (total >= 1000 ? 600 : 200)};

  min-width: ${({ size }) => getAvatarSize(size)};
  height: ${({ size }) => getAvatarSize(size)};

  padding-left: ${({ total }) => (total >= 1000 ? '5px' : '0')};
  padding-top: 1px;

  &:hover {
    cursor: pointer;
  }
`
export const AvatarFallback = styled(ImgFallback)`
  border: 1px solid;
  border-color: ${theme('alphaBg2')};
`
