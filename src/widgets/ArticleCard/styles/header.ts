import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'
import LinkSVG from '@/icons/Link'

export const Wrapper = styled.div``

export const LinkWraper = styled.div`
  ${css.flex('align-center')};
`
export const LinkIcon = styled(LinkSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
`
export const LinkSrc = styled.a`
  ${css.cutRest('240px')};
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 3px;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.digest')};
    opacity: 1;
    cursor: pointer;
  }

  ${css.media.mobile`
    font-size: 12px;
    ${css.cutRest('100px')};
  `};
`
export const Title = styled.div`
  display: inline;
  color: ${theme('article.title')};
  font-size: 17px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }

  ${css.media.mobile`
    font-size: 14px;
    position: relative;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  `};
`
export const ExtraInfo = styled.span`
  display: inline-block;
  margin-right: 8px;
`
export const CompanyLink = styled.a`
  font-size: 16px;
  color: #139c9e;

  &:after {
    content: '';
    ${css.circle(4)};
    display: inline-block;
    background: ${theme('article.digest')};
    margin-bottom: 3px;
    margin-left: 8px;
  }

  &:hover {
    cursor: pointer;
    color: #139c9e;
    text-decoration: underline;
  }
`
