import styled from 'styled-components'

import { ARTICLE_CAT } from '@/constant/gtd'

import css, { theme } from '@/utils/css'

import LightSVG from '@/icons/Light'
import BugSVG from '@/icons/Bug'
import QuestionSVG from '@/icons/Question'
import DiscussSVG from '@/icons/Discuss'
import ToolSVG from '@/icons/Tool'

type TWrapper = { color: string; longer: boolean }
export const Wrapper = styled.div<TWrapper>`
  position: relative;
  ${css.flexColumn()};
  width: 150px;
  height: ${({ longer }) => (longer ? '165px' : '140px')};
  border: 1px solid;
  border-color: ${({ color }) => color || theme('divider')};
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`
export const Header = styled.div<{ bg: string }>`
  ${css.flex('align-center')};
  background: ${({ bg }) => bg || theme('hoverBg')};
  padding: 2px 10px;
  height: 30px;
`
export const Text = styled.div<{ color: string }>`
  color: ${({ color }) => color || theme('article.title')};
  font-weight: 500;
  font-size: 13px;
  margin-left: 4px;
`
const LightIcon = styled(LightSVG)<{ color: string }>`
  fill: ${({ color }) => color || theme('article.title')};
  ${css.size(12)};
  margin-top: 1px;
`
const DiscussIcon = styled(DiscussSVG)<{ color: string }>`
  fill: ${({ color }) => color || theme('article.title')};
  ${css.size(10)};
  margin-top: 1px;
  margin-left: 1px;
`
const BugIcon = styled(BugSVG)<{ color: string }>`
  ${css.size(10)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`
const QuestionIcon = styled(QuestionSVG)<{ color: string }>`
  ${css.size(9)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`

const ToolIcon = styled(ToolSVG)<{ color: string }>`
  ${css.size(9)};
  fill: ${({ color }) => color || theme('article.title')};
  margin-right: 2px;
`

export const Icon = {
  [ARTICLE_CAT.ALL]: ToolIcon,
  [ARTICLE_CAT.FEATURE]: LightIcon,
  [ARTICLE_CAT.BUG]: BugIcon,
  [ARTICLE_CAT.QUESTION]: QuestionIcon,
  [ARTICLE_CAT.OTHER]: DiscussIcon,
}

export const Content = styled.div<{ bg: string }>`
  ${css.flexColumn()};
  width: 100%;
  height: 100%;
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
  ${css.flex('align-both')};
`
type TLeftDot = { bg?: string }
export const LeftDot = styled.div<TLeftDot>`
  ${css.circle(6)};
  background: ${({ bg }) => bg || theme('article.digest')};
`
type TLeftInfo = { bottom: string }
export const LeftInfo = styled.div<TLeftInfo>`
  position: absolute;
  bottom: ${({ bottom }) => bottom || '20px'};
  left: -3px;
  ${css.flex('align-center')};
  line-height: 18px;
`

export const LeftText = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 8px;
  opacity: 0.6;
`

type TRightDot = { middle: boolean; bg: string }
export const RightDot = styled.div<TRightDot>`
  ${css.circle(6)};
  position: absolute;
  bottom: ${({ middle }) => (middle ? '50px' : '14px')};
  right: -3px;
  background: ${({ bg }) => bg || theme('article.title')};
`
