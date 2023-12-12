import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 728px;
  background: ${theme('landing.greyBg')};
  position: relative;
`
export const Right = styled.div`
  ${css.row('align-both')};
  width: 50%;
  height: 100%;
`
