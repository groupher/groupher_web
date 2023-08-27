import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import AccountSVG from '@/icons/Acount'

export { Menu, MenuItem, Icon } from '.'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  margin-bottom: 20px;
  margin-top: 5px;
`
export const EmptySpace = styled.div`
  width: 132px;
`
export const MainArea = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 610px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  padding-bottom: 15px;
`
export const PublishWrapper = styled.div`
  width: 110px;
`
export const AccountWrapper = styled.div`
  ${css.flex('justify-end')};
  flex-grow: 1;
  padding-bottom: 15px;
  padding-right: 20px;
`

const hoverEffect = `
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const AccountIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(16)};

  ${hoverEffect}
`
