import { FC } from 'react'
import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'

import MENU from '@/constant/menu'

import AllSVG from '@/icons/menu/Dots'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/CheckBold'

import LightSVG from '@/icons/Light'
import BugSVG from '@/icons/Bug'
import QuestionSVG from '@/icons/Question'

import OtherSVG from '@/icons/menu/MoreL'

// import Img from '@/Img'
import css, { theme, primaryTheme } from '@/css'
import { Item } from './list'

export const Wrapper = styled.div`
  ${css.row('align-both')}
  ${css.size(15)};
  margin-right: 8px;
`

type TIcon = TActive & TPrimaryColor
const commonIcon = (comp): FC<TIcon> => {
  // @ts-ignore
  return styled(comp)<TIcon>`
    fill: ${({ $active, primaryColor }) => ($active ? primaryTheme(primaryColor) : theme('hint'))};
    width: ${({ $small }: { $small: boolean }) => ($small ? '12px' : '13px')};
    height: ${({ $small }) => ($small ? '12px' : '13px')};
    display: block;

    ${Item}:hover & {
      fill: ${({ primaryColor, $active }) =>
        $active ? primaryTheme(primaryColor) : theme('hint')};
    }
  `
}

export const ICONS = {
  [MENU.ALL]: styled(commonIcon(AllSVG))`
    ${css.size(15)};
    margin-left: -1px;
  `,
  [MENU.TODO]: commonIcon(GtdTodoSVG),
  [MENU.WIP]: commonIcon(GtdWipSVG),
  [MENU.DONE]: commonIcon(GtdDoneSVG),

  [MENU.FEATURE]: commonIcon(LightSVG),
  [MENU.BUG]: commonIcon(BugSVG),
  [MENU.HELP]: commonIcon(QuestionSVG),

  [MENU.OTHER]: styled(commonIcon(OtherSVG))`
    margin-left: 1px;
  `,
}
