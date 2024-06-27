import styled, { css } from '~/css'

import type { TSpace } from '~/spec'

import Img from '~/Img'

type TProps = {
  $size: number
} & TSpace

export const GroupherLogo = styled(Img)<TProps>`
  ${({ $size }) => css.size($size)};
  ${(props) => css.spaceMargins(props)};
`
