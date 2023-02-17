import styled from 'styled-components'

import css from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 55%;
  min-width: 550px;
  max-width: 550px;

  ${css.media.mobile`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0 20px;
  `};
`

export const holder = 1
