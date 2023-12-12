import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  padding-right: 10px;
`
export const HintHolder = styled.div`
  font-size: 14px;
  color: ${theme('article.digest')};
  padding-left: 5px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
