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
  margin-top: -180px;
`

export const DescBlock = styled.div`
  position: absolute;
  top: 100px;
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 400;
  opacity: 0.4;

  /* box-shadow: 0 5px 25px rgb(35 35 35 / 10%); */
  /* border: 1px dashed;
  border-color: ${theme('article.title')}; */
  /* padding: 0 5px; */
  /* border-radius: 10px; */
`

export const Desc = styled(DescBlock)`
  left: calc(50% - 65px);
  top: 116px;
  transform: rotate(4deg);
`

export const Desc2 = styled(DescBlock)`
  left: calc(50% - 165px);
  top: 170px;
  transform: rotate(3deg);
`
export const Desc3 = styled(DescBlock)`
  left: calc(50% + 68px);
  top: 150px;
  transform: rotate(-2deg);
`
export const Desc4 = styled(DescBlock)`
  left: calc(50% + -25px);
  top: 215px;
  transform: rotate(2deg);
`

export const CurlyLineIcon = styled(CurlyLineSVG)`
  ${css.size(360)};
  opacity: 0.4;
  z-index: -1;
`
