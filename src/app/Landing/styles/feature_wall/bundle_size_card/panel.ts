import type { TActive } from '@/spec'
import styled, { css, animate, theme } from '@/css'

import Img from '@/Img'
import LoadingGapSVG from '@/icons/LoadingGap'

import { Wrapper as ParentWrapper } from '.'

export const Wrapper = styled.div`
  padding: 15px;
  width: 256px;
  height: 500px;
  background: ${theme('htmlBg')};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  border: 1px solid;
  border-color: ${theme('rainbow.purpleBg')};
  box-shadow: ${theme('button.boxShadow')};
  border-bottom: none;
`
export const Item = styled.div<{ $opacity?: number }>`
  margin-bottom: 19px;
  opacity: ${({ $opacity }) => $opacity || 1};

  ${ParentWrapper}:hover & {
    opacity: 1;
  }
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 4px;
`
export const IconWrapper = styled.div`
  ${css.size(13)};
  ${css.row('align-both')};
  margin-right: 6px;
`
export const Icon = styled(Img)<{ $size: number }>`
  ${({ $size }) => css.size($size)};
`
export const BarTrack = styled.div`
  height: 5px;
  width: 100%;
  background: #eae9e987; // ${theme('divider')};
  border-radius: 5px;
`
type TBar = { width: string; $good?: boolean; $suck?: boolean }
export const Bar = styled.div<TBar>`
  background: ${({ $good }) => ($good ? theme('rainbow.green') : theme('hint'))};
  border-radius: 6px;
  width: ${({ width }) => width};
  height: 100%;
  opacity: 0.7;

  ${ParentWrapper}:hover & {
    background: ${({ $suck }) => ($suck ? theme('rainbow.red') : '')};
  }

  transition: all 0.1s;
  transition-delay: 0.1s;
`
export const Title = styled.div<{ $good?: boolean }>`
  color: ${({ $good }) => ($good ? theme('rainbow.green') : theme('article.title'))};
  font-weight: ${({ $good }) => ($good ? 500 : 400)};
  font-size: 13px;
`
export const LoadingIcon = styled(LoadingGapSVG)<TActive>`
  ${css.size(14)};
  margin-left: 4px;
  fill: ${theme('article.title')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.3s;
  animation: ${animate.rotate360} 1s linear infinite;
`
type TSize = { $good?: boolean; $suck?: boolean }
export const Size = styled.div<TSize>`
  color: ${({ $good }) => ($good ? theme('rainbow.green') : theme('hint'))};
  font-weight: ${({ $good }) => ($good ? 500 : 450)};
  font-size: 12px;

  ${ParentWrapper}:hover & {
    color: ${({ $suck }) => ($suck ? theme('rainbow.red') : '')};
    font-weight: ${({ $suck, $good }) => ($suck || $good ? 500 : 450)};
  }

  transition: all 0.1s;
  transition-delay: 0.1s;
`
