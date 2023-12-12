import type { TSpace } from '@/spec'
import styled, { css } from '@/css'

// import Img from '@/Img'

export const Wrapper = styled.div<TSpace>`
  position: relative;
  ${css.column()};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`

export const Title = styled.div``

export const TagsWrapper = styled.div``
