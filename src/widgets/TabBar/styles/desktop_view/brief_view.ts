import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
`

export const TabItem = styled.div<TActive>`
  ${css.row('align-center')};
  width: 70px;
  padding: 0 5px;
  padding-bottom: 2px;
  font-size: 0.85rem;
  margin-right: 10px;
  border-bottom: 1px dashed;

  color: ${({ active }) => (active ? theme('tabs.headerActive') : theme('tabs.header'))};
  border-bottom-color: ${({ active }) => (active ? theme('tabs.headerActive') : theme('divider'))};

  &:hover {
    color: ${theme('tabs.headerActive')};
    cursor: pointer;
  }
  transition: 0.2s color;

  ${css.media.mobile`
    width: 80px;
    margin-right: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  `};
`
