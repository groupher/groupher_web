import type { TTestable, TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import styled, { css, theme } from '@/css'

import Img from '@/Img'
import AdminStarSVG from '@/icons/AdminStar'
import { WithMargin } from '@/widgets/Common'

type TWrapper = TTestable
export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  position: relative;
`
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(40)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
  margin-bottom: 20px;
  border: 1px solid;
  border-color: ${theme('hint')};
  padding: 2px;
`
export const BadgeWrapper = styled.div<{ $avatarLayout: TAvatarLayout }>`
  ${css.circle(14)};
  ${css.row('align-both')};
  background: ${theme('rainbow.blackRow')};
  padding: 1px;
  border: 1px solid;
  border-color: ${theme('hint')};
  position: absolute;

  right: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '-2px' : 0)};
  bottom: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '16px' : '18px')};
  z-index: 2;
`
export const BadgeIcon = styled(AdminStarSVG)`
  ${css.size(10)};
  fill: ${theme('article.title')};
`
