import styled from 'styled-components'

import type { TColorName } from '@/spec'

import Input from '@/widgets/Input'
import css, { rainbow } from '@/css'

export const Wrapper = styled.div`
  width: 100%;
`

export const BgLabel = styled.div<{ bg: TColorName }>`
  width: 44px;
  height: 24px;
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${({ bg }) => rainbow(bg)};
  border-radius: 6px;
  margin-left: -10px;
  cursor: pointer;
`
export const TheColor = styled.div<{ color: TColorName }>`
  width: 38px;
  height: 18px;
  border-radius: 6px;
  background-color: ${({ color }) => rainbow(color)};
`

export const Item = styled.div`
  ${css.row('align-center')};
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
