import type { TTestable } from '~/spec'

import styled, { css, theme } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
  padding: 3px 6px;
  padding-right: 0;
  border-radius: 8px;
  margin-left: -4px;
  margin-top: -1px;
`
export const SelectEmotionWrapper = styled.div`
  ${css.circle(24)};
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  margin-left: 2px;
`
