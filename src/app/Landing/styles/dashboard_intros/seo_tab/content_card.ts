import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 20px;
  background: #f1f1f154;
  color: ${theme('article.digest')};
  width: 460px;
  height: 540px;
  border-radius: 15px;
  z-index: 2;
  position: absolute;
  bottom: 80px;
  left: 140px;
`
export const WebCard = styled.div`
  ${css.column()};
  padding: 20px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 430px;
  height: 160px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 12px;
  left: 12px;
`
