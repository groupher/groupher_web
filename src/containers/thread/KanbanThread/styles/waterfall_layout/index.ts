import type { TTestable } from '@/spec'
import styled, { css } from '@/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-start')};
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin-top: 40px;
  gap: 0 50px;
`
export const holder = 1
