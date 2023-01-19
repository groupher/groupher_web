import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { TemplateBlock } from '.'

export const Wrapper = styled(TemplateBlock)`
  padding: 12px 20px;
  ${css.flex('align-start', 'justify-between')};
  height: 150px !important;
  background: ${theme('alphaBg')};
`
export const LeftWrapper = styled.div`
  ${css.flexColumn()};
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
  ${css.flex('align-center')};
  gap: 0 14px;
`

export const LinkItem = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
