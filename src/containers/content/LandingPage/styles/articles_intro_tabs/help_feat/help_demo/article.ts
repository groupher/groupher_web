import styled from 'styled-components'

import css, { theme } from '@/css'

import ShareSVG from '@/icons/Share'
import { Bar as BarBase } from '@/widgets/Common'

import ArrowSimple from '@/icons/ArrowSimple'

export const Wrapper = styled.div`
  background: ${theme('htmlBg')};
  ${css.column('align-center')};
  margin-left: -40px;
  z-index: 10;
  width: 368px;
  height: 420px;
  gap: 10px;
  padding: 30px 15px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 0px 3px 29px 0px;
`
export const InnerContent = styled.div`
  ${css.column()};
  width: 260px;
  position: relative;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(12)};
  fill: ${theme('rainbow.cyan')};
  position: absolute;
  top: 11px;
  right: -1px;
`

export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 20px;
  width: 100%;
  width: 270px;
`
const ArrowIcon = styled(ArrowSimple)`
  ${css.size(18)};
  fill: ${theme('rainbow.cyan')};
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
export const Cover = styled.div`
  width: 260px;
  height: 140px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;

  background: ${theme('rainbow.cyanBg')};
  backdrop-filter: blur(5px);

  opacity: 0.3;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('rainbow.cyan')};
  font-weight: 600;
  font-size: 12px;
`
export const GreyTitle = styled(Title)`
  color: ${theme('article.digest')};
`
export const TagsWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
`

export const Divider = styled.div`
  width: 300px;
  height: 1px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(0.35turn, transparent, #b6cc97, #b6cc97, #b6cc97, transparent);

  border-image-slice: 1;

  margin-top: 30px;

  opacity: 0.5;
`

export const Bar = styled(BarBase)`
  background: ${theme('rainbow.cyan')};
`

export const GreyBar = styled(BarBase)`
  background: ${theme('article.digest')};
`
export const Previous = styled.div`
  opacity: 0.2;
`
