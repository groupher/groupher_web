import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  color: ${theme('article.digest')};
  width: 300px;
  margin-top: 14px;
  gap: 12px 14px;
`
type TBox = TActive & { radius: number }
export const Box = styled.div<TBox>`
  font-size: 13px;
  padding: 2px 15px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.title') : theme('editor.border'))};
  border-radius: ${({ radius }) => `${radius}px;`};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    border-color: ${theme('article.title')};
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
