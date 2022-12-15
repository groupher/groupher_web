import Link from 'next/link'
import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import DotDivider from '@/widgets/DotDivider'

export const Wrapper = styled.div`
  margin-left: 10px;
  margin-top: -12px;
`
export const Extra = styled.li`
  position: relative;
  ${css.flex('align-end')};
  color: ${theme('article.info')};
  margin-top: 5px;
  font-size: 12px;
`

export const Digest = styled.div`
  ${css.cutRest('480px')};
  color: ${theme('article.digest')};
  margin-top: 4px;
  font-size: 14px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.flex('align-center')};
  margin-top: 7px;
`

export const LeftPart = styled.div`
  ${css.flex('align-center')};
`

export const CommunityLabel = styled.div`
  color: inherit;
  padding-left: 14px;
  position: relative;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  &:before {
    content: '';
    position: absolute;
    left: 1px;
    top: 3px;
    width: 6px;
    height: 11px;
    border-radius: 4px;
    background-color: #49a5a0;
  }
`
export const LabelDivider = styled.div`
  width: 1px;
  height: 8px;
  margin-left: 10px;
  margin-right: 12px;
  background-color: ${theme('article.digest')};
  transform: rotate(12deg);
`
export const AuthorName = styled(Link)<{ darker: boolean }>`
  display: block;
  color: ${theme('article.info')};
  font-size: 13px;

  text-decoration: none;

  &:hover {
    color: ${theme('article.info')};
    text-decoration: underline;
    cursor: pointer;
  }
`
export const PublishTime = styled.div`
  font-size: 11px;
`
export const Dot = styled(DotDivider)`
  background-color: ${theme('article.digest')};
  margin-right: 8px;
`
export const ArticleStateBadgeWrapper = styled.div`
  margin-left: -2px;
  /* position: absolute;
  top: 41px;
  right: -5px; */
`
