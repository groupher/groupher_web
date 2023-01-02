import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'

// import Img from '@/Img'
import css from '@/utils/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div<TWrapper>`
  ${css.flexColumn('')};

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`

export const holder = 1
