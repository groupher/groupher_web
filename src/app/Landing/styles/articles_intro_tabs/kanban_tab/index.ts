import styled, { css, theme } from '@/css'

import { MainContent } from '..'

export const Wrapper = styled(MainContent)`
  ${css.column('align-both')};

  *::selection {
    background-color: ${theme('rainbow.blue')} !important;
    color: white;
  }
`

export const DesktopOnly = styled.div`
  ${css.row('align-center', 'justify-between')};
  ${css.media.mobile`
    display: none;
  `};
`

export const Slogan = styled.div`
  ${css.column('align-both')};
`
