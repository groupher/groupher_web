import type { TThread, TMetric } from '@/spec'
import { THREAD } from '@/const/thread'

import styled, { css, theme, WIDTH } from '@/css'

type TWrapper = { tab?: TThread } & { metric: TMetric }
export const Wrapper = styled.div<TWrapper>`
  ${css.column('align-both')};
  width: ${({ metric }) => WIDTH[metric].PAGE};
  background: ${theme('landing.greyBg')};
`
export const InnerWrapper = styled.div<TWrapper>`
  ${css.column('align-both')};
  padding: 0 20px;
  width: 100%;
  height: ${({ tab }) => {
    if (tab === THREAD.KANBAN) return '700px'
    if (tab === THREAD.CHANGELOG) return '650px'
    if (tab === THREAD.DOC) return '662px'

    return '600px'
  }};
  ${({ metric }) => css.fitContentWidth(metric)};
  transition: all 0.15s;
`
