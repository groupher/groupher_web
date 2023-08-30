import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 0 156px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`

export const Title = styled.div``
