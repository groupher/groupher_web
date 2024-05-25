import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/const/layout'

import styled, { css, theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 20px;
  margin-left: 5px;
`
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(18)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const Name = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-left: 8px;
`
