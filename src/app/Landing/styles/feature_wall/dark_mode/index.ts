import styled, { css, theme, animate } from '@/css'

import StarSVG from '@/icons/Star'

import { BaseCard } from '..'

export const Wrapper = styled(BaseCard)`
  background: none;
  overflow: hidden;
`
export const InnerWrapper = styled(BaseCard)<{ $hovering: boolean }>`
  position: absolute;
  width: 142%;
  height: 142%;
  left: -20%;
  top: -20%;
  z-index: -1;
  transform: ${({ $hovering }) => `rotate(${$hovering ? '-180deg' : '0'})`};
  transition: all .3s;
`
export const StarIcon = styled(StarSVG)`
  fill: ${theme('rainbow.orange')};
  ${css.size(18)};
  z-index: 3;
  opacity: 0.8;
  position: absolute;
  top: 16px;
  right: 20px;
  animation: ${animate.jump} 0.3s linear;
`
export const StarIcon2 = styled(StarIcon)`
  ${css.size(13)};
  opacity: 0.6;
  z-index: 3;
  top: 13px;
  right: 40px;
`
export const Footer = styled.div`
  ${css.column()};
  width: 100%;
  padding: 15px 10px;
  padding-left: 20px;
  padding-top: 0;
  z-index: 2;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  opacity: 0.8;
`
