import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

import CurlyLineSVG from './D2RSVG'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -200px;
`

export const DescBlock = styled.div`
  position: absolute;
  top: 100px;
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 400;
  opacity: 0.4;
`

export const Desc = styled(DescBlock)`
  left: calc(50% - 25px);
  top: 112px;
  transform: rotate(-4deg);
`

export const Desc2 = styled(DescBlock)`
  left: calc(50% - 150px);
  top: 160px;
  transform: rotate(3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% + 68px);
  top: 150px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% + -125px);
  top: 235px;
  transform: rotate(2deg);
`
export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(360)};
  transform: rotatey(180deg);
  opacity: 0.4;
  z-index: -1;
`
