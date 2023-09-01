import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ first: boolean }>`
  ${css.column('align-start')};
  padding: 10px 15px;
  padding-top: ${({ first }) => (first ? '40px' : '10px')};
  padding-left: 0;
  color: ${theme('article.digest')};
  width: 100px;

  ${css.media.mobile`
    padding-right: 0;
    width: 80px;
  `};
`
export const DateInfo = styled.div`
  ${css.row('align-end')};
  font-size: 12px;
`
export const DayNum = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
`
export const Divider = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
  margin-left: 5px;
  margin-right: 4px;
  margin-bottom: 2px;
`
export const MonthNum = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const Desc = styled.div`
  font-size: 12px;
  margin-top: 3px;
`
