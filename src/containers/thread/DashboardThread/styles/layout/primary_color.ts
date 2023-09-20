import styled from 'styled-components'

import type { TColorName } from '@/spec'
import { COLORS } from '@/constant/colors'
import css from '@/css'

import { BaseSection } from '.'

export const Wrapper = styled(BaseSection)``

export const Label = styled.div<{ color: TColorName }>`
  ${css.row('align-both')};
  ${css.circle(42)};
  border: 1px solid;
  border-color: ${({ color }) => COLORS[color]};
  cursor: pointer;
`
export const TheColor = styled.div<{ color: TColorName }>`
  ${css.circle(34)};
  background-color: ${({ color }) => COLORS[color]};
  margin-top: 3px;
  margin-left: 3px;
`
