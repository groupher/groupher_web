import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  position: relative;
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  line-height: 20px;
`

export const holder = 1
