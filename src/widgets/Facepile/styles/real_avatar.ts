import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import styled, { css, theme } from '@/css'

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
  $avatarLayout: TAvatarLayout
}
export const AvatarsImg = styled(Img)<TAvatarsImg>`
  border: 1px solid;
  border-color: ${theme('divider')};
  font-size: 12px;

  ${({ size }) => css.size(getAvatarSize(size))};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '5px' : '100%'};

  text-align: center;
`
type TAvatarsMore = { size: TAvatarSize; total: number }
export const AvatarsMore = styled.span<TAvatarsMore>`
  ${css.row('align-both')};
  font-size: 14px;
  border-color: ${theme('divider')};
  color: ${theme('article.title')};
  background-color: ${theme('divider')};
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
