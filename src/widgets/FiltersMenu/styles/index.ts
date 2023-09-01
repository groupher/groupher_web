import styled from 'styled-components'

import type { TActive } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  width: 100%;
  min-width: 110px;
`
export const ItemWrapper = styled.div<{ withDivider: boolean }>`
  ${css.column()};
  border-bottom: ${({ withDivider }) => (withDivider ? '1px solid' : 'none')};
  border-bottom-color: ${({ withDivider }) => (withDivider ? '#EFEEEE' : 'none')}; // to-theme
  margin-bottom: 10px;

  &:last-child {
    border-bottom: none;
  }
`
type TItem = TActive & {
  revert: boolean
  noFilter: boolean
  itemBgHighlight: boolean
  topMargin: boolean
}
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  justify-content: ${({ revert }) => (revert ? 'flex-start' : 'flex-end')};
  color: ${theme('article.title')};
  font-size: ${({ active }) => (active ? '15px' : '14px')};
  padding: 8px 6px;
  padding-bottom: ${({ noFilter }) => (noFilter ? '10px' : '5px')};

  background: ${({ active, itemBgHighlight }) =>
    active && itemBgHighlight ? '#0B323E' : 'transparent'};
  border-radius: 6px;
  margin-top: ${({ topMargin }) => (topMargin ? '10px' : '0')};

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
  transition: margin-top 0.25s;
`
export const Icon = styled(Img)<TActive>`
  fill: ${theme('article.digest')};
  opacity: ${({ active }) => (active ? 1 : 0)};
  ${css.size(15)};

  ${Item}:hover & {
    opacity: 1;
  }
  transition: opacity 0.25s;
`

export const ActiveDot = styled.div`
  background: ${theme('article.title')};
  width: 5px;
  height: 5px;
  border-radius: 50%;
`
