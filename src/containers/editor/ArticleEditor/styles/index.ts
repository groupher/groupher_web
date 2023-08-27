import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('justify-center')};
  width: 100%;
  margin-top: 40px;
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  ${css.flex('justify-center')};
  width: 100%;
  margin-top: 30px;
  ${({ metric }) => css.fitContentWidth(metric)};
`

export const FuncRow = styled.div`
  ${css.flex('align-center')};
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 28px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  padding-bottom: 20px;
`

export const ContentWrapper = styled.div`
  /* min-height: 40vh; */
`
export const Footer = styled.div`
  ${css.flex('align-center', 'justify-end')};
  width: 100%;
  border-top: 2px solid;
  border-top-color: #03343f;
  margin-top: 35px;
  margin-bottom: 40px;
  padding-top: 20px;
`
