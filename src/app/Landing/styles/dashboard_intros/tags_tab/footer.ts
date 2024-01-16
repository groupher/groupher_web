import styled, { css, theme } from '@/css'

import OptionArrowSVG from '@/icons/OptionArrow'
import HashTagSVG from '@/icons/HashTagBold'
import { WithPosition } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row()};
  height: 158px;
  width: 460px;
  padding: 18px 26px;
  padding-top: 22px;
  border: 5px solid;
  border-color: ${theme('htmlBg')};
  background: ${theme('gradientBg.green')};
  border-radius: 12px;
  position: absolute;
  bottom: 100px;
  left: 120px;
  z-index: 5;
  box-shadow: rgba(149, 157, 165, 0.2) 0px -4px 24px;
`
export const CURDLabel = styled(WithPosition)`
  ${css.row('align-both')};
  width: auto;
  padding: 0 4px;
  height: 20px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 800;
  color: #b3a373;
  background: #feeca7c2;
  transform: rotate(-3deg);
  box-shadow: rgb(215 214 210 / 20%) 4px -7px 19px;
  border: 1px solid;
  border-color: ${theme('divider')};
`
export const Left = styled.div`
  width: 50%;
`
export const Right = styled.div`
  width: 50%;
`
export const Item = styled.div`
  ${css.row('align-start')};
  height: 30px;
`
export const Label = styled.div`
  font-size: 13px;
  min-width: 76px;
  color: ${theme('article.digest')};
  opacity: 0.9;

  &:after {
    content: ":";
  }
`
export const ColorDot = styled.div`
  width: 15px;
  height: 15px;
  background: ${theme('rainbow.green')};
  opacity: 0.4;
  border-radius: 4px;
`
export const Value = styled.div`
  color: ${theme('article.title')};
  font-weight: 500;
  opacity: 0.68;
  font-size: 13px;
`
export const OptionArrowIcon = styled(OptionArrowSVG)`
  ${css.circle(11)};
  fill: ${theme('article.digest')};
  margin-top: 3px;
  margin-left: 6px;
`
export const HashTagIcon = styled(HashTagSVG)`
  ${css.circle(16)};
  fill: ${theme('rainbow.green')};
  transform: rotate(18deg);
  opacity: 0.6;
  margin-left: -1px;
  margin-top: 1px;
`
export const Slash = styled.div`
  font-size: 11px;
  color: ${theme('hint')};
  opacity: 0.8;
  margin-left: 6px;
  margin-right: 7px;
`
export const TagDot = styled.div`
  ${css.circle(10)};
  background: ${theme('rainbow.green')};
  opacity: 0.5;
  margin-top: 4px;
`
