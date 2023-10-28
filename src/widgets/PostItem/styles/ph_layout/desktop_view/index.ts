import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css from '@/css'
import Img from '@/Img'

import { DesktopHoverable } from '../..'

export const Wrapper = styled(DesktopHoverable)`
  padding: 12px 0;
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
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(26)};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%'};
`
export const UpvoteWrapper = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
`
