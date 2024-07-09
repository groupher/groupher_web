import type { TColor } from '~/spec'

import { WithMargin } from '~/widgets/Common'
import styled, { css, rainbow } from '~/css'

export const Row = styled.div`
  ${css.row('align-both')};
`
export const Column = styled(WithMargin)`
  ${css.column('align-start')};
  ${css.size(36)};
  width: 18px;
  position: relative;
`

export const TreeColumn = styled(WithMargin)`
  ${css.column('align-start')};
  width: 6px;
  height: 36px;
  position: relative;
`
export const DocColumn = styled(Column)`
  width: 30px;
  height: 36px;
  position: relative;
`

type TBar = {
  width?: number
  height?: number
  top?: number
  $radius?: number
} & TColor

export const Bar = styled.div<TBar>`
  position: absolute;
  top: ${({ top }) => `${top || 5}px`};
  left: 5px;
  width: ${({ width }) => `${width || 50}%`};
  height: ${({ height }) => `${height || 4}px`};
  border-radius: ${({ $radius }) => `${$radius || 5}px`};
  background: ${({ $color }) => rainbow($color)};
  opacity: 0.2;
`
