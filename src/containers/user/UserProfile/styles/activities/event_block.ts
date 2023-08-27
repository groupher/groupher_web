import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
`
export const Title = styled.div`
  font-size: 14px;
  color: ${theme('article.title')};
  flex-grow: 1;
  margin-top: -4px;
`
