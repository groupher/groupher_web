import styled, { css } from '~/css'

import type { TMetric } from '~/spec'

export const Wrapper = styled.div<{ metric?: TMetric }>`
  ${css.column('justify-start', 'align-center')};
  min-height: 70vh;
  width: 100%;

  ${css.media.mobile`
    padding-left: 0;
    width: 100%;
    margin: 0;
    padding: .6em;
    padding-top: 0;
    padding-right: 0;
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
export const FrameWrapper = styled.div<{ metric: TMetric }>`
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
