import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.rowWrap()};
  padding: 0 2px;
  padding-right: 10px;
`
export const Linker = styled.a`
  color: ${theme('article.title')};
  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`
export const SocialIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 8px;
  margin-bottom: 8px;
  opacity: 1;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: fill 0.3s;
`
