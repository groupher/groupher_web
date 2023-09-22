import styled from 'styled-components'

import type { TAvatarLayout, TSpace } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import css, { theme } from '@/css'

import Img from '@/Img'
import AccountSVG from '@/icons/Acount'

export const Wrapper = styled.div<TSpace>`
  ${(props) => css.spaceMargins(props)};
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(17)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '5px' : '100%')};
`
export const UnloginIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
`
