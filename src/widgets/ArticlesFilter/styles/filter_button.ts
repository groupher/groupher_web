import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
  line-height: 18px;
`
export const Label = styled.div`
  opacity: 0.7;
  word-break: keep-all;
`
