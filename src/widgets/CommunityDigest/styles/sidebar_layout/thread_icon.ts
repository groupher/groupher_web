import styled from 'styled-components'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'
// import Img from '@/Img'

import LinkOutSVG from '@/icons/LinkOut'

import KanbanSVG from '@/icons/Kanban'
import HomeSVG from '@/icons/Home'
import DiscussSVG from '@/icons/Discuss'
import TadaSVG from '@/icons/TadaRaw'
import InfoSVG from '@/icons/Info'
import GuideSVG from '@/icons/Guide'

import { MenuItem } from './main_menu'

export const Wrapper = styled.div`
  ${css.size(16)};
  ${css.row('align-both')};
  opacity: 0.6;
  margin-top: -1px;
`

type TIcon = TActive & TPrimaryColor

const getIcon = (SVG, size = 13) => {
  return styled(SVG)<TIcon>`
    ${css.size(size)};
    fill: ${({ $active, primaryColor }) =>
      $active ? primaryTheme(primaryColor) : theme('article.digest')};

    ${MenuItem}:hover & {
      fill: ${({ primaryColor }) => primaryTheme(primaryColor)};
    }
  `
}

export const Icon = {
  Home: getIcon(HomeSVG),
  Tada: getIcon(TadaSVG),
  Discuss: styled(getIcon(DiscussSVG))`
    margin-top: 1px;
  `,
  Kanban: styled(getIcon(KanbanSVG, 16))`
    transform: rotate(180deg);
  `,
  Guide: getIcon(GuideSVG, 12),
  Info: styled(getIcon(InfoSVG, 13))`
    margin-left: 1px;
    margin-bottom: 1px;
  `,
}

export const OutLinkIcon = styled(LinkOutSVG)<TIcon>`
  fill: ${theme('article.title')};
  ${css.size(10)};
  opacity: 0;
  margin-right: 12px;
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`
