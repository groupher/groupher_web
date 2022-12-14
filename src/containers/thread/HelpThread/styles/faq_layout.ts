import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css from '@/utils/css'

import { MainWrapper } from './index'

export const Wrapper = styled(MainWrapper)<TSpace>`
  ${css.flexColumn('align-center')};
  padding-left: 22px;
  padding-right: 0;
  margin-top: -25px;
  border-right: none;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`
export const Holder = styled.div``
