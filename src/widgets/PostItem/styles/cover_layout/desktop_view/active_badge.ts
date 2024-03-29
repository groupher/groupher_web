import styled, { css, theme } from '@/css'

export const Wrapper = styled.div<{ hasComments: boolean }>`
  ${css.row('align-center')};
  display: ${({ hasComments }) => (hasComments ? 'flex' : 'none')};
  position: absolute;
  top: 4px;
  right: 0;
  color: ${theme('article.digest')};
  margin-right: 1px;
  margin-top: 8px;
`
export const Hint = styled.div`
  ${css.column('align-start')};
  color: ${theme('article.digest')};
  width: 180px;
  padding-left: 5px;
  font-size: 13px;
`
export const TimeStr = styled.div`
  color: ${theme('article.title')};
`
