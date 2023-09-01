import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;

  ${css.media.mobile`
    display: none;
  `};
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const DigestWrapper = styled.div`
  ${css.cutRest('530px')};
  color: ${theme('article.digest')};
  margin-top: 6px;
  margin-bottom: 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`
