import styled from 'styled-components'

import type { TActive } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')}
  width: 100%;
  margin-bottom: 4px;
`
export const Title = styled.div<TActive>`
  position: relative;
  color: ${theme('article.title')};
  font-size: 15px;
  padding-left: 5px;

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    background: #00999d;
    position: absolute;
    left: -10px;
    top: 8px;
    border-radius: 50%;
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
`
export const OperatorsWrapper = styled.div`
  ${css.row('align-center')};
`
export const Operator = styled.div<TActive>`
  color: ${theme('article.digest')};
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  font-size: 12px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const ResetIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 6px;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const HelpHint = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
