import styled from 'styled-components'

import type { TColorName } from '@/spec'
import { COLORS } from '@/constant/colors'

import css from '@/utils/css'

export const Wrapper = styled.div`
  width: 100%;
`

export const BgWrapper = styled.div`
  ${css.flex('align-center')};
  font-size: 12px;
`
export const BgLabel = styled.div<{ bg: TColorName }>`
  width: 44px;
  height: 24px;
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 15px;
`
export const TheColor = styled.div<{ color: TColorName }>`
  width: 38px;
  height: 18px;
  border-radius: 6px;
  background-color: ${({ color }) => COLORS[color]};
`
