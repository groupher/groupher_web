import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/css'

type TWrapper = TTestable & { isSidebarLayout: boolean }
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-center')};
  width: 100%;
  margin-top: 10px;
  margin-left: ${({ isSidebarLayout }) => (isSidebarLayout ? '-30px' : 0)};
  margin: 0 6%;

  ${css.media.mobile`
    margin: 0;
    padding: 0;
  `};
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

  ${css.media.mobile`
    padding-right: 0;
  `};
`
export const FAQWrapper = styled.div`
  margin-left: -5%;
  margin-bottom: 15px;
  max-width: 90%;

  ${css.media.mobile`
    margin-left: 0;
    max-width: 100%;
    margin-bottom: 0;
  `};
`
