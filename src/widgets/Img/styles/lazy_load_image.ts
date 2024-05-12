import type { TSpace } from '@/spec'

import styled, { css, zIndex } from '@/css'

type TWrapper = {
  size?: number
} & TSpace

export const NormalWrapper = styled.div<TWrapper>`
  ${css.row('align-both')};
  position: relative;
  z-index: ${zIndex.img};
`
export const FallbackOffsetWrapper = styled(NormalWrapper)`
  ${({ size }) => css.size(size)};
  ${(props) => css.spaceMargins(props)};
`
export const LazyImageWrapper = styled.div`
  z-index: ${zIndex.img};
`
export const FallbackWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${zIndex.img - 1};
`
export const CheckPixel = styled.img`
  width: 1px;
  height: 1px;
  opacity: 0;
  position: fixed;
  bottom: 0;
  right: 0;
`
