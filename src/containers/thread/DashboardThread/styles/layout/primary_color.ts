import type { TColor } from '@/spec'
import styled, { css, rainbow } from '@/css'

import { BaseSection } from '.'

export const Wrapper = styled(BaseSection)``

export const Label = styled.div<TColor>`
  ${css.row('align-both')};
  ${css.circle(42)};
  border: 1px solid;
  border-color: ${({ $color }) => rainbow($color, 'article.digest')};
  cursor: pointer;
`
export const ColorBall = styled.div<TColor>`
  ${css.circle(34)};
  background-color: ${({ $color }) => rainbow($color, 'rainbow.blackRow')};
  margin-top: 3px;
  margin-left: 3px;
`
