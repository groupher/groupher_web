import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-start')};
  padding: 10px;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  margin-bottom: 6px;
`
