import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import css, { theme } from '@/css'

import { AVATAR_LAYOUT } from '@/constant/layout'

import Img from '@/Img'

export const Wrapper = styled.div`
  height: 300px;
  width: 230px;
  min-width: 200px;
  padding-bottom: 30px;
  margin-top: 5px;
  margin-right: -18px;
`
export const InnerWrapper = styled.div`
  width: 100%:
  height: auto;
  padding-left: 60px;

  border-left: 1px solid transparent;
  border-image: linear-gradient(
    0.5turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const Label = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 12px;
  font-weight: 600;
`
export const Count = styled.span`
  color: ${theme('article.digest')};
  font-weight: 400;
  font-size: 12px;
  margin-left: 3px;
  opacity: 0.8;
`
export const Value = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 5px;
`

export const UserList = styled.div`
  ${css.columnWrap()};
  gap: 10px 0;
`

export const User = styled.div`
  ${css.row('align-center')};
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(18)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const Nickname = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-left: 8px;
`
