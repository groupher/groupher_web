import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  margin-top: 40px;
  gap: 22px 0;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
