import styled from 'styled-components'

import css, { theme } from '@/css'

import ShareSVG from '@/icons/Share'
import GoodSVG from '@/icons/EmojiGood'
import SosoSVG from '@/icons/EmojiSoSo'
import BadSVG from '@/icons/EmojiBad'

import { Bar as BarBase } from '@/widgets/Common'

import ArrowSimple from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  margin-left: -40px;
  z-index: 10;
  width: 368px;
  height: 480px;
  gap: 10px;
  border-radius: 5px;
  background: ${theme('htmlBg')};
  box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    right: 2px;
    width: 370px;
    z-index: -1;
    height: 50%;
    border: 1px solid;
    border-color: ${theme('divider')};
    background: ${theme('htmlBg')};
    border-radius: 6px;
    transform: rotate(-2deg);
    box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
  }
`
export const InnerWrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  height: 100%;
  z-index: 10;
  background: ${theme('htmlBg')};
  padding: 15px 30px;
  padding-top: 25px;
  border: 1px solid;
  border-radius: 5px;
  border-color: ${theme('divider')};
`
export const InnerContent = styled.div`
  ${css.column()};
  width: 260px;
  position: relative;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(12)};
  fill: ${theme('hint')};
  opacity: 0.6;
  position: absolute;
  top: 6px;
  right: -1px;
`

const ArrowIcon = styled(ArrowSimple)`
  ${css.size(18)};
  fill: ${theme('hint')};
`
export const LeftArrowIcon = styled(ArrowIcon)``
export const RightArrowIcon = styled(ArrowIcon)`
  transform: rotate(180deg);
`
export const Header = styled.div`
  ${css.column()};
  width: 260px;
  margin-top: 25px;
  margin-bottom: 10px;
`
export const CoverWrappers = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-top: 18px;
  width: 260px;
  height: 110px;
  margin-bottom: 12px;
`
type TCover = { $fromBg: string; $toBg: string }
export const Cover = styled.div<TCover>`
  ${css.row('align-both')};
  width: 49%;
  height: 100%;
  border-radius: 8px;

  background: ${theme('rainbow.cyan')};

  background: ${({ $fromBg, $toBg }) => {
    return `linear-gradient(180deg, ${$fromBg} 0%,  ${$toBg} 100%)`
    // return `radial-gradient(circle, ${$toBg} 0%, ${$fromBg} 90%)`
  }};

  backdrop-filter: blur(5px);
  opacity: 0.3;
`
export const CoverTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${theme('button.fg')};
  margin-bottom: 50px;
`

export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-weight: 500;
  font-size: 16px;
`
export const Bar = styled(BarBase)`
  background: ${theme('hint')};
`
export const Previous = styled.div`
  opacity: 0.2;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 40px;
  width: 100%;
`
export const ArrowText = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
`
export const Feedback = styled.div`
  ${css.row('align-both')};
  gap: 0 18px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  padding: 8px 14px;
  box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
  filter: saturate(0.7);
  margin-top: 25px;
  width: 132px;
`
export const GoodIcon = styled(GoodSVG)`
  ${css.size(20)};
`
export const SodoIcon = styled(SosoSVG)`
  ${css.size(20)};
`
export const BadIcon = styled(BadSVG)`
  ${css.size(20)};
`

export const CommentDot = styled.div`
  position: absolute;
  right: 120px;
  bottom: 228px;
  ${css.circle(14)};
  ${css.row('align-both')};
  background: ${theme('rainbow.cyanBg')};
  z-index: 100;
`
export const CommentDotSolid = styled.div`
  ${css.circle(8)};
  background: ${theme('rainbow.cyan')};
  box-shadow: ${theme('button.boxShadow')};
`
