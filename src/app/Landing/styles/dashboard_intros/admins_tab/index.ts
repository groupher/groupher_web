import styled, { css, theme, animate } from '~/css'

import { WithPosition } from '~/widgets/Common'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 26px;
  animation: ${animate.jump} 0.5s linear;
`
export const Notes = styled(WithPosition)`
  color: ${theme('hint')};
  font-size: 15px;
  bottom: 80px;
  left: 180px;
`
export const Highlight = styled.span`
  color: ${theme('rainbow.pink')};
  margin-left: 3px;
  margin-right: 3px;
  font-weight: 500;
  opacity: 0.8;
`
