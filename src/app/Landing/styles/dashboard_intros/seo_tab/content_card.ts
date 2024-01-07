import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  background: #f1f1f19c;
  width: 460px;
  height: 540px;
  border-radius: 15px;
  z-index: 2;
  position: absolute;
  bottom: 80px;
  left: 140px;
`
export const Content = styled.div`
  margin-top: 180px;
  width: 100%;
  height: 180px;
  border: 1px solid;
  border-color: tomato;
`
