import styled from 'styled-components'

import css from '@/css'

export const DesktopOnly = styled.div`
  ${css.row('align-center', 'justify-between')};
  ${css.media.mobile`
    display: none;
  `};
`

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  position: relative;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
