import styled, { css } from '~/css'
import { ALIGN_HEADER_OFFSET } from '../../constant'

export const Wrapper = styled.div`
  padding: 0;
  padding: ${() => `0 ${ALIGN_HEADER_OFFSET}`};
  max-width: 700px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const Desc = styled.div`
  width: 80%;
  line-height: 1.65;
`
