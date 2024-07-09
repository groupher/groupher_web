import styled, { css, animate } from '~/css'

export const Wrapper = styled.div`
  ${css.row()};
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 42px;
  animation: ${animate.jump} 0.5s linear;
`
export const holder = 1
