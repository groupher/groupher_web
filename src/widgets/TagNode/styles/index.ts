import type { TColor } from '@/spec'

import HashSVG from '@/icons/HashTag'
import HashSVGBold from '@/icons/HashTagBold'

import styled, { css, rainbow } from '@/css'

type TProps = {
  size: number
  opacity: number
  left: number
  right: number
  top?: number
  $darkTheme?: boolean
} & TColor

export const Dot = styled.div<TProps>`
  ${({ size }) => css.circle(size)};
  background: ${({ $color, $darkTheme }) => rainbow($color, $darkTheme ? 'hint' : 'article.digest')};
  opacity: ${({ opacity }) => opacity};
  margin-top: ${({ top }) => `${top}px;`};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};
`
export const HashNormalIcon = styled(HashSVG)<TProps>`
  ${({ size }) => css.size(size)};
  fill: ${({ $color }) => rainbow($color, 'article.digest')};
  opacity: ${({ opacity }) => opacity};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};
  margin-top: ${({ top }) => `${top}px;`};
`
export const HashBoldIcon = styled(HashSVGBold)<TProps>`
  ${({ size }) => css.size(size)};
  fill: ${({ $color, $darkTheme }) => rainbow($color, $darkTheme ? 'hint' : 'article.digest')};
  opacity: ${({ opacity }) => opacity};
  margin-right: ${({ right }) => `${right}px;`};
  margin-left: ${({ left }) => `${left}px;`};
  margin-top: ${({ top }) => `${top}px;`};
  transform: rotate(18deg);
`
