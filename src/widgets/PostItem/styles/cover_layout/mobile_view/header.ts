import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-end', 'justify-between')};
  color: ${theme('article.digest')};
  margin-left: 0;
  margin-bottom: 3px;
`
export const AuthorInfo = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  margin-top: 2px;
`
export const Brief = styled.div`
  ${css.rowGrow('align-center')};
  margin-bottom: 10px;
  color: ${theme('article.title')};
  &:hover {
    cursor: pointer;
  }
`
export const TagListWrapper = styled.div`
  margin-right: -3px;
`
