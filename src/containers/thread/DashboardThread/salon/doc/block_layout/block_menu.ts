import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 6px;
  width: 100px;
`

export const Item = styled.div`
  ${css.row('justify-between', 'align-center')};
  padding: 3px 4px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`

export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;

  ${Item}:hover & {
    color: ${theme('article.title')};
  }
`
