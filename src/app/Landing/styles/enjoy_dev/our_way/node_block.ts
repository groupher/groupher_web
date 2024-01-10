import { ARTICLE_CAT } from '@/constant/gtd'

import type { TColor } from '@/spec'
import styled, { css, theme, rainbow, rainbowLight } from '@/css'
import { COLOR_NAME } from '@/constant/colors'

import LightSVG from '@/icons/Light'
import BugSVG from '@/icons/Bug'
import QuestionSVG from '@/icons/Question'
import DiscussSVG from '@/icons/Discuss'
import ToolSVG from '@/icons/Tool'

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
    content: '';
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
    content: '';
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
  padding: 2px 10px;
  height: 35px;
  border-radius: 10px;
  opacity: 0.68;
  filter: saturate(0.8);
  z-index: 2;
`
export const Text = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color || theme('article.title')};
  font-size: 13px;
  margin-left: 4px;
`
const LightIcon = styled(LightSVG)<{ $color: string }>`
  fill: ${({ $color }) => $color || theme('article.title')};
  ${css.size(13)};
`
const DiscussIcon = styled(DiscussSVG)<{ $color: string }>`
  fill: ${({ $color }) => $color || theme('article.title')};
  ${css.size(12)};
  margin-left: 1px;
  margin-top: 1px;
  opacity: 0.8;
`
const BugIcon = styled(BugSVG)<{ $color: string }>`
  ${css.size(12)};
  fill: ${({ $color }) => $color || theme('article.title')};
  margin-right: 2px;
`
const QuestionIcon = styled(QuestionSVG)<{ $color: string }>`
  ${css.size(12)};
  fill: ${({ $color }) => $color || theme('article.title')};
  margin-right: 2px;
`

const ToolIcon = styled(ToolSVG)<{ $color: string }>`
  ${css.size(9)};
  fill: ${({ $color }) => $color || theme('article.title')};
  margin-right: 2px;
`

export const Icon = {
  [ARTICLE_CAT.FEATURE]: LightIcon,
  [ARTICLE_CAT.BUG]: BugIcon,
  [ARTICLE_CAT.QUESTION]: QuestionIcon,
  [ARTICLE_CAT.OTHER]: DiscussIcon,
  DEFAULT: ToolIcon,
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
