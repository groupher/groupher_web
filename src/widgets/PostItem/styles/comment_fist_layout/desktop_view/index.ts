import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const AvatarWrapper = styled.div`
  ${css.column('align-center', 'justify-between')};
  padding-top: 10px;
  padding-bottom: 2px;
  margin-right: 8px;
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(26)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
