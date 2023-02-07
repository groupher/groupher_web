import styled from 'styled-components'

import type { TSpace } from '@/spec'
// import Img from '@/Img'
import css from '@/utils/css'

import Button from '../../Button'
// see example: https://codepen.io/mydearxym2/pen/qBEvvpo

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  width: 100%;
`
export const PubButton = styled(Button)<{ smaller?: boolean }>`
  ${css.flex('justify-between')};
  width: 100%;

  border: none;
  font-weight: 600;
  background: #3b434a; // to-theme
  color: white; // to-theme
  height: ${({ smaller }) => (smaller ? '26px' : '33px')};
  border-radius: 15px;
`
export const MoreOption = styled.div<TSpace>`
  ${css.flex('align-both')};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
