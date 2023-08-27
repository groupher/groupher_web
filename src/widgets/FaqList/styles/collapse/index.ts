import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 55%;
  min-width: 500px;
  max-width: 500px;

  ${css.media.mobile`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    padding: 0 20px;
  `};
`

export const holder = 1
