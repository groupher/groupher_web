import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 3px 5px;
  padding-left: 10px;
`
export const UsersWrapper = styled.div`
  ${css.row('align-center')};
  font-size: 13px;
`
export const Username = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
  margin-right: 5px;
`
export const Units = styled.div`
  color: ${theme('article.digest')};
  margin-left: 3px;
  margin-right: 3px;
  font-size: 13px;
`
