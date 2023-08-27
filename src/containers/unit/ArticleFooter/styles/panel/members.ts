import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  margin-bottom: 15px;
  margin-top: -4px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 10px;
`
