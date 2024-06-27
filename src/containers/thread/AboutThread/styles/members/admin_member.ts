import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-start')};
  margin-bottom: 15px;
`
export const Info = styled.div``
export const Name = styled.div`
  ${css.cutRest('140px')};
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 2px;
  font-weight: 500;
`
export const Bio = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  ${css.lineClamp(2)};
  width: 80%;
`
