import styled from 'styled-components'

import css, { theme } from '@/css'

import { WithMargin } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 320px;
  padding-right: 20px;
  position: relative;
`
export const Item = styled.div`
  ${css.row('align-center')};
  gap: 6px;
  margin-bottom: 7px;
`
export const Footer = styled(WithMargin)`
  ${css.row('align-center')};
  opacity: 0.8;
`

type TBaseCard = {
  $left: number
  $zIndex: number
  $opacity?: number
  $width?: number
  $height?: number
  $top?: number
}
export const BaseCard = styled.div<TBaseCard>`
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;

  position: absolute;
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  left: ${({ $left }) => `${$left}px`};
  top: ${({ $top }) => `${$top}px`};
  opacity: ${({ $opacity }) => `${$opacity || 1}`};
  z-index: ${({ $zIndex }) => `${$zIndex || 1}`};

  transition: all 0.35s;
`
