import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'

// import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 6px;
`
type TItem = TActive & TPrimaryColor
export const Item = styled.div<TItem>`
  ${css.lineClamp(1)};
  padding-left: 14px;
  position: relative;
  padding-top: 5px;
  padding-bottom: 4px;
  color: ${({ $active, primaryColor }) =>
    $active ? primaryTheme(primaryColor) : theme('article.digest')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  border-left: 1px solid transparent;
  border-left-color: ${({ $active, primaryColor }) =>
    $active ? primaryTheme(primaryColor) : theme('divider')};

  &:hover {
    color: ${({ primaryColor }) => primaryTheme(primaryColor)};
  }
`
