import styled from 'styled-components'

import type { TAvatarLayout, TSpace } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import css, { theme } from '@/css'

import Img from '@/Img'
import AccountSVG from '@/icons/Acount'

export const NormalWrapper = styled.div<TSpace>`
  ${css.row('align-center')};

  ${(props) => css.spaceMargins(props)};
`
export const WithBgWrapper = styled(NormalWrapper)`
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  padding: 5px 8px;
  width: auto;
  background: ${theme('alphaBg')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  &:hover {
    background: ${theme('alphaBg2')};
    cursor: pointer;
  }
`

export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(17)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '5px' : '100%')};
`
export const UnloginIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
`
export const NickName = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  ${css.cutRest('80px')};
  margin-left: 10px;
`
