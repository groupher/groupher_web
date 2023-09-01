import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 16px;
`
