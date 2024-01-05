import { createGlobalStyle } from 'styled-components'
import Link from 'next/link'

import styled, { css, theme } from '@/css'
import OptionArrowSVG from '@/icons/OptionArrow'
import ArrowSVG from '@/icons/ArrowUpRight'
import DiscussSVG from '@/icons/Discuss'
import GithubSVG from '@/icons/Github8'
import GlobalSVG from '@/icons/social/Global'
import PlusSVG from '@/icons/PlusCircle'

import Img from '@/Img'

const BaseWrapper = styled.div`
  ${css.row('align-center')};
  transition: all 0.2s;
  width: 150px;
  max-width: 150px;
  height: 32px;
  border-radius: 10px;
  padding-left: 10px;
  margin-left: -10px;
`
export const Wrapper = styled(BaseWrapper)`
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
export const PanelWrapper = styled(BaseWrapper)`
  border: none;
  cursor: auto;
  margin-bottom: 8px;

  &:hover {
    border-color: transparent;
  }
`
export const OptionArrowIcon = styled(OptionArrowSVG)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  margin-right: 6px;
  opacity: 0;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Logo = styled(Img)`
  ${css.size(20)};
  margin-left: -1px;
`
export const Title = styled.div<{ $noMargin: boolean }>`
  color: ${theme('article.digest')};
  ${css.cutRest('120px')};
  font-size: 16px;
  margin-left: ${({ $noMargin }) => ($noMargin ? 0 : '8px')};
  font-weight: 500;

  ${Wrapper}:hover & {
    ${css.cutRest('90px')};
  }
`
export const LogoHolder = styled(Img)`
  fill: ${theme('banner.desc')};
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
  Github: styled(commonIcon(GithubSVG))`
    margin-left: 2px;
    margin-right: 12px;
    ${css.size(12)};
  `,
  Discuss: commonIcon(DiscussSVG),
  Plus: styled(commonIcon(PlusSVG))`
    ${css.size(15)};
    margin-left: 1px;
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
