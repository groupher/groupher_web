import { FC } from 'react'
import styled from 'styled-components'

import type { TColor, TActive } from '@/spec'
import { ARTICLE_CAT } from '@/constant/gtd'
import css, { rainbow, theme } from '@/css'
import PinSVG from '@/icons/Pin'
//
import EditSVG from '@/icons/EditPen'
import CategorySVG from '@/icons/Category'
import SlugSVG from '@/icons/Slug'
import MergeSVG from '@/icons/Merge'
import ArchivedSVG from '@/icons/Archived'
import DeleteSVG from '@/icons/Trash'
import LockSVG from '@/icons/LockLight'
import ArrowSVG from '@/icons/ArrowSimple'

import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import DiscussSVG from '@/icons/Discuss'

import TodoSVG from '@/icons/GtdTodo'
import WipSVG from '@/icons/GtdWip'
import DoneSVG from '@/icons/GtdDone'
// import RejectSVG from '@/icons/Reject'
// import OtherSVG from '@/icons/menu/Feedback'

import { MenuItem } from './menu'

const commonIcon = (comp): FC => {
  return styled(comp)`
    ${css.size(13)};
    fill: ${theme('article.digest')};
    margin-right: 6px;

    ${MenuItem}:hover & {
      fill: ${theme('article.title')};
    }
  `
}

type TGTDItem = TActive & TColor

export const Icon = {
  Arrow: styled(commonIcon(ArrowSVG))`
    transform: rotate(180deg);
    ${css.size(15)};
    opacity: 0.5;

    ${MenuItem}:hover & {
      opacity: 1;
    }
  `,
  Edit: commonIcon(EditSVG),
  Category: styled(commonIcon(CategorySVG))`
    ${css.size(12)};
    margin-left: 1px;
    margin-right: 7px;
    margin-top: 1px;
  `,
  // Light: commonIcon(LightSVG),
  Todo: styled(commonIcon(TodoSVG))<TGTDItem>`
    fill: ${({ $color, $active }) => ($active ? rainbow($color) : theme('article.digest'))};
  `,
  Wip: styled(commonIcon(WipSVG))<TGTDItem>`
    fill: ${({ $color, $active }) => ($active ? rainbow($color) : theme('article.digest'))};
    ${css.size(14)};
  `,
  Done: styled(commonIcon(DoneSVG))<TGTDItem>`
    fill: ${({ $color, $active }) => ($active ? rainbow($color) : theme('article.digest'))};
    margin-left: 1px;
  `,
  Slug: commonIcon(SlugSVG),
  Archived: commonIcon(ArchivedSVG),
  Merge: commonIcon(MergeSVG),
  Lock: commonIcon(LockSVG),
  Delete: styled(commonIcon(DeleteSVG))`
    ${css.size(14)};
    margin-top: 1px;
    ${MenuItem}:hover & {
      fill: ${theme('rainbow.red')};
    }
  `,
  Pin: styled(commonIcon(PinSVG))`
    margin-top: 2px;
  `,

  [ARTICLE_CAT.FEATURE]: commonIcon(LightSVG),
  [ARTICLE_CAT.QUESTION]: commonIcon(QuestionSVG),
  [ARTICLE_CAT.BUG]: commonIcon(BugSVG),
  [ARTICLE_CAT.OTHER]: styled(commonIcon(DiscussSVG))`
    ${css.size(12)};
    margin-left: 1px;
  `,
}

export const holder = 1
