import styled from 'styled-components'

import type { TPrimaryColor, TSpace } from '@/spec'
// import Img from '@/Img'
import css, { theme, primaryTheme } from '@/css'

import Button from '../../Button'
// see example: https://codepen.io/mydearxym2/pen/qBEvvpo

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
`

type TPubButton = { smaller?: boolean } & TPrimaryColor
export const PubButton = styled(Button)<TPubButton>`
  ${css.row('justify-between')};
  width: 100%;

  border: none;
  font-weight: 600;
  background: ${({ primaryColor }) => primaryTheme(primaryColor)};
  color: ${theme('button.fg')};
  height: ${({ smaller }) => (smaller ? '26px' : '33px')};
  border-radius: 15px;
`
export const MoreOption = styled.div<TSpace>`
  ${css.row('align-both')};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
