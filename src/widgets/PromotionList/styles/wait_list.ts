import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
`
export const Item = styled.div<TActive>`
  ${css.cutRest('50px')};
  color: ${({ active }) =>
    active ? theme('article.title') : theme('article.digest')};
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 2px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }

  transition: all 0.3s;
`
