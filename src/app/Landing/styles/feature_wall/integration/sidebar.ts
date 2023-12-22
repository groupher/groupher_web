import { WithPosition } from '@/widgets/Common'

import styled, { css, theme } from '@/css'

export const Wrapper = styled(WithPosition)`
  width: 86px;
  height: 150px;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 6px;
  padding: 5px;

  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  z-index: 2;
  transition: all .2s;
`

export const holder = 1
