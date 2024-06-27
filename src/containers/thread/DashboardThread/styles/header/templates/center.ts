import styled, { css, theme } from '~/css'

import AccountSVG from '~/icons/Acount'

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
  margin-left: -15px;
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
  ${css.row('align-center')};
`
export const AccountIcon = styled(AccountSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-top: -2px;
`
