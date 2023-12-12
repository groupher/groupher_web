import styled, { css } from '@/css'

export const Wrapper = styled.div`
  display: none;
  width: 100%;

  ${css.media.mobile`
    ${css.columnGrow()};
  `};
`
export const holder = 1
