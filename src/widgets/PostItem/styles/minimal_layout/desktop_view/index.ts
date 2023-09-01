import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const UpvoteWrapper = styled.div`
  width: 40px;
  margin-right: 25px;
  margin-top: 6px;
`
export const DigestWrapper = styled.div`
  ${css.cutRest('510px')};
  color: ${theme('article.digest')};
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`
