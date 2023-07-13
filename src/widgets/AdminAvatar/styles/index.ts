import styled from 'styled-components'

import type { TTestable, TSpace, TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/utils/css'

import Img from '@/Img'
import AdminStarSVG from '@/icons/AdminStar'

type TWrapper = TTestable & TSpace
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  position: relative;

  ${(props) => css.spaceMargins(props)};
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(40)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
  margin-bottom: 20px;
  border: 1px solid;
  border-color: ${theme('article.title')};
  padding: 2px;
`
export const BadgeWrapper = styled.div<{ avatarLayout: TAvatarLayout }>`
  ${css.circle(14)};
  ${css.flex('align-both')};
  background: ${theme('article.title')};
  padding: 1px;
  border: 2px solid white;
  position: absolute;

  right: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '-2px' : 0)};
  bottom: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '16px' : '18px')};
  z-index: 2;
`

export const BadgeIcon = styled(AdminStarSVG)`
  ${css.size(10)};
  fill: white;
`
