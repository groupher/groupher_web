import styled from 'styled-components'

import type { TColorName } from '@/spec'
import { COLORS } from '@/constant/colors'

import Input from '@/widgets/Input'
import css from '@/utils/css'

export const Wrapper = styled.div`
  width: 100%;
`

export const BgLabel = styled.div<{ bg: TColorName }>`
  width: 44px;
  height: 24px;
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  border-radius: 6px;
  margin-left: -10px;
  cursor: pointer;
`
export const TheColor = styled.div<{ color: TColorName }>`
  width: 38px;
  height: 18px;
  border-radius: 6px;
  background-color: ${({ color }) => COLORS[color]};
`

export const Item = styled.div`
  ${css.flex('align-center')};
  margin-bottom: 20px;
`
export const Label = styled.div`
  font-size: 12px;
  width: 85px;
`
export const Inputer = styled(Input)`
  width: 100%;
  background: transparent;
`
export const EnableDesc = styled.div`
  width: 80%;
  line-height: 1.65;
`
