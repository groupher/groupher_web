import styled, { css, theme } from '@/css'

import type { TSubMenu } from '../../spec'
import { getSubMenuWidth } from '../metric'

type TWrapper = { $subMenuType: TSubMenu }

export const Wrapper = styled.div<TWrapper>`
  padding: 8px;
  padding-right: 4px;
  width: ${({ $subMenuType }) => getSubMenuWidth($subMenuType)};
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
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('button.boxShadow')};
    cursor: pointer;

    svg {
      fill: ${theme('article.title')};
    }
  }

  transition: all 0.05s;
`
export const MenuTitle = styled.div`
  ${css.cutRest('85px')};
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
