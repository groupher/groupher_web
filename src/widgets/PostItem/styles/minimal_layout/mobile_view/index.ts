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
  width: 30px;
  margin-right: 18px;
  transform: scale(0.8);
`
export const DigestWrapper = styled.div`
  ${css.cutRest('210px')};
  color: ${theme('article.digest')};
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`
