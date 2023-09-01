import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css from '@/css'

type TWrapper = {
  metric: TMetric
} & TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row()};
  width: 100%;
  ${({ metric }) => css.fitPageWidth(metric)};
`
export const MainWrapper = styled.div`
  flex-grow: 1;
  min-height: 500px;

  background: transparent;
  margin-top: 30px;
  padding-left: 80px;
  margin-left: 35px;

  ${css.media.mobile`
    margin-top: 20px;
    padding-left: 0;
    margin-left: 0;
    width: 100%;
  `};
`
