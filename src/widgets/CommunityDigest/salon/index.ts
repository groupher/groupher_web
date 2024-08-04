import type { TTestable } from '~/spec'
import styled, { css } from '~/css'

export const BaseBanner = styled.nav.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('justify-center', 'align-center')};
  position: relative;
  min-height: 108px;
`
