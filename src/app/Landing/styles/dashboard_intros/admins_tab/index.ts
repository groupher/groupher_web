import styled, { css, theme } from '@/css'

import { WithPosition } from '@/widgets/Common'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 46px;
`
export const Notes = styled(WithPosition)`
  color: ${theme('hint')};
  font-size: 15px;
  bottom: 80px;
  left: 156px;
`
export const Highlight = styled.span`
  color: ${theme('rainbow.pink')};
  margin-left: 1px;
  margin-right: 3px;
  font-weight: 500;
  opacity: 0.8;
`
