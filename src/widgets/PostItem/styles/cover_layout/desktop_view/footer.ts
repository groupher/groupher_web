import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  position: relative;
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 14px;
`

export const CreateTime = styled.div`
  color: ${theme('article.info')};
  opacity: 0.6;
  font-size: 11px;
  margin-top: 2px;
  margin-right: 1px;
`
