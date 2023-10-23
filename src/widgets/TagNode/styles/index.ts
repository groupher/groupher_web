import styled from 'styled-components'

import type { TColorName } from '@/spec'

import HashSVG from '@/icons/HashTag'
import css, { theme, rainbow } from '@/css'

type TProps = {
  color: string
  size: number
  opacity: number
  left: number
  right: number
  top?: number
  dividerBorder?: boolean
}

export const Dot = styled.div<TProps>`
  ${({ size }) => css.circle(size)};
  background: ${({ color }) => rainbow(color as TColorName)};
  opacity: ${({ opacity }) => opacity};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};

  border: ${(dividerBorder) => (dividerBorder ? '1px dotted' : '1px solid')};
  border-color: ${({ dividerBorder, color }) =>
    !dividerBorder ? rainbow(color as TColorName) : theme('hint')};
`
export const HashIcon = styled(HashSVG)<TProps>`
  ${({ size }) => css.size(size)};
  fill: ${({ color }) => rainbow(color as TColorName)};
  opacity: ${({ opacity }) => opacity};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};
  margin-top: ${({ top }) => `${top}px;`};
`
