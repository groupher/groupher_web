import styled from 'styled-components'

import css, { animate, theme } from '@/css'
import ViewSVG from '@/icons/View'

type TWrapper = { top: number; left: number }
export const Wrapper = styled.div<TWrapper>`
  ${css.row()};
  position: absolute;
  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
  animation: ${animate.fadeInRight} 0.3s linear;
`
export const ViewIcon = styled(ViewSVG)`
  ${css.size(10)};
  fill: ${theme('hint')};
`
