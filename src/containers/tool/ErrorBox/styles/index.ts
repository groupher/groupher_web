import styled from 'styled-components'
import Link from 'next/link'

import css, { theme, animate } from '@/css'
import WarningSVG from '@/icons/Warning'

export const Wrapper = styled.div`
  position: fixed;
  left: calc(50% - 245px);
  bottom: 30px;
  ${css.row('align-center')};
  border: 1px solid;
  border-color: ${theme('baseColor.red')};
  height: 40px;
  width: 520px;
  border-radius: 12px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 48px;
  background-color: #ffefee;

  z-index: 10;
  padding: 0 15px;

  animation: ${animate.jump} 0.3s linear;
`
export const WarningIcon = styled(WarningSVG)`
  ${css.size(12)};
  fill: tomato;
  margin-right: 8px;
  margin-bottom: 1px;
`
export const ResetButton = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.title')};
  width: 40px;
  height: 20px;
  border-radius: 6px;
  font-size: 11px;
  background: ${theme('alphaBg2')};

  &:hover {
    background: white;
    color: ${theme('article.digest')};
  }

  cursor: pointer;
  transition: all 0.2s;
`
export const LearnMoreButton = styled.div`
  ${css.row('align-both')};
  width: 60px;
  height: 18px;
  border-radius: 6px;
  font-size: 11px;
  background: tomato;
  margin-right: 8px;
`
export const MoreLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`
