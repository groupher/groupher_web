import Link from 'next/link'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 68vh;
  position: relative;
`
export const InnerWrapper = styled.div`
  ${css.column('align-start')};
  position: relative;
`
export const Footer = styled.div`
  ${css.row()};
  margin-top: 20px;
`
