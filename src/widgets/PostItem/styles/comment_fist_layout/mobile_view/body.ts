import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexGrow('align-center')};
  color: ${theme('article.title')};
`
export const Title = styled.a`
  ${css.lineClamp(1)};
  color: ${theme('article.title')};
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
`
