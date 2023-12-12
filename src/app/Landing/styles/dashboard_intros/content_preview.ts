import styled, { theme } from '@/css'

export const Wrapper = styled.div`
  padding: 10px;
  background: ${theme('htmlBg')};
  color: ${theme('article.digest')};
  width: 500px;
  height: 430px;
  border-radius: 5px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: absolute;
  bottom: 32px;
  left: 0;
  z-index: 1;
`
export const Title = styled.div`
  font-size: 16px;
  color: ${theme('article.digest')};
`
