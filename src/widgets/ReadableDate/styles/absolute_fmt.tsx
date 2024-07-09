import styled, { css } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  font-size: 12px;

  ${css.media.mobile`
    font-size: 12px;
  `}
`

export const holder = 1
