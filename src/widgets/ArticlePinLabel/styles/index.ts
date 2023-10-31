import styled from 'styled-components'

import type { TColor } from '@/spec'
import css, { rainbow } from '@/css'
import PinSVG from '@/icons/Pin'
import { pixelAdd } from '@/dom'

type TPos = { top: number; left: number } & TColor

export const PinIcon = styled(PinSVG)<TPos>`
  fill: ${({ $color }) => rainbow($color)};
  position: absolute;
  ${css.size(16)};
  top: ${({ top }) => pixelAdd(`${top}px`, -4)};
  left: ${({ left }) => `${left}px`};
  opacity: 0.8;
`

export const holder = 1
