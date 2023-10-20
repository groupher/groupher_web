import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { theme } from '@/css'

import { getDigestHeight } from './metric'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.nav.attrs<TWrapper>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  position: relative;
  background: transparent;
  min-height: ${({ metric }) => getDigestHeight(metric)};
  height: auto;
  margin-bottom: 24px;
  width: 100%;
  ${({ metric }) => css.fitPageWidth(metric)};
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const BannerContent = styled.div`
  ${css.row('justify-center')};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
