import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

export const EditorWrapper = styled.div<{ menuOpen?: boolean }>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${({ menuOpen }) =>
    menuOpen ? theme('article.digest') : theme('button.ghostBorder')};
  font-size: 13px;
  padding: 0 5px;
  padding-left: 15px;
  border-radius: 10px;

  &:hover {
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MobileWrapper = styled.div<{ menuOpen?: boolean }>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
`

export const Label = styled.div`
  opacity: 0.7;
`

export const SelectItem = styled.div<TActive>`
  padding: 2px 8px;
  width: auto;
  border-radius: 5px;
  margin-bottom: 6px;
  background-color: ${({ $active }) => ($active ? theme('textBadge') : 'transparent')}; // to-theme
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ $active }) => ($active ? 600 : 450)};
  position: relative;

  &:hover {
    color: ${theme('article.title')};
    background-color: ${theme('hoverBg')};
    cursor: pointer;
  }
`
