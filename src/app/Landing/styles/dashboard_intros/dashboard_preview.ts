import styled, { theme } from '@/css'

export const Wrapper = styled.div`
  padding: 20px;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('hoverBg')};
  color: ${theme('article.digest')};
  height: 580px;
  width: 420px;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
  left: 200px;
  bottom: 32px;
  z-index: 2;
`
export const Title = styled.div`
  font-size: 16px;
  color: ${theme('article.digest')};
`
