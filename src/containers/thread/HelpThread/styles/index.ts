import styled from 'styled-components'

import type { TTestable } from '@/spec'
import { theme } from '@/utils/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: 100%;
  margin-top: 10px;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '-30px' : 0)};
`
export const MainWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 600px;

  background: transparent;
  border-radius: 6px;
  margin-top: 12px;
  padding-left: 25px;
  padding-right: 80px;

  border-right: 1px solid;
  border-right-color: ${theme('divider')};
`
