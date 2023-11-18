import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

export { MenuItem, Icon } from '.'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  margin-bottom: 20px;
  margin-top: 5px;
`
export const MenuLink = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
  padding: 2px 10px;
  border-radius: 10px;

  &:hover {
    background: ${theme('hoverBg')};
    text-decoration: none;
    cursor: pointer;
  }
`
export const MainArea = styled.div`
  ${css.row('align-center')};
  margin-left: 14px;
`
export const AccountWrapper = styled.div`
  ${css.row('justify-end')};
  flex-grow: 1;
`
