import styled from 'styled-components'

import type { TThread } from '@/spec'
import { THREAD } from '@/constant/thread'

import css from '@/css'

export const Wrapper = styled.div<{ tab: TThread }>`
  ${css.column('align-both')};
  width: 100%;
  height: ${({ tab }) => {
    if (tab === THREAD.KANBAN) return '700px'
    return '640px'
  }};
  background: #fbfbfb;
  transition: all 0.15s;
`

export const holder = 1
