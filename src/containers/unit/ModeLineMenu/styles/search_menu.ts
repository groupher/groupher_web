import type { TTestable } from '@/spec'
import Img from '@/Img'
import styled, { css, theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-center', 'justify-start')};
  margin-top: 42px;
  width: 100%;
  min-height: 200px;
  padding: 0;
`
export const SearchBoxWrapper = styled.div`
  ${css.row('align-both')};
  padding: 0 8px;
  height: 30px;
  width: 75%;
  border-radius: 10px;
  background: #0b3440;
`
export const SearchIcon = styled(Img)`
  fill: ${theme('article.digest')};
  /* fill: #1f6377; */
  ${css.size(14)};
  margin-left: -12px;
`
export const Placeholder = styled.div`
  /* color: #1f6377; */
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: 6px;
`
export const NoteWrapper = styled.div`
  width: 75%;
  margin-top: 30px;
  margin-bottom: 20px;
`
export const ContentWrapper = styled.div`
  ${css.column('align-start')};
  width: 75%;
`
export const Item = styled.div`
  ${css.row('justify-between', 'align-center')}
  width: 100%;
  margin-bottom: 10px;
`
export const Title = styled.div`
  /* color: #1f6377; */
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  /* fill: #1f6377; */
  ${css.size(14)};
  transform: rotate(180deg);
`
