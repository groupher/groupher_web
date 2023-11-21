import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

export const EditorWrapper = styled.div<{ $menuOpen?: boolean }>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};

  background: ${theme('hoverBg')};
  border-radius: 10px;
  height: 32px;

  font-size: 13px;
  padding: 0 2px;
  padding-left: 10px;
  border-radius: 10px;

  &:hover {
    border-color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MobileWrapper = styled.div<{ $menuOpen?: boolean }>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
`
export const Label = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-right: 3px;
`
export const SelectItem = styled.div<TActive>`
  padding: 2px 8px;
  width: auto;
  border-radius: 5px;
  margin-bottom: 6px;
  background: ${({ $active }) => ($active ? theme('menuHoverBg') : 'transparent')};
  box-shadow: ${({ $active }) => ($active ? theme('button.boxShadow') : '')};
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  position: relative;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('button.boxShadow')};
    cursor: pointer;
  }
`
