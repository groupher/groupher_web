import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.title')};
  font-size: 0.9rem;
`
export const LoginLabel = styled.div`
  font-size: 0.9rem;
  transition: color 0.3s;
  color: ${theme('banner.title')};
  margin-left: 3px;
  margin-right: 3px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
    text-decoration: underline;
  }
`
