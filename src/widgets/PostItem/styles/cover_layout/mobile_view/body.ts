import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.rowGrow('align-center')};
  margin-bottom: 4px;
  color: ${theme('article.title')};
`
export const Title = styled.a`
  color: ${theme('article.title')};
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    text-decoration: none;
    color: ${theme('article.title')};
  }
`
