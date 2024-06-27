import { ARTICLE_CAT } from '~/const/gtd'

import type { TColor } from '~/spec'
import styled, { css, theme, rainbow, rainbowLight } from '~/css'
import { COLOR_NAME } from '~/const/colors'

import LightSVG from '~/icons/Light'
import BugSVG from '~/icons/Bug'
import QuestionSVG from '~/icons/Question'
import DiscussSVG from '~/icons/Discuss'
import ToolSVG from '~/icons/Tool'

import PinSVG from '~/icons/Pin'
import TagSVG from '~/icons/HashTag'
import TargetSVG from '~/icons/TargetBold'
import ClipSVG from '~/icons/Clip'

type TWrapper = { $longer?: boolean } & TColor
export const Wrapper = styled.div<TWrapper>`
  position: relative;
  ${css.column()};
  width: 150px;
  height: ${({ $longer }) => ($longer ? '165px' : '140px')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 20px;
  background-color: ${theme('htmlBg')};
  box-shadow: rgba(0, 0, 0, 0.06) 0px 10px 50px;
  padding: 6px;
  padding-top: 3px;
  padding-bottom: 6px;
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${({ $color }) => rainbowLight($color)};

    z-index: 0;
    border-radius: 16px;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px solid;
    border-color: ${({ $color }) => rainbow($color)};
    border-radius: 16px;
    opacity: ${({ $color }) => ($color === COLOR_NAME.BLACK ? 0.06 : 0.12)};
  }
`
export const Header = styled.div`
  ${css.row('align-center')};
  padding: 0 10px;
  padding-bottom: 3px;
  height: 35px;
  border-radius: 10px;
  opacity: 0.68;
  filter: saturate(0.8);
  z-index: 2;
`
export const Text = styled.div<TColor>`
  color: ${({ $color }) => $color || theme('article.digest')};
  font-size: 13px;
  margin-left: 4px;
`
const catCommonIcon = (comp) => {
  return styled(comp)<TColor>`
    ${css.size(12)};
    fill: ${({ $color }) => $color};
    margin-right: 2px;
  `
}
export const Icon = {
  [ARTICLE_CAT.FEATURE]: catCommonIcon(LightSVG),
  [ARTICLE_CAT.BUG]: styled(catCommonIcon(BugSVG))`
    margin-top: -2px;
  `,
  [ARTICLE_CAT.QUESTION]: catCommonIcon(QuestionSVG),
  [ARTICLE_CAT.OTHER]: styled(catCommonIcon(DiscussSVG))`
    margin-left: 1px;
    margin-top: 1px;
    opacity: 0.8;
  `,
  DEFAULT: styled(catCommonIcon(ToolSVG))`
    ${css.size(9)};
    fill: ${theme('article.digest')};
  `,
}

const attachCommonIcon = (comp) => {
  return styled(comp)<TColor>`
    ${css.size(15)};
    position: absolute;
    right: 15px;
    top: -6px;
    fill: ${({ $color }) => $color};
    opacity: 0.3;
  `
}

export const AttachIcon = {
  Pin: styled(attachCommonIcon(PinSVG))`
    ${css.size(18)};
    right: 10px;
    transform: rotate(20deg);
  `,
  Tag: styled(attachCommonIcon(TagSVG))`
    transform: rotate(20deg);
  `,
  Target: styled(attachCommonIcon(TargetSVG))`
    opacity: 0.4;
  `,
  Clip: styled(attachCommonIcon(ClipSVG))`
    ${css.size(17)};
    top: -7px;
    transform: rotate(-30deg);
  `,
}

export const Content = styled.div<{ $bg: string }>`
  ${css.column()};
  width: 100%;
  height: 90%;
  border-radius: 15px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 8px;
  background: ${theme('alphaBg2')};
  z-index: 3;
`
type TBar = { $short?: boolean; $bg: string }
export const Bar = styled.div<TBar>`
  width: ${({ $short }) => ($short ? '40px' : '80px')};
  height: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ $bg }) => $bg || theme('hoverBg')};
`
export const Footer = styled.div`
  ${css.row('align-both')};
`
type TLeftDot = { $bg?: string }
export const LeftDot = styled.div<TLeftDot>`
  ${css.circle(6)};
  background: ${({ $bg }) => $bg || theme('article.digest')};
  opacity: 0.7;
`
type TLeftInfo = { $bottom: string }
export const LeftInfo = styled.div<TLeftInfo>`
  position: absolute;
  bottom: ${({ $bottom }) => $bottom || '20px'};
  left: -3px;
  ${css.row('align-center')};
  line-height: 18px;
`
type TRightDot = { $middle: boolean; $bg: string }
export const RightDot = styled.div<TRightDot>`
  ${css.circle(6)};
  position: absolute;
  bottom: ${({ $middle }) => ($middle ? '38px' : '14px')};
  right: -3px;
  background: ${({ $bg }) => $bg || theme('article.title')};
  opacity: 0.7;
`
