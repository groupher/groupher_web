import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
`

export const ErrText = styled.div`
  color: ${theme('rainbow.red')};
`
