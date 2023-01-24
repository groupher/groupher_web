import styled from 'styled-components'
import Link from 'next/link'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
// import Img from '@/Img'

import KanbanSVG from '@/icons/Kanban'
import HomeSVG from '@/icons/Home'
import DiscussSVG from '@/icons/Discuss'
import TadaSVG from '@/icons/Tada'
import InfoSVG from '@/icons/Info'
import GuideSVG from '@/icons/Guide'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 100%;
  margin-top: 10px;
  padding: 5px 40px;
`
export const MenuItem = styled(Link)<TActive>`
  ${css.flex('align-center')};
  width: calc(100% - 5px);
  text-decoration: none;
  height: 30px;
  margin-top: 3px;
  margin-bottom: 3px;
  background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')};
  /* background: ${({ $active }) => ($active ? theme('article.title') : 'transparent')}; */
  border-radius: 10px;
  margin-left: -5px;
  padding-left: 10px;

  &:hover {
    background: ${theme('hoverBg')};
    text-decoration: none;
    cursor: pointer;
  }
`

export const IconWrapper = styled.div`
  ${css.size(16)};
  ${css.flex('align-both')};
`
export const HomeIcon = styled(HomeSVG)<TActive>`
  ${css.size(13)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`
export const DiscussIcon = styled(DiscussSVG)<TActive>`
  ${css.size(14)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`
export const KanbanIcon = styled(KanbanSVG)<TActive>`
  ${css.size(16)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  transform: rotate(180deg);
`
export const GuideIcon = styled(GuideSVG)<TActive>`
  ${css.size(13)};
  margin-left: -1px;
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`
export const InfoIcon = styled(InfoSVG)<TActive>`
  ${css.size(13)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`
export const TadaIcon = styled(TadaSVG)<TActive>`
  ${css.size(15)};
  fill: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`

export const MenuTitle = styled.div<TActive>`
  color: ${theme('article.title')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  font-size: 14px;
  margin-left: 10px;
`
