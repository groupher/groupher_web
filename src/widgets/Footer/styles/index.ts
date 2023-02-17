import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css from '@/utils/css'

type TWrapper = TTestable & { metric?: TMetric }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-both')};
  width: 100%;
  min-height: 50px;
  margin-top: 80px;
  padding-top: 50px;
  padding-bottom: 30px;
  box-shadow: rgb(241 241 241) 0px 0px 50px 0px inset;

  ${css.media.mobile`
    margin-top: 40px;
  `};
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};

  ${css.media.mobile`
    margin-left: 0;
  `};
`
