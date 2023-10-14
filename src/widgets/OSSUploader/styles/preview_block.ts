import styled from 'styled-components'

import type { TUploadPreview } from '@/spec'

export const Wrapper = styled.div``
export const PreviewImg = styled.img<TUploadPreview>`
  /* position: absolute;
  left: 0;
  top: 0; */
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  border-radius: ${({ radius }) => `${radius}px`};
`
