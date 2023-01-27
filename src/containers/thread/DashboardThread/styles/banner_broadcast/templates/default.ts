import styled from 'styled-components'
import { includes } from 'ramda'

import type { TActive, TColorName } from '@/spec'
import { COLORS, COLOR_NAME } from '@/constant/colors'

import css, { theme } from '@/utils/css'
import { lighten, darken } from '@/utils/color'

import { Divider } from '@/widgets/Common'

import CrossSVG from '@/icons/CloseCross'
import ArrowSVG from '@/icons/Arrow'
import NotifySVG from '@/icons/Trumpet'

import { TemplateBlock } from '.'

type TBar = { long: number; thin?: boolean; bold?: boolean }
export const Bar = styled.div<TBar>`
  width: ${({ long }) => `${long || 20}%`};
  height: ${({ thin }) => (thin ? '4px' : '12px;')};
  background: ${({ thin, bold }) => {
    if (bold) return theme('article.title')

    return thin ? theme('article.digest') : theme('article.title')
  }};
  z-index: 3;
  border-radius: 5px;
  opacity: ${({ thin, bold }) => {
    if (bold) return 0.8

    return thin ? 0.6 : 1
  }};
`

export const Wrapper = styled(TemplateBlock)`
  ${css.flex('align-start', 'justify-between')};
  height: 100px !important;
  background: ${({ $active }) => ($active ? theme('alphaBg') : 'transparent')};
`

export const Row = styled.div`
  ${css.flex('align-center')};
`

type TNotifyBar = { center?: boolean; bg: TColorName } & TActive
export const NotifyBar = styled.div<TNotifyBar>`
  ${css.flex('align-center')};
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  width: calc(100% + 2px);
  height: 20px;
  margin-top: -1px;
  margin-left: -1px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  background: ${({ bg }) => COLORS[bg]};
  padding: 0 20px;
  padding-bottom: 2px;
`
export const NotifyDesc = styled.div`
  color: white;
  font-size: 8px;
  font-weight: 600;
`
export const NotifySolidLink = styled.div<{ bg: TColorName }>`
  background: ${({ bg }) =>
    includes(bg, [COLOR_NAME.BLACK]) ? lighten(COLORS[bg], 6) : darken(COLORS[bg], 10)};

  color: white;
  border-radius: 5px;
  font-size: 6px;
  color: ${'article.title'};
  font-weight: bold;
  padding: 0 4px;
`
export const NotifyIcon = styled(NotifySVG)`
  ${css.size(12)};
  fill: white;
  margin-right: 6px;
`
export const CrossIcon = styled(CrossSVG)`
  fill: white;
  ${css.size(12)};
  opacity: 0.8;
  margin-right: -3px;
`
export const ArrowIcon = styled(ArrowSVG)`
  fill: white;
  ${css.size(8)};
  opacity: 0.8;
  transform: rotate(180deg);
`
export const Main = styled.div`
  ${css.flex()};
  padding: 0 20px;
  margin-top: 25px;
`
export const ListsWrapper = styled.div`
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
  width: 85%;
`
export const TagssWrapper = styled.div`
  width: 15%;
  margin-left: 20px;
`
export const ExampleBtn = styled.div`
  display: inline-block;
`
export const Layout = styled.div`
  ${css.flexColumn('align-both')};
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`

export const DividerLine = styled(Divider)`
  opacity: 0.8;
`
export const NotifyTextBar = styled(Bar)`
  width: ${({ long }) => `${long || 30}px`};
  background: white;
`
export const BgWrapper = styled.div`
  ${css.flex('align-center')};
  font-size: 12px;
`
export const BgLabel = styled.div<{ bg: TColorName }>`
  width: 44px;
  height: 24px;
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${({ bg }) => COLORS[bg]};
  border-radius: 6px;
  cursor: pointer;
  margin-left: 15px;
`
export const TheColor = styled.div<{ color: TColorName }>`
  width: 38px;
  height: 18px;
  border-radius: 6px;
  background-color: ${({ color }) => COLORS[color]};
`
