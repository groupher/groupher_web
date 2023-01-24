import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import KanbanSVG from '@/icons/Kanban'
import HomeSVG from '@/icons/Home'
import DiscussSVG from '@/icons/Discuss'
import TadaSVG from '@/icons/Tada'
import InfoSVG from '@/icons/Info'
import GuideSVG from '@/icons/Guide'

export const Menu = styled.div`
  ${css.flex('align-center')};
`
export const MenuItem = styled.div`
  color: ${theme('article.title')};
  margin-left: 6px;
`
export const IconWrapper = styled.div`
  ${css.size(16)};
  ${css.flex('align-both')};
`
export const HomeIcon = styled(HomeSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
export const DiscussIcon = styled(DiscussSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
`
export const KanbanIcon = styled(KanbanSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  transform: rotate(180deg);
`
export const GuideIcon = styled(GuideSVG)`
  ${css.size(13)};
  margin-left: -1px;
  fill: ${theme('article.digest')};
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
`
export const TadaIcon = styled(TadaSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
`

export const Icon = {
  Home: HomeIcon,
  Discuss: DiscussIcon,
  Kanban: KanbanIcon,
  Tada: TadaIcon,
  Info: InfoIcon,
}
