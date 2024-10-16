import type { TTestable } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row()};
  width: 100%;
`
export const MainWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 500px;

  background: transparent;
  border-radius: 6px;
  margin-top: 12px;
  padding-right: 65px;
  margin-right: 60px;
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
`
