import styled, { css, theme } from '~/css'

import { MainContent } from '..'

export const Wrapper = styled(MainContent)`
  ${css.row('align-both')};


  *::selection {
    background-color: ${theme('rainbow.purpleSoft')} !important;
    color: ${theme('rainbow.purple')} !important;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
