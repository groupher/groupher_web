import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'
import css from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  gap: 10px;
`
export const TabsWrapper = styled.div`
  position: absolute;
  top: -36px;
  left: -14px;
`

export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(20)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '5px' : '100%')};
`