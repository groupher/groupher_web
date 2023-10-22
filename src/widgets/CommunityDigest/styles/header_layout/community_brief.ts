import styled, { createGlobalStyle } from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'
import OptionArrowSVG from '@/icons/OptionArrow'
import ArrowSVG from '@/icons/ArrowUpRight'
import DiscussSVG from '@/icons/Discuss'
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
export const Title = styled.div`
  color: ${theme('article.digest')};
  ${css.cutRest('120px')};
  font-size: 16px;
  margin-left: 8px;
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
export const PanelItem = styled(Link)<{ outside?: boolean }>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  margin-top: 4px;
  margin-left: -5px;
  padding: 4px 10px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('hoverBg')};
    text-decoration: ${({ outside }) => (outside ? 'underline' : 'none')};
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(16)};
  fill: ${theme('hint')};
  margin-left: -2px;
  margin-right: 10px;
  transform: rotate(-90deg);

  ${PanelItem}:hover & {
    fill: ${theme('article.title')};
  }
`
export const DiscussIcon = styled(DiscussSVG)`
  ${css.size(14)};
  fill: ${theme('hint')};
  margin-left: -1px;
  margin-right: 11px;

  ${PanelItem}:hover & {
    fill: ${theme('article.title')};
  }
`

export const DisableTippyJump = createGlobalStyle`
  // this is for disable pop animation
  // should have no animation when navi to sub menu
  .tippy-box[data-placement^=bottom][data-state='visible'] {
    transform: translateY(2px) !important;
  }
`
