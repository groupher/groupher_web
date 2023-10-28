import styled from 'styled-components'

import type { TActive, TColor } from '@/spec'
import css, { theme, rainbow } from '@/css'
// import Img from '@/Img'

import LinkOutSVG from '@/icons/LinkOut'

import KanbanSVG from '@/icons/Kanban'
import HomeSVG from '@/icons/Home'
import DiscussSVG from '@/icons/Discuss'
import TadaSVG from '@/icons/TadaRaw'
import InfoSVG from '@/icons/Info'
import GuideSVG from '@/icons/Book'

import { MenuItem } from './main_menu'

export const Wrapper = styled.div`
  ${css.size(16)};
  ${css.row('align-both')};
  opacity: 0.6;
`

type TIcon = TActive & TColor

const commonIcon = (SVG, size = 13) => {
  return styled(SVG)<TIcon>`
    ${css.size(size)};
    fill: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};

    ${MenuItem}:hover & {
      fill: ${({ $color }) => rainbow($color)};
    }
  `
}

export const Icon = {
  Home: commonIcon(HomeSVG),
  Tada: commonIcon(TadaSVG),
  Discuss: styled(commonIcon(DiscussSVG))`
    margin-top: 1px;
  `,
  Kanban: styled(commonIcon(KanbanSVG, 16))`
    transform: rotate(180deg);
  `,
  Guide: commonIcon(GuideSVG),
  Info: styled(commonIcon(InfoSVG, 13))`
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
