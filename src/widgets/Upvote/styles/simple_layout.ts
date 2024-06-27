import type { TTestable } from '~/spec'
import styled, { css } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
`
export const UpvoteBtnWrapper = styled.div`
  margin-top: 4px;
  margin-right: 4px;
`
