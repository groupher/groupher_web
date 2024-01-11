import { Bar as BarBase } from '@/widgets/Common'
import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.row()};
  background: ${theme('alphaBg2')};
  opacity: ${({ opacity }) => opacity};
  margin-bottom: 12px;
`
export const Avatar = styled(Img)`
  ${css.size(24)};
  border-radius: 4px;
`
export const Nicname = styled.div`
  color: ${theme('article.title')};
  font-size: 11px;
  margin-top: -2px;
`
export const RightPart = styled.div`
  ${css.column()};
  margin-left: 15px;
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
  opacity: 0.5;
`
