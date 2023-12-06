import styled from 'styled-components'

import ArchSVG from '@/icons/Arch'
import RotateSVG from '@/icons/Rotate'
import ShadowSVG from '@/icons/Shadow'
import BlocksSVG from '@/icons/Blocks'
import LightSVG from '@/icons/FlashLight'
import RatioSVG from '@/icons/Ratio'
import SizeSVG from '@/icons/ImageSize'

import { Bar as BarBase } from '@/widgets/Common'
import css, { theme } from '@/css'

export const Toolbox = styled.div`
  ${css.row('align-both')};
  gap: 0 3px;
  width: 276px;
  height: 38px;
  border-radius: 5px;
  background: ${theme('alphaBg')};
  margin-top: -14px;
  z-index: 10;
  box-shadow: rgb(108 108 108 / 16%) 0px 3px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`
export const ArchIcon = styled(ArchSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const RotateIcon = styled(RotateSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const RatioIcon = styled(RatioSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const ShadowIcon = styled(ShadowSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const SizeIcon = styled(SizeSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const BlocksIcon = styled(BlocksSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const LightIcon = styled(LightSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
`
export const ColorBall = styled.div`
  ${css.circle(12)};
  background: ${theme('rainbow.redBg')};
  filter: saturate(1.2);
`
export const ToolItem = styled.div`
  background: ${theme('htmlBg')};
  ${css.size(30)};
  ${css.column('align-both')};
  box-shadow: ${theme('button.boxShadow')};
  padding: 2px;
  border-radius: 4px;
`
export const ToolName = styled.div`
  font-size: 9px;
  color: ${theme('hint')};
  margin-top: 3px;
`
//
export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 300px;
  height: 300px;
  z-index: 2;
  background: ${theme('htmlBg')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;

  position: relative;
  margin-left: -80px;
  margin-top: -20px;
`
export const Header = styled.div`
  ${css.column()};
  width: 200px;
  margin-top: 25px;
  margin-bottom: 10px;
`
export const Cover = styled.div`
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 5px;

  background: ${theme('rainbow.redBg')};
  border: 1px dotted;
  border-color: ${theme('rainbow.redBg')};
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-weight: 500;
  font-size: 16px;
`
export const Version = styled.span`
  color: ${theme('hint')};
  opacity: 0.8;
  font-size: 15px;
  margin-left: 8px;
`
export const TagsWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 2px;
  color: ${theme('hint')};
  gap: 0 8px;
`
export const TagItem = styled.div`
  ${css.row('align-center')};
  font-size: 12px;
`
export const Content = styled.div`
  ${css.column()};
  margin-top: 15px;
  width: 200px;
  gap: 10px;
`
export const Footer = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 20px;
  width: 200px;
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
