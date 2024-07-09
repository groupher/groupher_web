import styled from '~/css'
import type { TSpace } from '~/spec'

export const Wrapper = styled.div<TSpace>`
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
`
export const Title = styled.div``
