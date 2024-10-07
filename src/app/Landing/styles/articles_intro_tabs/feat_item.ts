import type { TColor } from '~/spec'

import styled, { css, rainbow } from '~/css'
import CheckSVG from '~/icons/CheckBold'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`
export const CheckIcon = styled(CheckSVG)<TColor>`
  ${css.size(16)};
  fill: ${({ $color }) => rainbow($color)};
  opacity: 0.8;
  margin-right: 14px;
`

export const Text = styled.div<TColor>`
  color: ${({ $color }) => rainbow($color)};
  font-size: 16px;
  filter: saturate(0.8);
`
