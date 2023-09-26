import styled from 'styled-components'
import Link from 'next/link'

import type { TActive, TPrimaryColor } from '@/spec'
import css, { theme, primaryTheme } from '@/css'
// import Img from '@/Img'

import LinkOutSVG from '@/icons/LinkOut'

import KanbanSVG from '@/icons/Kanban'
import HomeSVG from '@/icons/Home'
import DiscussSVG from '@/icons/Discuss'
import TadaSVG from '@/icons/Tada'
import InfoSVG from '@/icons/Info'
import GuideSVG from '@/icons/Guide'

export const Wrapper = styled.div`
  ${css.column()};
  width: 100%;
  margin-top: 10px;
`
export const MenuItem = styled(Link)<TActive>`
  ${css.row('align-center')};
  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};
  width: 160px;
  text-decoration: none;
  height: 32px;
  padding-left: 8px;
  margin-bottom: 3px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: ${theme('hoverBg')};
    text-decoration: none;
    cursor: pointer;
  }
`
type TMenuTitle = TActive & TPrimaryColor
export const MenuTitle = styled.div<TMenuTitle>`
  color: ${({ $active, primaryColor }) =>
    $active ? primaryTheme(primaryColor) : theme('article.digest')};
  font-weight: ${({ $active }) => ($active ? 550 : 400)};
  font-size: 13px;
  margin-left: 10px;

  ${MenuItem}:hover & {
    color: ${({ primaryColor }) => primaryTheme(primaryColor)};
  }
`
export const IconWrapper = styled.div`
  ${css.size(16)};
  ${css.row('align-both')};
`
export const HomeIcon = styled(HomeSVG)<TActive>`
  ${css.size(13)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`
export const DiscussIcon = styled(DiscussSVG)<TActive>`
  ${css.size(14)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`
export const KanbanIcon = styled(KanbanSVG)<TActive>`
  ${css.size(16)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
  transform: rotate(180deg);
`
export const GuideIcon = styled(GuideSVG)<TActive>`
  ${css.size(13)};
  margin-left: -1px;
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`
export const InfoIcon = styled(InfoSVG)<TActive>`
  ${css.size(13)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`
export const TadaIcon = styled(TadaSVG)<TActive>`
  ${css.size(15)};
  fill: ${({ $active }) => ($active ? 'white' : theme('article.digest'))};
`

export const OutLinkIcon = styled(LinkOutSVG)<TActive>`
  fill: ${theme('article.title')};
  ${css.size(10)};
  opacity: 0;
  margin-right: 12px;

  ${MenuItem}:hover & {
    opacity: 0.6;
  }
`
