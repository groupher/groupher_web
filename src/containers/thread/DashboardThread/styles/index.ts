import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex()};
  width: 100%;
`
export const MainWrapper = styled.div`
  flex-grow: 1;
  min-height: 500px;

  background: transparent;
  margin-top: 30px;
  padding-left: 80px;
  margin-left: 20px;

  ${css.media.mobile`
    margin-top: 20px;
    padding-left: 0;
    margin-left: 0;
    width: 100%;
  `};
`
