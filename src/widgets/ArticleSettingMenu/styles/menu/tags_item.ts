import styled, { css, theme } from '~/css'

export { MenuItem } from '.'

export const TagTitle = styled.div`
  ${css.cutRest('50px')};
  margin-right: 4px;
`

export const TagCount = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
  margin-top: 1px;
`
