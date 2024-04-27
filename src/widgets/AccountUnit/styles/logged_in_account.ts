import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import styled, { css, theme } from '@/css'

import Img from '@/Img'

export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(17)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '3px' : '100%')};
`
export const Holder = styled.div`
  
`
