import styled, { css, rainbow } from '@/css'
import type { TColor } from '@/spec'

import { WithPosition } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 46px;
`
type TBlock = { $width?: number; $height?: number; $radius?: number; $opacity?: number } & TColor
export const Block = styled(WithPosition)<TBlock>`
  width: ${({ $width }) => `${$width || 20}px`};
  height: ${({ $height }) => `${$height || 6}px`};
  border-radius: ${({ $radius }) => `${$radius || 5}px`};
  opacity: ${({ $opacity }) => `${$opacity || 1}`};
  background: ${({ $color }) => rainbow($color)};
`
