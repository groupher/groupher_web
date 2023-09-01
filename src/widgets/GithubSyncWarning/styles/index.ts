import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  padding: 30px;
`
export const Logo = styled(Img)`
  fill: ${theme('baseColor.red')};
  ${css.size(60)};
  margin-bottom: 15px;
`
export const Header = styled.div`
  color: ${theme('article.title')};
  font-size: 1.2rem;
  margin-bottom: 12px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 1rem;
`

export const FootLinker = styled.a`
  margin-top: 50px;
  color: ${theme('article.title')};
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`
