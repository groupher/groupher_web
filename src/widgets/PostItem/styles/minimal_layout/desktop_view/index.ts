import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  position: relative;
`
export const Main = styled.div`
  ${css.flexColumnGrow()};
`
export const UpvoteWrapper = styled.div`
  width: 40px;
  margin-right: 10px;
  margin-left: -6px;
  margin-top: 4px;
`
export const DigestWrapper = styled.div`
  ${css.cutRest('530px')};
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
