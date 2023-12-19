import type { TTestable } from '@/spec'
import styled, { css } from '@/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('align-start')};
  width: 100%;
  height: 100%;
  margin-top: 40px;
  gap: 30px 0;
`
export const holder = 1
