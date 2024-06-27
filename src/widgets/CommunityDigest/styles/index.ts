import type { TTestable } from '~/spec'
import styled, { css } from '~/css'

export const BaseBanner = styled.nav.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('justify-center', 'align-center')};
  position: relative;
  min-height: 108px;
`
export const BaseTabber = styled.div`
  ${css.row()};

  position: absolute;
  bottom: 0;
  margin-left: -10px;
  width: 80vw;
  overflow-x: auto;
  overflow-y: hidden;

  ${css.media.tablet`
    left: 0;
    width: calc(100% - 5%);
    padding-left: calc(3% + 15px);
  `};
`
