import styled, { css, theme } from '~/css'

export const Wrapper = styled.div``
export const Title = styled.div`
  color: ${theme('dashboard.menuCat')};
  font-size: 19px;
  width: auto;

  ${css.media.mobile`
    display: none;
  `};
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 10px;
`
