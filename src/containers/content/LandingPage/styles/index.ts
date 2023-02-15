import styled from 'styled-components'
import Link from 'next/link'

import type { TSpace, TTestable } from '@/spec'

import Button from '@/widgets/Buttons/Button'
import LinkSVG from '@/icons/LinkOutside'

import css, { animate, theme } from '@/utils/css'
import InfoSVG from '@/icons/Info'
import ArrowSVG from '@/icons/ArrowSimple'

import { getGlowOpacity, getGlowBackground, getPathGradient } from './metric'

type TWrapper = TTestable
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-both')};
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`
export const Banner = styled.div`
  ${css.flexColumn('align-center')};
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
  animation: ${animate.shake} 15s ease-in infinite alternate;

  ${css.media.mobile`
     display: none;
  `};
`
export const PatternBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 800px;
  height: 500px;
  mix-blend-mode: overlay;

  background: conic-gradient(at 62.5% 12.5%, #010101 25%, #0000 0) calc(44px / -8) calc(44px / 2),
    conic-gradient(at 62.5% 12.5%, #010101 25%, #0000 0) calc(-3 * 44px / 8) calc(44px / 4),
    conic-gradient(at 87.5% 62.5%, #010101 25%, #0000 0) calc(3 * 44px / 8) calc(44px / 4),
    conic-gradient(at 87.5% 62.5%, #010101 25%, #0000 0) calc(44px / -8) 0,
    conic-gradient(at 25% 12.5%, #010101 25%, #0000 0) 0 calc(44px / -4),
    conic-gradient(at 25% 12.5%, #010101 25%, #0000 0) calc(44px / -4) 0,
    conic-gradient(at 87.5% 87.5%, #010101 25%, #0000 0) calc(44px / 8) 0 rgba(255, 255, 255, 0);
  background-size: 44px 44px;

  opacity: 0.2;
  /* transform: skewY(-2deg); */
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
  ${css.flex('align-center')};
  font-size: 13px;
  margin-top: 20px;
`

export const ButtonGroup = styled.div`
  ${css.flex('align-center')};
  gap: 0 22px;
  margin-top: 40px;
  margin-left: 10px;
`
export const DemoPanel = styled.div`
  ${css.flexColumn()};
  gap: 3px 0;
  padding: 6px 2px;
  width: 100px;
`

export const DemoMenuItem = styled(Link)`
  ${css.flex('justify-between', 'align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
  padding: 2px 4px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    background: ${theme('hoverBg')};
    text-decoration: none;
  }
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(12)};
  color: ${theme('article.digest')};
  opacity: 0.4;

  ${DemoMenuItem}:hover & {
    opacity: 1;
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(16)};
  margin-left: 4px;
  fill: ${theme('article.digest')};
  transform: rotate(-90deg);
  margin-right: -5px;
`
export const DemoButton = styled(Button)`
  border-color: ${theme('article.digest')};

  &:hover {
    border-color: ${theme('article.title')};
  }

  transition: all 0.2s;
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
