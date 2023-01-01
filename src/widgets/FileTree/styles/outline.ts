import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

// import Img from '@/Img'
// import { theme } from '@/utils/themes'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 6px;
`
export const Item = styled.div<TActive>`
  ${css.lineClamp(1)};
  padding-left: 14px;
  position: relative;
  padding-top: 5px;
  padding-bottom: 4px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  border-left: 1px solid transparent;
  border-left-color: ${({ $active }) => ($active ? theme('article.title') : theme('divider'))};

  &:hover {
    color: ${theme('article.title')};
  }
`
