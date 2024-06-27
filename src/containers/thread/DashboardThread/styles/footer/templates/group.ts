import styled, { css, theme } from '~/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.row('align-start', 'justify-between')};
  padding: 18px 20px;
  height: auto;
  min-height: 150px !important;
  background: ${theme('alphaBg')};
  transition: all 0.2s;
`
export const LeftWrapper = styled.div`
  ${css.column('align-start')};
  flex-grow: 1;
`
export const RightWrapper = styled.div`
  ${css.row()};
  gap: 0 60px;
`
export const BrandWrapper = styled.div`
  ${css.row('align-center')};
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
  ${css.column()};
  gap: 8px 0;
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
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
    text-decoration: underline;
  }
`
