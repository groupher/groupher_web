import styled from 'styled-components'

import css, { theme } from '@/css'

import type { TSubMenu } from '../spec'
import { getSubMenuWidth } from './metric'

type TWrapper = { subMenuType: TSubMenu }

export const Wrapper = styled.div<TWrapper>`
  padding: 8px;
  padding-right: 4px;
  width: ${({ subMenuType }) => getSubMenuWidth(subMenuType)};
  transition: all 0.1s;
`
export const MenuItem = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  height: 30px;
  width: 100%;
  padding: 2px 8px;
  padding-right: 0;
  border-radius: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.05s;
`
export const DangerMenuItem = styled(MenuItem)`
  &:hover {
    background: ${theme('rainbow.redBg')};
    color: ${theme('rainbow.red')};
    cursor: pointer;
  }
`

export const ItemDivider = styled.div`
  height: 1px;
  width: 100%;
  background: ${theme('popover.borderColor')};
  margin-top: 10px;
  margin-bottom: 10px;
`
