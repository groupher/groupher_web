import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const FilterWrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const FullWrapper = styled(FilterWrapper)`
  border: 2px solid;
  border-color: ${theme('divider')};
  padding: 0 5px;
  padding-left: 15px;
  border-radius: 10px;
`

export const Label = styled.div`
  opacity: 0.7;
`
export const ActiveLabel = styled.div`
  color: ${theme('article.title')};
  font-weight: 600;
`

export const SelectItem = styled.div<TActive>`
  ${css.flex('align-start')};
  padding: 5px 6px;
  width: 100%;
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
