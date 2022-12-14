import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css from '@/utils/css'

// import Img from '@/Img'
// import { theme } from '@/utils/themes'

export const Wrapper = styled.div<TSpace>`
  position: relative;
  ${css.flexColumn()};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`

export const Title = styled.div``

export const TagsWrapper = styled.div``
