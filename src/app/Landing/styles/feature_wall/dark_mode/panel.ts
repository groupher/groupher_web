import type { TColor } from '@/spec'
import styled, { css, theme } from '@/css'

import { WithMargin } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 300px;
  padding-right: 20px;
  position: relative;
`
export const DivideColumn = styled.div<{ $hovering: boolean }>`
  background: ${theme('rainbow.red')};
  width: 3px;
  height: ${({ $hovering }) => ($hovering ? '180px' : '150px')};
  position: absolute;
  border-radius: 5px;
  z-index: 10;
  transition: all 0.2s;
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
  $width?: number
  $height?: number
}
export const BaseCard = styled.div<TBaseCard>`
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  opacity: 0.8;

  transition: all 0.3s;
`
type TBar = { width: number } & { opacity?: number } & TColor
export const BaseBar = styled.div<TBar>`
  height: 4px;
  width: ${({ width }) => `${width || 30}px`};
  border-radius: 5px;
  opacity: ${({ opacity }) => opacity || 0.4};
`
export const BaseCodeBox = styled.div`
  width: 100%;
  min-height: 54px;
  padding: 8px 3px;
  padding-bottom: 0;
  border-radius: 5px;
`
export const BaseCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-left: 2px;
`
export const CodeItem = styled.div`
  ${css.row('align-center')};
  gap: 6px;
  margin-bottom: 7px;
`
