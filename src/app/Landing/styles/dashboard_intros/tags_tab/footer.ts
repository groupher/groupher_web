import styled, { css, theme } from '@/css'

import HashTagSVG from '@/icons/HashTagBold'

export const Wrapper = styled.div`
  ${css.row()};
  height: 158px;
  width: 460px;
  padding: 18px 30px;
  border: 5px solid;
  border-color: ${theme('htmlBg')};
  background: ${theme('gradientBg.green')};
  border-radius: 12px;
  position: absolute;
  bottom: 110px;
  left: 120px;
  z-index: 5;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const Left = styled.div`
  width: 45%;
`
export const Right = styled.div`
  width: 55%;
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
