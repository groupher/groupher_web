import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column()};
  width: 230px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 13px;
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  margin-top: 4px;
  font-size: 13px;
`
export const LinksWrapper = styled.div`
  ${css.row('justify-start')};
  margin-top: 15px;
  margin-left: -3px;
`
