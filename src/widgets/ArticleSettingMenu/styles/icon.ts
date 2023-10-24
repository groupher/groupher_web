import { FC } from 'react'
import styled from 'styled-components'

import css, { theme } from '@/css'

import PinSVG from '@/icons/Pin'

//
import EditSVG from '@/icons/EditPen'
import LightSVG from '@/icons/ColorLight'
import TodoSVG from '@/icons/GtdTodo'
import SlugSVG from '@/icons/Slug'
import MergeSVG from '@/icons/Merge'
import ArchivedSVG from '@/icons/Archived'
import DeleteSVG from '@/icons/Trash'
import LockSVG from '@/icons/LockLight'
import ArrowSVG from '@/icons/ArrowSimple'
// import QuestionSVG from '@/icons/Question'
// import BugSVG from '@/icons/ColorBug'
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
  Light: commonIcon(LightSVG),
  Todo: commonIcon(TodoSVG),
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
}

export const holder = 1
