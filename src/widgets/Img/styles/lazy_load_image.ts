import styled from 'styled-components'

import css, { zIndex } from '@/css'

export const Wrapper = styled.div`
  ${css.flex()};
  position: relative;
  z-index: ${zIndex.img};
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
