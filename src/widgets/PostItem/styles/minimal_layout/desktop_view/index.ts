import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  position: relative;
  padding: 8px 0;

  &:hover {
    cursor: pointer;
  }

  &:hover::before {
    opacity: 1;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: -16px;
    width: calc(100% + 32px);
    height: 100%;
    background: ${theme('hoverLinear')};
    border-radius: 10px;
    z-index: -1;
    opacity: 0;
  }
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
