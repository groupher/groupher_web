import styled from 'styled-components'

import { Bar as BarBase } from '@/widgets/Common'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.row()};
  background: ${theme('alphaBg2')};
  opacity: ${({ opacity }) => opacity};
  margin-bottom: 12px;
`
type TAvatar = { color: string; bg: string }

export const Avatar = styled.div<TAvatar>`
  ${css.size(20)};
  ${css.row('align-both')};
  color: ${({ color }) => color};
  font-size: 10px;
  font-weight: 600;
  border-radius: 4px;
  background-color: ${({ bg }) => bg};
`
export const RightPart = styled.div`
  ${css.column()};
  margin-left: 15px;
`
export const Bar = styled(BarBase)`
  background: ${theme('rainbow.purple')};
`
