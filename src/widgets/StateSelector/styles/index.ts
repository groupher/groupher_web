import styled from 'styled-components'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

type TWrapper = { menuOpen?: boolean } & TSpace
export const FilterWrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;

  ${(props) => css.spaceMargins(props)};
`
export const FullWrapper = styled(FilterWrapper)`
  border: 1px solid;
  border-color: ${({ menuOpen }) =>
    menuOpen ? theme('article.digest') : theme('button.ghostBorder')};

  padding: 0 5px;
  padding-left: 15px;
  border-radius: 10px;

  &:hover {
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const Label = styled.div`
  opacity: 0.7;
`

export const SelectItem = styled.div<TActive>`
  ${css.flex('align-start')};
  padding: 4px 8px;
  width: auto;
  border-radius: 5px;
  background-color: ${({ active }) => (active ? theme('textBadge') : 'transparent')}; // to-theme
  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ active }) => (active ? 600 : 450)};
  position: relative;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    background-color: ${theme('hoverBg')};
  }
`
