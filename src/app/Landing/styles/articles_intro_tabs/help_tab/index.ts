import styled, { css, theme } from '@/css'

import { MainContent } from '..'

export const Wrapper = styled(MainContent)`
  ${css.row('align-both')};
  width: 100%;
  position: relative;

  *::selection {
    background-color: ${theme('rainbow.cyan')} !important;
    color: white;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
