import styled, { css, animate } from '~/css'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  animation: ${animate.jump} 0.5s linear;
  margin-bottom: 20px;
`
export const InnerWrapper = styled.div`
  ${css.row()};
  width: 100%;
  height: 100%;
  transform: scale(0.95);
  position: relative;
`
