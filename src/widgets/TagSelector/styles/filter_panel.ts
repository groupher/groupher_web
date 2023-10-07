import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme, baseColorTheme } from '@/css'

import { SelectItem as SelectItemBase } from '.'

export const Wrapper = styled.div`
  ${css.column()};
  width: 240px;
  cursor: auto;
`
export const GroupWrapper = styled.div`
  ${css.rowWrap('align-center')};
  width: 100%;
  margin-bottom: 10px;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.row('align-center')};
  margin-bottom: 2px;
  margin-right: 3px;
`
export const DotBox = styled.div`
  ${css.circle(12)};
  ${css.row('align-both')};
`
type THashSign = TActive & { color?: string }
export const DotSign = styled.div<THashSign>`
  ${css.circle(7)};
  background: ${({ color }) => (color ? baseColorTheme(color) : 'none')};

  margin-right: 8px;
  margin-top: -1px;
  opacity: ${theme('tags.dotOpacity')};

  transition: filter 0.1s;

  ${SelectItem}:hover & {
    ${css.circle(11)};
    border: 2px solid;
    border-color: white;
  }
`
export const GroupTitle = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.6;
  margin-left: 5px;
  margin-bottom: 5px;
  margin-top: 3px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${SelectItem}:hover & {
    color: ${theme('article.title')};
  }
`
