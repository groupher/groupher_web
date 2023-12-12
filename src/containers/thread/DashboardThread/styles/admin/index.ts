import styled, { css } from '@/css'
import { ALIGN_HEADER_OFFSET } from '../../constant'

export const Wrapper = styled.div`
  ${css.column()};
  padding: ${() => `0 ${ALIGN_HEADER_OFFSET}`};
  padding-left: 68px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`

export const Title = styled.div``
