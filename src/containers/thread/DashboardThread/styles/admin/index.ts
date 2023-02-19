import styled from 'styled-components'

import css from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 0 120px;
  padding-left: 120px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`

export const Title = styled.div``
