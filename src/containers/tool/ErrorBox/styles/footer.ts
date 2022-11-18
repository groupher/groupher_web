import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex()};
  background: ${theme('modal.subPanel')};
  width: 100%;
  height: 60px;
  padding: 0 20px;
`
export const Selector = styled.div`
  flex-grow: 1;
`
export const Issue = styled.div`
  ${css.flex('align-center')};
  margin-right: 4px;
`
export const GithubIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
  margin-right: 5px;
  opacity: 0.8;
  ${Wrapper}:hover & {
    opacity: 1;
  }
`
export const IssueLinker = styled.a`
  color: ${theme('article.digest')};
  text-decoration: none;

  &:hover {
    cursor: pointer;
    opacity: 1;
    text-decoration: underline;
    fill: ${theme('article.digest')};
  }
`

export const Divider = styled.div`
  fill: ${theme('article.digest')};
  margin-right: 4px;
  margin-left: 4px;
`
