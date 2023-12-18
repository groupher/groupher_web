import Img from '@/Img'
import styled, { css, theme } from '@/css'

import LightSVG from '@/icons/ColorLight'
import BugSVG from '@/icons/ColorBug'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  padding: 8px;
  padding-bottom: 10px;
  border-bottom: 1px dashed;
  border-bottom-color: ${theme('divider')};
  margin-left: 2px;

  &:hover {
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`
export const Header = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 4px;
  display: none;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
`
export const Title = styled.div`
  ${css.lineClamp(1)}
  font-size: 15px;
  color: ${theme('article.title')};
  opacity: 0.8;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.02em;
  cursor: pointer;

  ${Wrapper}:hover & {
    opacity: 1;
    margin-left: 2px;
  }
  transition: all .2s;
`
export const CatSign = styled.div`
  ${css.size(16)};
  margin-right: 10px;
  ${css.row('align-center')};
`
export const LightIcon = styled(LightSVG)`
  ${css.size(15)};
`
export const BugIcon = styled(BugSVG)`
  ${css.size(15)};
`
export const Footer = styled.div`
  ${css.row('align-center', 'justify-between')};
  line-height: 20px;
  margin-top: 5px;
  width: 100%;
  display: none;
`
export const Author = styled.div`
  ${css.row('align-center')};
`
export const Avatar = styled(Img)`
  ${css.circle(14)};
`
export const Name = styled.div`
  margin-left: 6px;
`
