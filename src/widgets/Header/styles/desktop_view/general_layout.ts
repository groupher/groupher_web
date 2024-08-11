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
  border-bottom: ${({ noBorder }) => (noBorder ? 'none' : '1px solid')};
  border-bottom-color: ${theme('divider')};
  box-shadow: ${({ noBorder }) => (noBorder ? 'none' : theme('drawer.shadow'))};
`

type TInnerWrapper = { metric: TMetric }

export const InnerWrapper = styled.div<TInnerWrapper>`
  ${css.row('align-center')};
  width: 100%;
  height: 33px;
  ${({ metric }) => css.fitContentWidth(metric)};
  padding-left: 0;
  padding-right: 0;
`
export const RouterWrapper = styled.div`
  ${css.rowGrow('align-center')};
  height: 100%;
`
