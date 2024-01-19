import styled, { css, theme } from '@/css'
import type { TColor } from '@/spec'

import CheckSVG from '@/icons/Check'

export const Wrapper = styled.div`
  ${css.row('align-start')};
  margin-bottom: 13px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
`
export const IconWrapper = styled.div`
  ${css.size(18)};
  ${css.row('align-both')};
  margin-right: 10px;
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(15)};
  margin-top: 4px;
  fill: ${theme('rainbow.orange')};
`
