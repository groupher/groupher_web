import styled, { css, animate } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 100%;
  position: relative;
  margin-left: 20px;
  animation: ${animate.jump} 0.5s linear;
`

export const holder = 1
