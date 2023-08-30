import styled from 'styled-components'

import css from '@/css'
import { ALIGN_HEADER_OFFSET } from '../../constant'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: ${() => `0 ${ALIGN_HEADER_OFFSET}`};

  ${css.media.mobile`
    padding: 0 20px;
  `};
`

export const Title = styled.div``
