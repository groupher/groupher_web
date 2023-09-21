import styled from 'styled-components'

import type { TTestable, TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'
import css, { theme } from '@/css'

import Img from '@/Img'
import AccountSVG from '@/icons/Acount'

export { Menu, MenuItem, Icon } from '.'

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding-left: 100px;
`

export const InnerWrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center', 'justify-between')};
`
export const MainArea = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 610px;
`
const hoverEffect = `
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const AccountAvatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(17)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
`
export const AccountIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};

  ${hoverEffect}
`
