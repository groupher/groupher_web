import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div<TActive>`
  ${css.row('align-center')};
  cursor: pointer;
  margin-right: 6px;
  padding: 4px 8px;
  margin-left: 2px;
  border-radius: 8px;
  /* background: ${({ $active }) => ($active ? '#00333D' : 'transparent')}; */
  /* background: ${theme('hoverBg')}; */
  border: 1px solid;
  border-color: ${theme('divider')};

  &:hover {
    background: ${theme('divider')};
  }

  transition: all 0.2s;
`

export const Count = styled.div`
  color: ${theme('article.info')};
`
