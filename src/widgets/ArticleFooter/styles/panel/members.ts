import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  margin-bottom: 15px;
  margin-top: -4px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 10px;
`
