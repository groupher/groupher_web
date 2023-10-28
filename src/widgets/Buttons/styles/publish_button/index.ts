import styled from 'styled-components'

import type { TColor, TSpace } from '@/spec'
// import Img from '@/Img'
import css, { theme, rainbow } from '@/css'
import { WithMargin } from '@/widgets/Common'

import Button from '../../Button'
// see example: https://codepen.io/mydearxym2/pen/qBEvvpo

export const Wrapper = styled(WithMargin)`
  ${css.row('align-center')};
`

type TPubButton = { smaller?: boolean } & TColor
export const PubButton = styled(Button)<TPubButton>`
  ${css.row('justify-between')};
  width: 100%;

  font-weight: 600;
  background: ${({ $color }) => rainbow($color, 'button.bg')};
  color: ${theme('button.fg')};
  height: ${({ smaller }) => (smaller ? '28px' : '33px')};
  border-radius: 10px;
`
export const MoreOption = styled.div<TSpace>`
  ${css.row('align-both')};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
