import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const ResultText = styled.div`
  color: ${theme('article.info')};
`
