import styled from 'styled-components'

import css, { theme } from '@/css'

type TWrapper = { align: 'center' | 'right' }
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  width: auto;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-end')};
`
export const CancelBtn = styled.div`
  opacity: 0.8;
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-top: 1px;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: opacity 0.2s;
`
