import styled from 'styled-components'

import type { TMetric, TTestable } from '@/spec'
import css from '@/css'

export const BaseWrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  min-height: 70vh;
  width: 100%;

  ${css.media.tablet`
    width: 100%;
    margin: 0;
    padding: .6em;
    padding-top: 0;
    padding-right: 0;
  `};
`

export const Wrapper = styled(BaseWrapper)<{ metric?: TMetric }>`
  ${css.column('justify-start', 'align-center')};

  ${css.media.mobile`
    padding-left: 0;
  `};
`

export const InnerWrapper = styled.div<{ metric: TMetric }>`
  ${({ metric }) => css.fitContentWidth(metric)};

  width: 100%;
  margin-top: 15px;
  padding-top: 0;
  ${css.column('align-center')};
`

export const ContentWrapper = styled.div`
  ${css.column()};
  width: 100%;
`
