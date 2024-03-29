import styled, { css, theme } from '@/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.row('align-center', 'justify-between')};
  height: 60px;
  padding: 0 20px;
  background: ${theme('alphaBg')};
`
export const LeftWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 10px;
`
export const BrandLogo = styled.div`
  ${css.circle(18)};
  background: ${theme('divider')};
`
export const BrandText = styled.div`
  color: ${theme('article.title')};
`

export const CenterWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 20px;
`

export const LinkItem = styled.a`
  ${css.cutRest('50px')};
  color: ${theme('article.digest')};
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
    text-decoration: underline;
  }
`

export const RightWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 10px;
`
