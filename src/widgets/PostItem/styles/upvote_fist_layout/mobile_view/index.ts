import styled from 'styled-components'

import css from '@/utils/css'

export const Wrapper = styled.div`
  display: none;
  width: 100%;

  ${css.media.mobile`
    ${css.flexColumnGrow()};
  `};
`
export const holder = 1
