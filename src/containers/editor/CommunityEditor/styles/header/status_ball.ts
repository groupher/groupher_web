import styled, { css, theme } from '@/css'

import CheckSVG from '@/icons/CheckBold'

const Wrapper = styled.div`
  ${css.circle(20)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('article.digest')};
`
export const DoneWrapper = styled(Wrapper)`
  background: ${theme('article.digest')};
  transform: scale(0.8);
`
export const DoingWrapper = styled(Wrapper)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  transform: scale(1);
`
export const Dot = styled.div`
  ${css.circle(6)};
  background: ${theme('article.digest')};
`
export const TodoWrapper = styled(Wrapper)`
  opacity: 0.4;
  transform: scale(0.8);
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(12)};
  fill: white;
`
