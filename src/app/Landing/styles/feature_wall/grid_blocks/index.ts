import styled, { css, theme } from '@/css'
import type { TActive, TSpace } from '@/spec'

import EmojiSVG from '@/icons/HeartDuo'
import UserSVG from '@/icons/UserDuo'
import LaptopSVG from '@/icons/LaptopDuo'
import CloudSVG from '@/icons/CloudDuo'
import FingerPrintSVG from '@/icons/FingerPrintDuo'
import SearchSVG from '@/icons/SearchDuo'
//
import TriangleSVG from '@/icons/TriangleDuo'
import SquareSVG from '@/icons/SquareDuo'
import CircleSVG from '@/icons/CircleDuo'
import StarSVG from '@/icons/StarDuo'
import DiamandSVG from '@/icons/DiamandDuo'
import SqaureSrewSVG from '@/icons/SqaureSrewDuo'

import { WithPosition } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 1000px;
  height: auto;
  margin-bottom: 60px;
`
export const InnerWrapper = styled.div`
  ${css.rowWrap()};
  width: 100%;
  height: auto;
  position: relative;
`
type TIcon = TSpace & TActive
const commonIcon = (comp) => {
  return styled(comp)<TIcon>`
    ${css.size(15)};
    fill: ${({ $active }) => ($active ? theme('article.digest') : '#d2d2d2')};
    position: absolute;
    ${({ top }) => (top !== undefined ? `top: ${top}px;` : '')};
    ${({ left }) => (left !== undefined ? `left: ${left}px;` : '')};
    ${({ bottom }) => (bottom !== undefined ? `bottom: ${bottom}px;` : '')};
    ${({ right }) => (right !== undefined ? `right: ${right}px;` : '')};

    transform: ${({ $active }) => ($active ? 'rotate(360deg)' : '')};
    transition: all .8s;
  `
}

export const Icon = {
  Triangle: commonIcon(TriangleSVG),
  Square: commonIcon(SquareSVG),
  Circle: commonIcon(CircleSVG),
  Star: commonIcon(StarSVG),
  Diamand: commonIcon(DiamandSVG),
  SqaureSrew: commonIcon(SqaureSrewSVG),
}
export const Block = styled.div`
  ${css.column()};
  width: 33.3%;
  height: 130px;
  padding: 0 40px;
  padding-top: 5px;
`
export const UserIcon = styled(UserSVG)`
  fill: purple;
  ${css.size(24)};
  opacity: 0.3;
`
export const EmojiIcon = styled(EmojiSVG)`
  fill: tomato;
  ${css.size(24)};
  opacity: 0.5;
`
export const LaptopIcon = styled(LaptopSVG)`
  fill: #008eff;
  ${css.size(24)};
  opacity: 0.36;
`
export const CloudIcon = styled(CloudSVG)`
  fill: green;
  ${css.size(24)};
  opacity: 0.3;
`
export const SearchIcon = styled(SearchSVG)`
  fill: #2bd1d0;
  ${css.size(24)};
  opacity: 0.5;
`
export const FingerPrintIcon = styled(FingerPrintSVG)`
  fill: orange;
  ${css.size(24)};
  opacity: 0.6;
`
export const Title = styled.div`
  font-size: 15px;
  color: ${theme('article.digest')};
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 7px;
`
export const Desc = styled.div`
  font-size: 14px;
  line-height: 21px;
  color: ${theme('article.digest')};
  opacity: 0.9;
`
export const Line = styled(WithPosition)`
  width: 1px;
  height: 100%;
  background: ${theme('divider')};
`
