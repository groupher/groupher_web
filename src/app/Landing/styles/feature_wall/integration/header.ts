import { WithPosition } from '~/widgets/Common'
import type { TColor } from '~/spec'

import styled, { css, theme } from '~/css'

export const Wrapper = styled(WithPosition)`
  ${css.row('align-center')};
  width: 100%;
  height: 20px;
  z-index: 2;
`
export const Dot = styled(WithPosition)<TColor>`
  ${css.circle(5)};
  background: ${theme('hint')};
  opacity: 0.3;
`
