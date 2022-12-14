import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { TemplateBlock } from '.'

export { SocialIcon } from '.'

export const Wrapper = styled(TemplateBlock)`
  ${css.flex('align-center', 'justify-between')};
  height: 60px;
  padding: 0 20px;
`
export const LeftWrapper = styled.div`
  ${css.flex('align-center')};
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

export const RightWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
`
