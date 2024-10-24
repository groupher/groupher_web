import type { TTestable } from '~/spec'
import styled, { css } from '~/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 10px 0;
  padding-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '50px' : 0)};
  margin-bottom: 30px;

  ${css.media.mobile`
    margin-bottom: 0;
    min-height: 80vh;
  `};
`
export const ColumnsWrapper = styled.div`
  ${css.row('align-start', 'justify-between')};
  min-height: 500px;
  margin-top: 60px;

  ${css.media.mobile`
    display: none;
  `};
`

export const MobileColumnsWrapper = styled.div`
  display: none;
  ${css.media.mobile`
    display: block;
    margin-top: 50px;
    width: 100%;
    overflow: scroll;
  `};
`

export const MobileColumnsInner = styled.div`
  ${css.row('align-start', 'justify-between')};
`
