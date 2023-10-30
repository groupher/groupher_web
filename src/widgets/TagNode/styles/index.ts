import styled from 'styled-components'

import type { TColor } from '@/spec'

import HashSVG from '@/icons/HashTag'
import css, { theme, rainbow } from '@/css'

type TProps = {
  size: number
  opacity: number
  left: number
  right: number
  top?: number
  $dividerBorder?: boolean
} & TColor

export const Dot = styled.div<TProps>`
  ${({ size }) => css.circle(size)};
  background: ${({ $color }) => rainbow($color)};
  opacity: ${({ opacity }) => opacity};
  margin-top: ${({ top }) => `${top}px;`};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};

  border: ${($dividerBorder) => ($dividerBorder ? '1px dotted' : '1px solid')};
  border-color: ${({ $dividerBorder, $color }) =>
    !$dividerBorder ? rainbow($color) : theme('hint')};
`
export const HashIcon = styled(HashSVG)<TProps>`
  ${({ size }) => css.size(size)};
  fill: ${({ $color }) => rainbow($color)};
  opacity: ${({ opacity }) => opacity};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};
  margin-top: ${({ top }) => `${top}px;`};
`
