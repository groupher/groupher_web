import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.flex('align-both')};
  height: 180px !important;
  background: ${({ $active }) => ($active ? theme('alphaBg') : 'transparent')};
`
export const Shrink = styled.div`
  transform: scale(0.9);
`
