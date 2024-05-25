import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/const/layout'
import styled, { css, theme } from '@/css'

import SettingSVG from '@/icons/Setting'
import AddSVG from '@/icons/Add'
import LogoutSVG from '@/icons/Logout'
import CmdSVG from '@/icons/Cmd'

import Img from '@/Img'

export const Avatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(17)};
  border-radius: ${({ $avatarLayout }) => ($avatarLayout === AVATAR_LAYOUT.SQUARE ? '3px' : '100%')};
`
export const Panel = styled.div`
  width: 168px;
  padding: 8px;
`
export const BaseInfo = styled.div`
  ${css.column('align-start')};
  margin-left: 12px;
  margin-bottom: 15px;
`
export const UserName = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 500;
`
export const LoginMethod = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
`
export const MenuBar = styled.div`
  ${css.row('align-center')};
  gap: 0 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 32px;
  width: 100%;
  padding: 2px 12px;
  padding-right: 8px;
  border: 1px solid;
  border-color: transparent;
  border-radius: 6px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('shadow.xl')};
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(14)};
    fill: ${theme('article.digest')};

    ${MenuBar}:hover & {
      fill: ${theme('article.title')};
    }
  `
}

export const Icon = {
  Add: commonIcon(AddSVG),
  Cmd: commonIcon(CmdSVG),
  Logout: styled(commonIcon(LogoutSVG))`
      ${css.size(13)};
    margin-right: -1px;
  `,
  Setting: commonIcon(SettingSVG),
}
