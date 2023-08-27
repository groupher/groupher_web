import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  font-size: 12px;

  ${css.media.mobile`
    font-size: 12px;
  `}
`

export const holder = 1
