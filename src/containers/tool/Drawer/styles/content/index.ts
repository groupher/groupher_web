import styled from '@/css'

import { NARROW_HEIGHT_OFFSET } from '../../constant'
import { isWideMode } from '../metrics'
// import styled, { css } from '@/css'

export const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  height: ${({ type }) =>
    isWideMode(type) ? '100vh' : `calc(100vh - ${NARROW_HEIGHT_OFFSET * 2}px)`};
  overflow-y: scroll;
`

export const InnerWrapper = styled.div``
