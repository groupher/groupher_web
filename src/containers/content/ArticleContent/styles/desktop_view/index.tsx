import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css from '@/css'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.article.attrs<TWrapper>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('justify-center')};
  position: relative;
  min-height: 250px;
  width: 100%;

  ${({ metric }) => css.fitPageWidth(metric)};

  ${css.media.mobile`
    padding: 0 20px;
    margin-left: 0;
  `};
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  ${css.row('align-start', 'justify-between')};
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const ArticleWrapper = styled.div`
  font-size: 15px;
  /* border-radius: 5px; */
  background: transparent;

  min-height: 200px;
`
export const BodyHeaderWrapper = styled.div`
  margin-top: -18px;
  margin-bottom: 18px;
`
export const CommentsWrapper = styled.div`
  margin-top: 35px;
`
