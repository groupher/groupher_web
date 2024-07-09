import styled, { css, theme } from '~/css'

import Img from '~/Img'
import { WithMargin } from '~/widgets/Common'

export const Wrapper = styled(WithMargin)`
  ${css.row('align-center')};
`
export const AvatarsImg = styled(Img)`
  border: 2px solid;
  border-color: ${theme('divider')};
  font-size: 12px;

  ${css.size(22)};
  border-radius: 5px;

  text-align: center;
`
