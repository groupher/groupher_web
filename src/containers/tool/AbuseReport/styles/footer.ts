import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  background: ${theme('modal.subPanel')};
  height: 50px;

  ${css.media.mobile`
    background: transparent;
    margin-top: 20px;
    margin-bottom: 40px;
  `};
`
export const Note = styled.div`
  color: ${theme('article.digest')};
  margin-top: 22px;
  margin-bottom: 18px;
  font-size: 14px;
`
