import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  cursor: pointer;
`
export const ArrowIcon = styled(Img)<{ reverse?: boolean }>`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  transform: ${({ reverse }) => (reverse ? 'rotate(180deg)' : '')};
  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-left: 8px;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
