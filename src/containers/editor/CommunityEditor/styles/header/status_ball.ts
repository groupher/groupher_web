import styled, { css, theme, animate } from '@/css'

import CheckSVG from '@/icons/CheckBold'

type TWrapper = { $colors: string[]; $noBorder?: boolean }

const Wrapper = styled.div<TWrapper>`
  ${css.circle(20)};
  ${css.row('align-both')};
  border: ${({ $noBorder }) => ($noBorder ? '' : '1px dashed')};
  border-color: ${({ $colors }) => `${$colors[0]}`};
`
/* background:  ${({ $colors }) =>
    `radial-gradient(circle, ${$colors[0]} 0%, ${$colors[1]} 100%)`} ; */
export const DoneWrapper = styled(Wrapper)`
  background: ${theme('article.digest')};
  transform: scale(0.8);
`
export const DoingWrapper = styled(Wrapper)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transform: scale(1);
  animation: ${animate.rotate360} 4s linear infinite;
`
export const Dot = styled.div<{ $colors: string[] }>`
  ${css.circle(6)};
  background: ${({ $colors }) => `${$colors[0]}`}};
`
export const TodoWrapper = styled(Wrapper)`
  border-color: ${theme('article.digest')};
  opacity: 0.8;
  transform: scale(0.8);
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(12)};
  fill: white;
`
