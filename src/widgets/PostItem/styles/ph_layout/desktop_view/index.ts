import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;

  padding: 12px 0;

  &:hover {
    cursor: pointer;
  }

  &:hover::before {
    opacity: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: -16px;
    width: calc(100% + 32px);
    height: 100%;
    background: ${theme('hoverLinear')};
    border-radius: 10px;
    z-index: -1;
    opacity: 0;
  }
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
export const UpvoteWrapper = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
`
