import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  width: 32vw;
  max-width: 32vw;
  height: 100%;
`
export const ItemBar = styled.div<TActive>`
  ${css.column('align-start')};
  width: 95%;
  margin-bottom: 10px;
  padding: 4px 8px;
  padding-right: 5px;
  border-radius: 4px;
  border: 1px solid;
  background: #0f323e;
  /* color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))}; */
  border-color: ${({ active }) => (active ? '#194d5f' : 'transparent')};
`
export const Title = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  color: ${theme('article.title')};
  font-size: 12px;
  margin-bottom: 2px;
`
export const OpenedIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(10)};
  transform: rotate(90deg);
`
export const ClosedIcon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  margin-top: -1px;
  transform: rotate(90deg);
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
`
export const ArrowIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(10)};
`
