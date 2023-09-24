import styled from 'styled-components'

import type { TActive, TPrimaryColor, TSpace } from '@/spec'
import css, { theme, primaryTheme } from '@/css'

type TWrapper = { menuOpen?: boolean } & TSpace
export const FilterWrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
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
  word-break: keep-all;
`
export const SelectItem = styled.div<TActive>`
  ${css.row('align-start')};
  padding: 10px 6px;
  width: 100%;
  border-radius: 6px;

  background-color: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')}; // to-theme
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${theme('hoverBg')};
  }

  transition: all 0.1s;
`
