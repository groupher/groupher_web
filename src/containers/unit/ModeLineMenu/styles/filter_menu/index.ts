// import Img from '@/Img'
import type { TTestable } from '@/spec'
import styled, { css } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-start')};
  margin-top: 25px;
  width: 100%;
  min-height: 200px;
  padding: 0;
`
export const holder = styled.div``
