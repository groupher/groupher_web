import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.flex('align-start', 'justify-between')};
  padding: 12px 20px;
  height: auto;
  min-height: 150px !important;
  background: ${theme('alphaBg')};
  transition: all 0.2s;
`
export const LeftWrapper = styled.div`
  ${css.flexColumn('align-start')};
  flex-grow: 1;
`
export const RightWrapper = styled.div`
  ${css.flex()};
  gap: 0 60px;
`
export const BrandWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
`
export const BrandLogo = styled.div`
  ${css.circle(13)};
  background: ${theme('divider')};
`
export const BrandText = styled.div`
  color: ${theme('article.title')};
`
export const Desc = styled.div`
  ${css.lineClamp(2)};
  color: ${theme('article.digest')};
  font-size: 10px;
  width: 150px;
  opacity: 0.8;
  margin-top: 4px;
`
export const CenterWrapper = styled.div`
  ${css.flexColumn()};
  gap: 5px 0;
`

export const GroupTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
`
export const LinkItem = styled.a`
  ${css.cutRest('80px')};
  color: ${theme('article.digest')};
  font-size: 11px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
    text-decoration: underline;
  }
`
