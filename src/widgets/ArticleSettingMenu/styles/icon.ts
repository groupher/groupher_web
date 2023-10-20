import { FC } from 'react'
import styled from 'styled-components'

import css, { theme } from '@/css'

import PinSVG from '@/icons/Pin'

//
import LightSVG from '@/icons/ColorLight'
import QuestionSVG from '@/icons/Question'
import BugSVG from '@/icons/ColorBug'
import RejectSVG from '@/icons/Reject'
import OtherSVG from '@/icons/menu/Feedback'

// import { MenuItem } from '.'

const commonIcon = (comp): FC => {
  return styled(comp)`
    ${css.size(13)};
    fill: ${theme('article.digest')};
    margin-right: 5px;
  `
}

// ${MenuItem}:hover & {
//   fill: ${theme('article.title')};
// }
export const Icon = {
  Light: commonIcon(LightSVG),
  Pin: styled(commonIcon(PinSVG))`
    margin-top: 1px;
  `,
}

export const holder = 1
