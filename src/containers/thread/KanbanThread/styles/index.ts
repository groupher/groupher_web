import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 10px 25px;
  margin-bottom: 30px;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '-35px' : 0)};

  ${css.media.mobile`
    margin-bottom: 0;
    min-height: 80vh;
  `};
`
export const ColumnsWrapper = styled.div`
  ${css.flex('align-start', 'justify-between')};
  min-height: 500px;
  margin-top: 60px;

  ${css.media.mobile`
    display: none;
  `};
`

export const MobileColumnsWrapper = styled.div`
  display: none;
  ${css.media.mobile`
    margin-top: 50px;
    display: block;
    width: 100%;
    overflow: scroll;
  `};
`

export const MobileColumnsInner = styled.div`
  ${css.flex('align-start', 'justify-between')};
`
