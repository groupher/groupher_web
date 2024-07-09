import styled, { css, theme } from '~/css'
import { WithMargin } from '~/widgets/Common'

export const ReadedLabel = styled(WithMargin)<{ size: number }>`
  ${({ size }) => css.circle(size)};
  background: ${theme('hint')};
  opacity: 0.6;

  ${css.media.mobile`
    ${css.circle(6)};
  `};
`
export const holder = 1
