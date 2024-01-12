import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 15px 20px;
  padding-bottom: 0;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  border: 1px solid;
  border-color: ${theme('divider')};
  width: 445px;
  height: 80px;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 2;
  position: absolute;
  top: 8px;
  left: 8px;
`
export const Url = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
  margin-bottom: 2px;
`
export const Title = styled.div`
  // color: #1a0dab;
  color: ${theme('article.title')};
  font-size: 18px;
`
