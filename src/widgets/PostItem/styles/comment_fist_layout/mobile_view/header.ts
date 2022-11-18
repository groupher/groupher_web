import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  margin-left: 1px;
  margin-bottom: 5px;
`
export const AuthorInfo = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
`
export const TimeStamp = styled.div`
  font-size: 12px;
`
export const Brief = styled.div`
  ${css.flexGrow('align-center')};
  margin-bottom: 10px;
  color: ${theme('article.title')};
  &:hover {
    cursor: pointer;
  }
`
export const TagListWrapper = styled.div`
  margin-left: 14px;
`
