import styled from 'styled-components'

import { WithMargin } from '@/widgets/Common'
import css, { animate } from '@/css'

export const Wrapper = styled.div`
  // not work
  animation: ${animate.fadeInRight} 0.1s linear;
`

export const Footer = styled(WithMargin)`
  ${css.row('align-center')};
`
