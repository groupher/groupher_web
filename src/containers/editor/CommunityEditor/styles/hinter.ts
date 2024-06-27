import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column('align-start')};
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-weight: bold;
  font-size: 1rem;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  margin-top: 10px;
  margin-left: 7px;
  font-size: 0.9rem;
  opacity: 0.8;
`
