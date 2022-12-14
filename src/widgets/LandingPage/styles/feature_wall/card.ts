import styled from 'styled-components'

import type { TColorName } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  color: ${theme('article.digest')};
  width: 300px;
  /* height: 300px; */
  height: auto;
  border-radius: 10px;
  font-size: 16px;
  background: #ffffffd4;
  padding: 20px;
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
  margin-bottom: 25px;
`

export const Header = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 10px;
`

export const Avatar = styled(Img)<{ color: TColorName }>`
  ${css.circle(30)};
  border: 2px solid;
  padding: 2px;
  border-color: gold;
  border-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)};
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
`

export const User = styled.div``

export const Nickname = styled.div`
  color: ${theme('article.title')};
  margin-left: 10px;
  font-size: 14px;
`

export const Content = styled.div``
