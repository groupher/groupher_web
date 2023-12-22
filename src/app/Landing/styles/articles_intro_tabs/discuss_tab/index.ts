import styled, { css, theme } from '@/css'

import { MainContent } from '..'

export const Wrapper = styled(MainContent)`
  ${css.row('align-both')};

  *::selection {
    background-color: ${theme('rainbow.purple')} !important;
    color: white;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
