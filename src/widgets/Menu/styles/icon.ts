import type { FC } from 'react'

import type { TActive, TColor } from '@/spec'

import MENU from '@/const/menu'

// import AllSVG from '@/icons/menu/Dots'
import GtdTodoSVG from '@/icons/GtdTodo'
import GtdWipSVG from '@/icons/GtdWip'
import GtdDoneSVG from '@/icons/CheckBold'

// sort
import UpvoteSVG from '@/icons/Upvote'
import CommentSVG from '@/icons/Comment'
import PublishSVG from '@/icons/Publish'
import ViewSVG from '@/icons/article/Viewed'

import LightSVG from '@/icons/ColorLight'
import BugSVG from '@/icons/ColorBug'
import QuestionSVG from '@/icons/Question'
import RejectSVG from '@/icons/Reject'

import OtherSVG from '@/icons/menu/MoreL'

// import Img from '@/Img'
import styled, { css, theme, rainbow } from '@/css'
import { Item } from './list'

type TWrapper = { $noSaturate: boolean } & TActive
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-both')}
  ${css.size(16)};
  margin-right: 8px;
  /*  $active state hot work on icon's hover, put it in here instead */
  filter: ${({ $active, $noSaturate }) => {
    if ($noSaturate) return 'saturate(1)'

    return $active ? 'saturate(1)' : 'saturate(0)'
  }};
`

type TIcon = TActive & TColor & { $small: boolean }
const commonIcon = (comp): FC<TIcon> => {
  // @ts-ignore
  return styled(comp)<TIcon>`
    fill: ${({ $active, $color }) => ($active ? rainbow($color, 'article.title') : theme('hint'))};
    width: ${({ $small }) => ($small ? '12px' : '15px')};
    height: ${({ $small }) => ($small ? '12px' : '15px')};
    display: block;

    ${Item}:hover & {
      fill: ${({ $color, $active }) => ($active ? rainbow($color) : theme('hint'))};
    }
  `
}

export const ICONS = {
  [MENU.TODO]: commonIcon(GtdTodoSVG),
  [MENU.WIP]: commonIcon(GtdWipSVG),
  [MENU.DONE]: commonIcon(GtdDoneSVG),

  [MENU.PUBLISH]: styled(commonIcon(PublishSVG))`
    ${css.size(14)};
    margin-top: 1px;
  `,
  [MENU.UPVOTE]: commonIcon(UpvoteSVG),
  [MENU.VIEWS]: styled(commonIcon(ViewSVG))`
    ${css.size(12)};
    margin-left: 2px;
    margin-top: 2px;
  `,
  [MENU.COMMENT]: styled(commonIcon(CommentSVG))`
    ${css.size(12)};
    margin-left: 2px;
    margin-top: 2px;
  `,

  [MENU.FEATURE]: commonIcon(LightSVG),
  [MENU.BUG]: commonIcon(BugSVG),
  [MENU.CLOSE]: commonIcon(RejectSVG),
  [MENU.HELP]: styled(commonIcon(QuestionSVG))`
    ${css.size(14)};
    margin-top: 1px;
    margin-left: 1px;
  `,

  [MENU.OTHER]: styled(commonIcon(OtherSVG))`
    margin-left: 1px;
  `,
}
