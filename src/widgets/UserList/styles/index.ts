import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  gap: 22px 0;
  padding: 0 50px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
