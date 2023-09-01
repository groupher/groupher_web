import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  color: ${theme('article.digest')};
`
export const Section = styled.div`
  ${css.row('align-center')};
  margin-bottom: 7px;
`
export const Text = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
  color: ${theme('article.digest')};
`
export const Num = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 5px;
  margin-right: 5px;
`
