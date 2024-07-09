import styled, { css, rainbow, theme } from '~/css'
import type { TColor } from '~/spec'

import MoreSVG from '~/icons/menu/MoreL'

import { WithPosition } from '~/widgets/Common'

export const Wrapper = styled(WithPosition)`
  height: 32px;
  width: 100%;
  transition: all .2s;
`
export const Domain = styled(WithPosition)`
  ${css.row('align-both')};
  background-color: #304d0952;
  width: 90px;
  height: 20px;
  border-radius: 5px;
  color: ${theme('button.fg')};
  font-size: 12px;
  font-weight: 500;
`
export const Dot = styled(WithPosition)<TColor>`
  ${css.circle(9)};
  background: ${({ $color }) => rainbow($color)};
  opacity: 0.65;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(14)};
  fill: ${theme('rainbow.green')};
  position: absolute;
  top: 12px;
  right: 14px;
`
