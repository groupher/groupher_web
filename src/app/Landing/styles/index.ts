import Link from 'next/link'

import type { TSpace, TTestable } from '@/spec'

import Button from '@/widgets/Buttons/Button'
import LinkSVG from '@/icons/LinkOutside'

import styled, { css, theme } from '@/css'
import InfoSVG from '@/icons/Info'
import ArrowSVG from '@/icons/ArrowSimple'

import { getGlowOpacity, getGlowBackground, getPathGradient } from './metric'

type TWrapper = TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('align-both')};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
export const Banner = styled.div`
  ${css.column('align-center')};
  height: 700px;
  width: 100%;
  position: relative;

  ${css.media.mobile`
    height: 600px;
  `};
`
export const BgGlow = styled.div<{ wallpaper: string }>`
  position: absolute;
  top: 0;
  height: 700px;
  width: 100%;

  opacity: ${({ wallpaper }) => getGlowOpacity(wallpaper)};
  background: ${({ wallpaper }) => getGlowBackground(wallpaper)};

  ${css.media.mobile`
     display: none;
  `};
`

// https://superdesigner.co/tools/css-backgrounds
export const PatternBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 500px;
  mix-blend-mode: overlay;

  background: radial-gradient(
      circle at 50% 100%,
      #49494980 5%,
      #494949 5% 10%,
      #49494980 10% 15%,
      #494949 15% 20%,
      #49494980 20% 25%,
      #494949 25% 30%,
      #49494980 30% 35%,
      #494949 35% 40%,
      transparent 40%
    ),
    radial-gradient(
      circle at 100% 50%,
      #49494980 5%,
      #494949 5% 10%,
      #49494980 10% 15%,
      #494949 15% 20%,
      #49494980 20% 25%,
      #494949 25% 30%,
      #49494980 30% 35%,
      #494949 35% 40%,
      transparent 40%
    ),
    radial-gradient(
      circle at 50% 0%,
      #49494980 5%,
      #494949 5% 10%,
      #49494980 10% 15%,
      #494949 15% 20%,
      #49494980 20% 25%,
      #494949 25% 30%,
      #49494980 30% 35%,
      #494949 35% 40%,
      transparent 40%
    ),
    radial-gradient(
      circle at 0 50%,
      #49494980 5%,
      #494949 5% 10%,
      #49494980 10% 15%,
      #494949 15% 20%,
      #49494980 20% 25%,
      #494949 25% 30%,
      #49494980 30% 35%,
      #494949 35% 40%,
      transparent 40%
    );
  background-size: 4em 4em;
  background-color: #ffffff;

  opacity: 0.6;

  ${css.media.mobile`
    display: none;
  `};
`
export const BetaText = styled.div<{ wallpaper: string }>`
  font-size: 16px;
  background: linear-gradient(-180deg, #606060 16.79%, rgb(151 151 151 / 56%) 87.31%);
  background: ${({ wallpaper }) => `linear-gradient(to top, ${getPathGradient(wallpaper)})`};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  margin-top: -48px;
  margin-bottom: 10px;

  ${css.media.mobile`
    font-size: 13px;
    margin-top: 0px;
  `};
`
export const Title = styled.div`
  font-size: 40px;
  ${theme('article.title')};
  font-weight: 600;
  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 24px;
  `};
`
export const Desc = styled.p`
  font-size: 18px;
  ${theme('article.digest')};
  margin-top: 15px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 14px;
    text-align: center;
    padding: 0 20px;
  `};
`
export const InfoIcon = styled(InfoSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 5px;
`
export const Note = styled.div`
  color: ${theme('article.digest')};
  ${css.row('align-center')};
  font-size: 13px;
  margin-top: 20px;
`

export const ButtonGroup = styled.div`
  ${css.row('align-center')};
  gap: 0 22px;
  margin-top: 40px;
  margin-left: 10px;

  ${css.media.mobile`
    gap: 0px;
  `};
`
export const DemoPanel = styled.div`
  ${css.column()};
  gap: 3px 0;
  padding: 0 2px;
  width: 110px;
`
export const DemoMenuItem = styled(Link)`
  ${css.row('justify-between', 'align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
  padding: 4px 6px;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('button.boxShadow')};
    cursor: pointer;
    text-decoration: none;
  }
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(12)};
  color: ${theme('article.digest')};
  opacity: 0.3;

  ${DemoMenuItem}:hover & {
    opacity: 1;
  }
`
export const ArrowLeftIcon = styled(ArrowSVG)`
  ${css.size(16)};
  margin-left: 4px;
  fill: ${theme('button.fg')};
  transform: rotate(180deg);
  margin-right: -5px;
`

export const ArrowDownIcon = styled(ArrowSVG)`
  ${css.size(16)};
  margin-left: 4px;
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
  margin-right: -5px;
`
export const StartButton = styled(Button)`
  text-decoration: none;

  ${css.media.mobile`
    transform: scale(0.8);
    text-decoration: none;
  `};
`
export const DemoButton = styled(Button)`
  border-color: ${theme('article.digest')};

  &:hover {
    border-color: ${theme('article.title')};
  }

  transition: all 0.2s;

  ${css.media.mobile`
    transform: scale(0.8);
  `};
`

export const Divider = styled.div<TSpace>`
  width: 84%;
  height: 1px;
  margin-left: 8%;

  margin-top: ${({ top }) => `${top === undefined ? 20 : top}px`};
  margin-bottom: ${({ bottom }) => `${bottom === undefined ? 20 : bottom}px`};

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const FAQWrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  margin-bottom: 20px;
`

export const GradientText = styled.div<{ wallpaper: string }>`
  color: ${theme('article.digest')};
  background: ${({ wallpaper }) => `linear-gradient(to left, ${getPathGradient(wallpaper)})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`
