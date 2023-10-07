import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.article.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('justify-between')};
  position: relative;
  padding-top: 2px;
  min-height: 300px;
  width: 100%;
  padding: 0 180px;
  margin-left: 20px;

  ${css.media.mobile`
    padding: 0 20px;
    margin-left: 0;
  `};
`
export const InnerWrapper = styled.div`
  width: 600px;

  ${css.media.mobile`
    width: 100%;
  `};
`
export const MainWrapper = styled.div<{ metric: TMetric }>`
  width: 100%;
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
