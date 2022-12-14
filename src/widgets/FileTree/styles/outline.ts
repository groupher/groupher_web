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
`
export const Item = styled.div<TActive>`
  ${css.lineClamp(1)};
  margin-top: 4px;
  margin-bottom: 5px;
  padding-left: 16px;
  position: relative;
  color: ${theme('article.title')};
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    color: ${theme('article.title')};
  }
`
export const Index = styled.div`
  position: absolute;
  left: 4px;
  top: 7px;
  border-radius: 5px;
  background-color: ${theme('article.info')};
  ${css.size(4)};
  opacity: 0.6;
`
