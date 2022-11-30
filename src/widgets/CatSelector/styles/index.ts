import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const FilterWrapper = styled.div<{ menuOpen?: boolean }>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const FullWrapper = styled(FilterWrapper)`
  border: ${({ menuOpen }) => (menuOpen ? '1px solid' : '2px solid')};
  border-color: ${({ menuOpen }) =>
    menuOpen ? theme('article.digest') : theme('divider')};
  padding: 0 5px;
  padding-left: 15px;
  border-radius: 10px;
`

export const Label = styled.div`
  opacity: 0.7;
`

export const SelectItem = styled.div<TActive>`
  ${css.flex('align-start')};
  padding: 10px 6px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 2px;
  /* border: 1px solid; */
  /* border-color: ${({ active }) =>
    active ? theme('divider') : 'transparent'};  */

  background-color: ${({ active }) =>
    active ? theme('textBadge') : 'transparent'}; // to-theme
  color: ${({ active }) =>
    active ? theme('article.title') : theme('article.digest')};
  font-weight: ${({ active }) => (active ? 600 : 450)};
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${({ active }) =>
      active ? theme('textBadge') : theme('hoverBg')}; // to-theme
    color: ${theme('article.title')};
  }
`
