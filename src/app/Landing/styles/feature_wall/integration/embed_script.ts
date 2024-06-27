import styled, { css, theme, animate, rainbow } from '~/css'
import type { TColor } from '~/spec'

import { WithPosition } from '~/widgets/Common'
import TerminalSVG from '~/icons/Terminal'

export const Codes = styled(WithPosition)`
  font-size: 10px;
  color: ${theme('article.digest')};
  opacity: 0.8;
`
export const TerminalIcon = styled(TerminalSVG)`
  fill: ${theme('hint')};
  ${css.size(12)};
  position: absolute;
  left: 23px;
  bottom: 14px;
`
export const BlickCursor = styled(WithPosition)`
  width: 1px;
  height: 11px;
  border-radius: 3px;
  background: ${theme('rainbow.red')};
  animation: ${animate.blink} 1s linear infinite alternate;
`
export const Highlight = styled.span<TColor>`
  color: ${({ $color }) => rainbow($color)};
  font-weight: 550;
`
