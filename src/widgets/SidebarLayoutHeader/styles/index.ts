import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
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
  padding-bottom: 15px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const PublishWrapper = styled.div`
  width: 110px;
`
export const AccountWrapper = styled.div`
  ${css.flex('justify-end')};
  flex-grow: 1;
`
