import styled from 'styled-components'
import Link from 'next/link'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

// import type { TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 200px;
  min-height: 100px;
  padding: 5px 10px;
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(40)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const ShortBio = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 2px;
`
export const Info = styled.div`
  ${css.flexColumn()};
  margin-left: 12px;
`
export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 10px;
`
export const Title = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
export const Nickname = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
`
export const Login = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
