import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css from '@/utils/css'

type TWrapper = TTestable & { metric: TMetric }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('justify-center')};
  margin-top: 50px;
  ${({ metric }) => css.fitPageWidth(metric)};
  padding: 30px 0;
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
`
