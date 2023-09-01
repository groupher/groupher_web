import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div<{ metric: TMetric }>`
  ${css.column('align-both')};
  width: 100%;
  height: 100%;

  ${({ metric }) => css.fitPageWidth(metric)};
`
export const InnerWrapper = styled.div<{ metric: TMetric }>`
  ${css.column('justify-center')};
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const ContentWrapper = styled.div`
  color: ${theme('article.digest')};
  transition: all 0.2s;
`
