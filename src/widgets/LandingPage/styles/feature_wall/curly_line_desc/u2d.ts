import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

import CurlyLineSVG from './D2RSVG'
// import CurlyLineSVG from './CurlyLineSVG'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
  position: relative;
  margin-top: -10px;
  /* position: relative; */

  /* &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(216, 202, 225, 1) 35%, rgba(199, 213, 240, 1) 79%);
  } */
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
  left: calc(50% - 155px);
  top: 100px;
  transform: rotate(4deg);
`

export const Desc2 = styled(DescBlock)`
  left: calc(50% - 100px);
  top: 200px;
  transform: rotate(-3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% - 10px);
  top: 130px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% + 90px);
  top: 200px;
  transform: rotate(-2deg);
`

export const Desc5 = styled(DescBlock)`
  left: calc(50% - 60px);
  top: 240px;
  transform: rotate(3deg);
`

export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(360)};
  transform: rotatey(180deg);
  opacity: 0.4;
  z-index: -1;
`
