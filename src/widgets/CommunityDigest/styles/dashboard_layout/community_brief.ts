import { createGlobalStyle } from 'styled-components'
import Link from 'next/link'

import styled, { css, theme } from '~/css'

import OptionArrowSVG from '~/icons/OptionArrow'
import ArrowSVG from '~/icons/ArrowUpRight'
import DiscussSVG from '~/icons/Discuss'
import KanbanSVG from '~/icons/Kanban'
import AboutSVG from '~/icons/Info'
import GuideSVG from '~/icons/Guide'
import ChangelogSVG from '~/icons/TadaRaw'

import GithubSVG from '~/icons/Github8'
import GlobalSVG from '~/icons/social/Global'
import PlusSVG from '~/icons/PlusCircle'

import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
const BaseWrapper = styled.div`
  ${css.row('align-center')};
  transition: all 0.2s;
  width: auto;
  max-width: 140px;
  height: 32px;
  border-radius: 10px;
`
export const MenuWrapper = styled(BaseWrapper)`
  border: 1px solid;
  border-color: transparent;

  cursor: pointer;

  &:hover {
    border-color: ${theme('divider')};
  }

  ${css.media.mobile`
    width: auto;
    max-width: 150px;
  `};
`
export const OptionArrowIcon = styled(OptionArrowSVG)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  margin-right: 6px;
  opacity: 0.8;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Logo = styled(Img)`
  ${css.size(20)};
  margin-left: -1px;
`
export const Title = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  ${css.cutRest('120px')};
  margin-left: 6px;
  font-size: 15px;
  font-weight: 500;

  ${Wrapper}:hover & {
    ${css.cutRest('90px')};
  }
`
export const Slash = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-right: 6px;
  margin-left: 8px;
`
export const LogoHolder = styled(Img)`
  fill: ${theme('article.digest')};
  width: 50px;
  height: 50px;
  @media (max-height: 800px) {
    width: 40px;
    height: 40px;
  }
  opacity: 0.6;
  margin-top: 3px;
`
export const ToolPanel = styled.div`
  border: 1px solid;
  border-color: ${theme('divider')};
  padding: 5px 12px;
  width: 150px;
  min-height: 112px;
`
export const PanelItem = styled(Link)<{ $outside?: boolean }>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  width: calc(100% + 10px);
  margin-left: -5px;
  margin-top: 2px;
  margin-bottom: 2px;
  padding: 4px 8px;
  padding-right: 4px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('button.boxShadow')};
    text-decoration: ${({ $outside }) => ($outside ? 'underline' : 'none')};
    text-decoration-color: ${theme('hint')};
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};
  opacity: 0;

  ${PanelItem}:hover & {
    opacity: 0.8;
  }

  transition: all 0.2s;
`
const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(14)};
    fill: ${theme('hint')};
    margin-right: 11px;

    ${PanelItem}:hover & {
      fill: ${theme('article.title')};
    }
  `
}

export const Icon = {
  Global: commonIcon(GlobalSVG),
  Post: commonIcon(DiscussSVG),
  Kanban: styled(commonIcon(KanbanSVG))`
    transform: rotate(180deg);
  `,
  About: commonIcon(AboutSVG),
  Doc: commonIcon(GuideSVG),
  Changelog: commonIcon(ChangelogSVG),

  Github: styled(commonIcon(GithubSVG))`
    margin-left: 2px;
    margin-right: 12px;
    ${css.size(12)};
  `,
  Plus: styled(commonIcon(PlusSVG))`
    ${css.size(15)};
    margin-right: 10px;
  `,
}

export const DisableTippyJump = createGlobalStyle<{ enable: boolean }>`
  // this is for disable pop animation
  // should have no animation when navi to sub menu
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: ${({ enable }) => (enable ? 'translateY(1px) !important' : 'translateY(5px)')};
  }
`
