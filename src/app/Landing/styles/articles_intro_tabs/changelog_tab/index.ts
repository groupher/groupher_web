import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  position: relative;

  *::selection {
    background-color: ${theme('rainbow.red')} !important;
    color: white;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
