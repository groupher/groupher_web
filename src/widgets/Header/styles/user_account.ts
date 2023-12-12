import type { TTestable } from '@/spec'
import styled, { css, theme } from '@/css'

import UserSVG from '@/icons/User'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.media.mobile`
    padding: 0;
    padding-right: 10px;
  `};
`
export const PopMenu = styled.div`
  ${css.column()};
`
export const MenuItem = styled.div`
  padding: 4px 13px;
  color: ${theme('article.title')};
  opacity: 0.9;
  &:hover {
    background: #113744;
    opacity: 1;
    cursor: pointer;
  }
`
export const MenuLink = styled.a`
  padding: 4px 13px;
  color: ${theme('article.title')};
  font-size: 13px;
  text-decoration: none;
  &:hover {
    background: #113744;
    opacity: 1;
    cursor: pointer;
    text-decoration: underline;
  }
`
export const LoginBadge = styled.div`
  padding: 7px 13px;
`
export const LoginDesc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
`
export const LoginName = styled.div`
  font-size: 12px;
  color: ${theme('article.title')};
  font-weight: bold;
`
export const LogoutItem = styled.div`
  padding: 5px 13px;
  padding-bottom: 0;
  color: ${theme('article.title')};
  &:hover {
    color: ${theme('rainbow.red')};
    background: #113744;
    cursor: pointer;
  }
`
export const MenuDivider = styled.div`
  margin-top: 3px;
  margin-bottom: 6px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('banner.numberDivider')};
`
export const AvatarIcon = styled.img`
  ${css.size(16)};
  cursor: pointer;
  border-radius: 3px;
  opacity: ${theme('avatar.opacity')};
`
export const DefaultUserIcon = styled(UserSVG)`
  fill: ${theme('header.fg')};
  ${css.size(16)};
  cursor: pointer;
  margin-right: 2px;
  opacity: 0.5;
`
export const MembershipHint = styled.div`
  letter-spacing: 2px;
  padding-top: 2px;
  padding-left: 6px;
  padding-right: 3px;
`
