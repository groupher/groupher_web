import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

import CurlyLineSVG from './K2CSVG'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -268px;
  z-index: -1;

  ${css.media.mobile`
    display: none;
  `};
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
  left: calc(50% - 25px);
  top: 200px;
  transform: rotate(-4deg);
`
export const Desc2 = styled(DescBlock)`
  left: calc(50% - 150px);
  top: 230px;
  transform: rotate(3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% + 80px);
  top: 250px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% - 110px);
  top: 285px;
  transform: rotate(-3deg);
`
export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(500)};
  transform: rotatey(180deg) rotate(7deg) scaleY(1.2);
  opacity: 0.5;
  z-index: -2;
`
