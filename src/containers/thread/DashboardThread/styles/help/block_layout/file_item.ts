import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-bottom: 6px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const holder = 1
