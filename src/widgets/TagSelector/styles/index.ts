import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div<{ menuOpen: boolean }>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  border: ${({ menuOpen }) => (menuOpen ? '1px solid' : '2px solid')};
  border-color: ${({ menuOpen }) =>
    menuOpen ? theme('article.digest') : theme('divider')};
  font-size: 13px;
  padding: 0 5px;
  padding-left: 15px;
  border-radius: 10px;
`

export const Label = styled.div`
  opacity: 0.7;
`

export const SelectItem = styled.div<TActive>`
  ${css.flex('align-start')};
  padding: 2px 8px;
  width: auto;
  border-radius: 3px;
  margin-bottom: 6px;
  background-color: ${({ active }) =>
    active ? theme('textBadge') : 'transparent'}; // to-theme
  color: ${({ active }) =>
    active ? theme('article.title') : theme('article.digest')};
  font-weight: ${({ active }) => (active ? 600 : 450)};
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    background-color: ${theme('hoverBg')};
  }
`
