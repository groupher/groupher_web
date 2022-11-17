import Link from 'next/link'
import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
`
export const Title = styled(Link)`
  ${css.cutRest('50px')};
  color: ${theme('article.title')};
  font-size: 12px;
  margin-left: 0;
  margin-right: 8px;
  text-decoration: none;
`
