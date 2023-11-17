import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

import CurlyLineSVG from './U2DSVG'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -50px;
  z-index: -1;

  ${css.media.mobile`
    display: none;
  `};
`
export const Circle = styled.div`
  ${css.circle(8)};
  border: 1px solid;
  border-color: ${theme('article.info')};
  position: absolute;
  left: calc(50% - 44px);
  top: 110px;
  opacity: 0.4;
`

export const DescBlock = styled.div`
  position: absolute;
  top: 100px;
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
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
