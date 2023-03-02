import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { getPathGradient } from '../../metric'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  position: relative;
  width: 1080px;
  border-radius: 12px;

  ${css.media.mobile`
    display: none;
  `};
`

export const ParallaxWrapper = styled.div`
  width: 1080px;
  position: relative;
  z-index: 2;
`

export const FreeLabel = styled.div<{ wallpaper: string }>`
  color: ${theme('article.digest')};
  background: ${({ wallpaper }) => `linear-gradient(to left, ${getPathGradient(wallpaper)})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 400;
  transform: rotate(-3deg);
  font-size: 16px;

  position: absolute;
  left: 80px;
  top: -50px;
  z-index: -1;
  opacity: 0.8;
  font-style: italic;
`

export const FreeLabel2 = styled.div`
  ${css.flex('align-both')};
  width: 80px;
  height: 35px;
  border-radius: 8px;
  color: ${theme('baseColor.purple')};
  background: ${theme('baseColor.purpleBg')};
  padding-right: 10px;
  padding-left: 8px;

  position: absolute;
  left: 110px;
  top: -150px;
  z-index: -1;
`
