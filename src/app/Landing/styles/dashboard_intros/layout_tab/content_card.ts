import styled, { css, theme, animate } from '~/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 420px;
  height: 450px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 50px;
  left: 10px;
  animation: ${animate.jump} 5s linear infinite alternate;
`
export const holder = 1
