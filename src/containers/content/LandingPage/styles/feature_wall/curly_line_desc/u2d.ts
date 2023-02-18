import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'

import css, { animate, theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

import MagicSVG from '@/icons/MagicHand'
import CurlyLineSVG from './U2DSVG'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -30px;
  z-index: -1;

  ${css.media.mobile`
    display: none;
  `};
`
export const MagicWrapper = styled.div`
  position: absolute;
  left: calc(50% - 57px);
  top: 95px;
  transform: rotate(-32deg);
  opacity: 0.5;

  &:after {
    content: '';
    position: absolute;
    top: 24px;
    left: 5px;
    ${css.size(10)};
    height: 7px;
    background: white;
    transform: rotate(45deg);
  }
`
export const MagicIcon = styled(MagicSVG)<{ color: TColorName }>`
  ${css.size(35)};
  fill: ${({ color }) => theme(`baseColor.${camelize(color)}`)};

  filter: saturate(1.5);
  transform: scale(0.8);
  animation: ${animate.breath} 2s linear infinite alternate;
  transition: all 0.2s;
`

export const DescBlock = styled.div`
  position: absolute;
  top: 100px;
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 400;
  opacity: 0.4;
`

export const Desc = styled(DescBlock)`
  left: calc(50% - 125px);
  top: 145px;
  transform: rotate(4deg);
`

export const Desc2 = styled(DescBlock)`
  left: calc(50% - 100px);
  top: 240px;
  transform: rotate(-3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% - 10px);
  top: 180px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% + 100px);
  top: 240px;
  transform: rotate(-2deg);
`
export const Desc5 = styled(DescBlock)`
  left: calc(50% - 40px);
  top: 275px;
  transform: rotate(3deg);
`
export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(500)};
  transform: rotatey(180deg) rotate(2deg) scaleY(1);
  margin-left: 60px;
  opacity: 0.6;
  z-index: -1;
`
