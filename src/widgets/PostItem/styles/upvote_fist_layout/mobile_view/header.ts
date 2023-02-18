import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-end', 'justify-between')};
  color: ${theme('article.digest')};
  margin-left: 0;
  margin-bottom: 3px;
`
export const AuthorInfo = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
`
export const TimeStamp = styled.div`
  font-size: 12px;
  margin-top: 2px;
`
