import type { TTestable, TMetric } from '~/spec'
import styled, { css, theme } from '~/css'

type TPos = {
  noBorder: boolean
}

type IWrapper = TPos & TTestable

export const Wrapper = styled.header.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<IWrapper>`
  width: 100%;
  height: 33px;
  ${css.row('justify-center')};
  background: ${theme('header.bg')};
  opacity: 1;
  border-bottom: ${({ noBorder }) => (noBorder ? 'none' : '1px solid')};
  border-bottom-color: ${theme('header.spliter')};
  box-shadow: ${({ noBorder }) => (noBorder ? 'none' : theme('drawer.shadow'))};
`

type TInnerWrapper = { metric: TMetric }
const InnerWrapper = styled.div<TInnerWrapper>`
  ${css.row('align-center')};
  padding: 0 4px;
  width: 100%;
  height: 33px;
  ${({ metric }) => css.fitContentWidth(metric)};
`
// padding-left: ${pixelAdd(WIDTH.COMMUNITY.CONTENT_OFFSET, 10)};
//  padding-right: ${WIDTH.COMMUNITY.CONTENT_OFFSET};
export const ClassicInnerWrapper = styled(InnerWrapper)``

export const RouterWrapper = styled.div`
  ${css.rowGrow('align-center')};
  height: 100%;
`
