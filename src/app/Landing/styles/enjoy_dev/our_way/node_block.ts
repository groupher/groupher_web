import { ARTICLE_CAT } from '@/constant/gtd'

import styled, { css, theme } from '@/css'

import LightSVG from '@/icons/Light'
import BugSVG from '@/icons/Bug'
import QuestionSVG from '@/icons/Question'
import DiscussSVG from '@/icons/Discuss'
import ToolSVG from '@/icons/Tool'

type TWrapper = { color: string; longer?: boolean }
export const Wrapper = styled.div<TWrapper>`
  position: relative;
  ${css.column()};
  width: 150px;
  height: ${({ longer }) => (longer ? '165px' : '140px')};
  border: 1px solid;
  border-color: ${({ color }) => color || theme('divider')};
  border-radius: 10px;
  background-color: ${theme('htmlBg')};
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const Header = styled.div<{ bg: string }>`
  ${css.row('align-center')};
  background: ${({ bg }) => bg || theme('hoverBg')};
  padding: 2px 10px;
  height: 35px;
  border-radius: 10px;
`
export const Text = styled.div<{ color: string }>`
  color: ${({ color }) => color || theme('article.title')};
  font-weight: 500;
  font-size: 13px;
  margin-left: 4px;
`
const LightIcon = styled(LightSVG)<{ color: string }>`
  fill: ${({ color }) => color || theme('article.title')};
  ${css.size(13)};
`
const DiscussIcon = styled(DiscussSVG)<{ color: string }>`
  fill: ${({ color }) => color || theme('article.title')};
  ${css.size(12)};
  margin-left: 1px;
`
const BugIcon = styled(BugSVG)<{ color: string }>`
  ${css.size(10)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`
const QuestionIcon = styled(QuestionSVG)<{ color: string }>`
  ${css.size(12)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`

const ToolIcon = styled(ToolSVG)<{ color: string }>`
  ${css.size(9)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`

export const Icon = {
  [ARTICLE_CAT.FEATURE]: LightIcon,
  [ARTICLE_CAT.BUG]: BugIcon,
  [ARTICLE_CAT.QUESTION]: QuestionIcon,
  [ARTICLE_CAT.OTHER]: DiscussIcon,
  DEFAULT: ToolIcon,
}

export const Content = styled.div<{ bg: string }>`
  ${css.column()};
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 8px;
  background: ${({ bg }) => bg || 'white'};
`
type TBar = { short?: boolean; bg: string }
export const Bar = styled.div<TBar>`
  width: ${({ short }) => (short ? '40px' : '80px')};
  height: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${({ bg }) => bg || theme('hoverBg')};
`
export const Footer = styled.div`
  ${css.row('align-both')};
`
type TLeftDot = { bg?: string }
export const LeftDot = styled.div<TLeftDot>`
  ${css.circle(6)};
  background: ${({ bg }) => bg || theme('article.digest')};
  opacity: 0.7;
`
type TLeftInfo = { bottom: string }
export const LeftInfo = styled.div<TLeftInfo>`
  position: absolute;
  bottom: ${({ bottom }) => bottom || '20px'};
  left: -3px;
  ${css.row('align-center')};
  line-height: 18px;
`
type TRightDot = { middle: boolean; bg: string }
export const RightDot = styled.div<TRightDot>`
  ${css.circle(6)};
  position: absolute;
  bottom: ${({ middle }) => (middle ? '38px' : '14px')};
  right: -3px;
  background: ${({ bg }) => bg || theme('article.title')};
  opacity: 0.7;
`
