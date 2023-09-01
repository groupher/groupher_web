import styled from 'styled-components'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.column()};
  max-width: 300px;
  width: 100%;
  padding: 10px;
`
export const Header = styled.div`
  ${css.row()};
`
export const DiscussIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(50)};
  margin-right: 15px;
`
export const Info = styled.div`
  ${css.column()};
`
export const Title = styled.div`
  font-size: 1rem;
  color: ${theme('article.title')};
  margin-bottom: 5px;
  margin-left: -8px;
`
export const Body = styled.div`
  font-size: 0.8rem;
  color: ${theme('article.digest')};
`

export const Divider = styled.div`
  border-bottom: 1px solid;
  width: 100%;
  border-bottom-color: ${theme('article.digest')};
  opacity: 0.4;
  margin-top: 10px;
  margin-bottom: 6px;
`
export const Footer = styled.div`
  ${css.row('align-center')};
`
export const GithubIcon = styled(Img)`
  fill: ${theme('article.digest')};
  margin-left: 5px;
  margin-right: 6px;
  ${css.size(15)};
  ${Footer}:hover & {
    fill: ${theme('article.title')};
  }
  transition: color 0.2s;
`

export const IssueLink = styled.a`
  color: ${theme('banner.title')};
  ${css.cutRest('230px')};

  transition: color 0.2s;
  &:hover {
    color: ${theme('banner.title')};
    text-decoration: underline;
    cursor: pointer;
  }
  ${Footer}:hover & {
    color: ${theme('banner.title')};
    text-decoration: underline;
    cursor: pointer;
  }
`
