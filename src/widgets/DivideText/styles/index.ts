import type { TTestable } from '~/spec'
// import Img from '~/Img'
import styled, { css } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
  width: 100%;
`
export const Content = styled.div`
  font-size: 13px;
  color: #0a5669;
  margin-left: 20px;
  margin-right: 20px;
`
export const LeftLine = styled.div`
  height: 1px;
  background: #07414f;
  flex-grow: 1;
`
export const RightLine = styled(LeftLine)``
