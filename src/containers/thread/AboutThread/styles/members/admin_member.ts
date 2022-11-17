import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-start')};
  margin-bottom: 15px;
`
export const Info = styled.div``
export const Name = styled.div`
  ${css.cutRest('140px')};
  color: ${theme('article.title')};
  font-size: 14px;
  margin-bottom: 2px;
  font-weight: 600;
`
export const Bio = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  ${css.lineClamp(2)};
  opacity: 0.8;
  padding-right: 22px;
`
