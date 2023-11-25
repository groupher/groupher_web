import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.row('align-start')};
  width: 350px;
`
export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(32)};
  margin-top: 8px;
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%'};
`
export const Main = styled.div`
  ${css.column()};
  margin-left: 12px;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 16px;
`
export const Login = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-left: 5px;
  &:before {
    content: '@';
    font-size: 11px;
  }
`
export const Bio = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
`
