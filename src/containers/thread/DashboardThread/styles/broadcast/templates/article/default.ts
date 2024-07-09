import styled, { css, theme } from '~/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.row('align-both')};
  height: 180px !important;
  background: ${({ $active }) => ($active ? theme('alphaBg') : 'transparent')};
`
export const Shrink = styled.div`
  transform: scale(0.9);
`
