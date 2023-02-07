import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Img from '@/Img'
import LockSVG from '@/icons/Lock'

import { getPathGradient } from './metric'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  position: relative;
  width: 1080px;
  border-radius: 12px;
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
  /* box-shadow: -1px 6px 25px 5px rgb(35 35 35 / 11%); */
  margin-top: -218px;
  border-top: 1px solid;
  border-color: ${theme('divider')};

  // for brower header
  padding-top: 38px;
  background: #ffffff6e;
  z-index: 2;
`
export const BrowerHead = styled.div`
  ${css.flex('align-center', 'justify-center')};
  color: ${theme('article.digest')};
  width: 100%;
  position: absolute;
  left: 10px;
  top: 8px;
  padding-left: 8px;
`
export const AddrBar = styled.div`
  ${css.flex('align-center')};
  margin-left: -65px;
`
export const LockIcon = styled(LockSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  opacity: 0.5;
  margin-right: 4px;
`
export const AddText = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.7;
`
export const CoolText = styled.div<{ wallpaper: string }>`
  color: ${theme('article.digest')};
  background: ${({ wallpaper }) => `linear-gradient(to left, ${getPathGradient(wallpaper)})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`
export const Highlight = styled.div`
  color: ${theme('article.title')};
`
export const Dot = styled.div`
  ${css.circle(10)};
  background: ${theme('divider')};
  margin-right: 6px;
`
export const Content = styled.div`
  ${css.flex('align-both')};
  width: 100%;
  height: 700px;
  position: relative;
  overflow: hidden;
`
export const Background = styled.div<{ effect: string }>`
  ${css.flex('align-both')}
  width: 100%;
  height: 700px;
  background transparent;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;

  ${({ effect }) => effect || ''};
  will-change: transform;
  transition: all 0.3s;
`
export const Image = styled(Img)<{ hasShadow: boolean }>`
  display: block;
  width: calc(100% - 100px);
  margin-left: 50px;
  height: 701px;
  object-fit: cover;

  box-shadow: ${({ hasShadow }) =>
    hasShadow ? 'rgb(100 100 111 / 20%) 0px 7px 29px 0px;' : 'none'};

  transition: all 0.2s;
`
