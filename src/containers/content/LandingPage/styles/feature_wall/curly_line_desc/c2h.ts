import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

import CurlyLineSVG from './C2HSVG'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -272px;
  z-index: -2;

  ${css.media.mobile`
    display: none;
  `};
`

export const DescBlock = styled.div`
  position: absolute;
  top: 100px;
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 13px;
  font-weight: 400;
  opacity: 0.4;
`

export const Desc = styled(DescBlock)`
  left: calc(50% - 80px);
  top: 216px;
  transform: rotate(4deg);
`

export const Desc2 = styled(DescBlock)`
  left: calc(50% - 155px);
  top: 290px;
  transform: rotate(3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% + 80px);
  top: 240px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% - 26px);
  top: 278px;
  transform: rotate(2deg);
`

export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(520)};
  opacity: 0.5;
  z-index: -2;
  z-index: -2;

  transform: rotate(9deg) scaleY(1.2);
`
