import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.nav.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 36px;
  border: 2px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  background: ${theme('divider')};
  padding: 0 1px;
`
export const TabItem = styled.div<TActive>`
  ${css.flex('align-both')};
  height: 28px;

  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 'normal')};
  font-size: 12px;
  flex-grow: 1;
  border-radius: 8px;
  margin-left: 1px;
  margin-right: 1px;

  box-shadow: ${({ $active }) => ($active ? 'rgb(0 0 0 / 15%) 0px 5px 15px 0px;' : 'none')};

  &:hover {
    font-weight: 600;
    cursor: pointer;
  }

  transition: all 0.2s;
`
