import type { TTestable, TActive } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('justify-between')};
  width: 100%;
  padding: 0;
`
export const RightPartWrapper = styled.div`
  ${css.row()};
  width: 65%;
`
export const SortWrapper = styled.div`
  width: 100px;
  height: 100%;
  min-height: 200px;
`
export const ThreadWrapper = styled.div`
  width: 100px;
  height: 100%;
  min-height: 200px;
  border-left: 1px solid;
  border-left-color: #183d54;
`
export const TagWrapper = styled.div`
  width: 100px;
  /* flex-grow: 1; */
  height: 100%;
  /* min-height: 200px; */
  border-left: 1px solid;
  border-right: 1px solid;
  border-left-color: #183d54;
  border-right-color: #183d54;
`
export const ItemBar = styled.div<TActive>`
  ${css.row('align-center', 'justify-between')};
  color: ${({ active }) => (active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  padding: 5px 8px;
  font-size: 13px;
  background: ${({ active }) => (active ? '#123946' : 'transparent')};
  border-radius: 3px;
`
export const ArrowIcon = styled(Img)`
  fill: ${theme('article.title')};
  ${css.size(10)};
`
export const TagDot = styled.div`
  ${css.circle(6)};
  background: ${theme('rainbow.red')};
  margin-top: -1px;
`
