import type { TActive, TColor } from '@/spec'

import styled, { css, rainbow, theme } from '@/css'

import LockSVG from '@/icons/Lock'
import ArrowSVG from '@/icons/Arrow'
import RefreshSVG from '@/icons/Refresh'
import MoreSVG from '@/icons/menu/MoreL'
import StarSVG from '@/icons/Star5'

export const Header = styled.div`
  ${css.row()};
  width: 100%;
  display: flex;
  padding: 8px 20px 0 12px;
  padding-left: 16px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 36px;
  background: ${theme('alphaBg')};
`
export const Tab = styled.div`
  ${css.row('align-center')};
  flex-basis: 218px;
  background: ${theme('grey.middle')};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('grey.middle')};
  height: 29px;
  min-width: 0;
  position: relative;
  margin: 0 5px;
  font-size: 0;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  &:before {
    content: "";
    border-top-left-radius: 8px;
    position: absolute;
    z-index: 10;
    align-self: flex-start;
    height: 28px;
    width: 16px;
    background: ${theme('grey.middle')};
    border-bottom: 1px solid;
    border-bottom-color: ${theme('grey.middle')};
    left: 0;
    transform: skewx(-25deg);
    transform-origin: left top;
  }

  &:after {
    content: "";
    border-top-right-radius: 8px;
    position: absolute;
    width: 16px;
    z-index: 10;
    align-self: flex-start;
    height: 28px;
    background: ${theme('grey.middle')};
    border-bottom: 1px solid;
    border-bottom-color: ${theme('grey.middle')};

    right: 0;
    transform: skewx(25deg);
    transform-origin: right top;
  }
`
export const TabContent = styled.div`
  color: ${theme('article.title')};
  opacity: 0.8;
  z-index: 100;
  flex-grow: 1;
  padding-left: 8px;
  font-size: 12.6px;
  line-height: 28px;
  cursor: default;
  max-width: 200px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
`
export const AddressBar = styled.div`
  width: 100%;
  ${css.row('align-center')};
  background: ${theme('grey.middle')};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('grey.middle')};
  padding-left: 4px;
  padding-right: 4px;
  height: 38px;
`
export const ToolbarWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 10px;
  margin-left: 14px;
  margin-right: 10px;
`
export const BackIcon = styled(ArrowSVG)`
  ${css.size(13)};
  fill: ${theme('hint')};
  opacity: 0.8;
`
export const ForwardIcon = styled(ArrowSVG)`
  ${css.size(13)};
  fill: ${theme('hint')};
  transform: rotate(180deg);
  opacity: 1;
`
export const RefreshIcon = styled(RefreshSVG)`
  ${css.size(13)};
  fill: ${theme('hint')};
`
export const LockIcon = styled(LockSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
  margin-top: 1px;
  margin-left: 4px;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(15)};
  fill: ${theme('hint')};
  margin-top: 1px;
`
export const StarIcon = styled(StarSVG)<TColor>`
  ${css.size(13)};
  fill: ${({ $color }) => rainbow($color)};
  margin-top: 2px;
  opacity: 0.8;
`
export const Form = styled.form`
  ${css.row('align-center')};
  flex-grow: 1;
  background: ${theme('htmlBg')};
  height: 28px;
  border-radius: 15px;
  margin-left: 4px;
  margin-right: 2px;
  padding-left: 5px;
`
export const Input = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  border: none;
  width: 100%;
  padding: 0 8px;
  font-size: 14px;
`
type TSubDomain = { $colors: string[] }
export const SubDomain = styled.div<TSubDomain>`
  background: ${({ $colors }) => `linear-gradient(to right, ${$colors[0]}, ${$colors[1]})`};
  font-weight: 550;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const Slash = styled.div`
  display: inline-block;
  margin-left: 2px;
  margin-right: 1px;
  font-size: 10px;
  margin-top: 1px;
  color: ${theme('hint')};
`
export const ThreadPath = styled.div<TActive>`
  ${css.row('align-center')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`
export const ThreadText = styled.div`
  color: ${theme('article.title')};
  opacity: 1;
  margin-top: -1px;
`
