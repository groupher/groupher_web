import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'
import { WithMargin } from '@/widgets/Common'

type TWrapper = { $menuOpen?: boolean; $selected?: boolean }
export const FilterWrapper = styled(WithMargin)<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
  padding-left: ${({ $selected }) => ($selected ? 0 : '6px')};
  background-color: ${({ $menuOpen, $selected }) =>
    $menuOpen || $selected ? theme('hoverBg') : 'transparent'};
  margin-left: ${({ $selected }) => ($selected ? '4px' : 0)};
  margin-right: ${({ $selected }) => ($selected ? '4px' : 0)};
  border-radius: 10px;
  height: 32px;
  /* important, otherwise will conflict with bottom */
  z-index: 10;

  &:hover {
    background: ${theme('hoverBg')};
  }

  transition: all 0.15s;
`
export const FullWrapper = styled(FilterWrapper)<TWrapper>`
  border: 1px solid;
  border-color: ${({ $menuOpen }) =>
    $menuOpen ? theme('article.digest') : theme('button.ghostBorder')};

  padding: 0 5px;
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
