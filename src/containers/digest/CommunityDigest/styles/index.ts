import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

export const BaseBanner = styled.nav.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('justify-center', 'align-center')};
  position: relative;
  min-height: 108px;
`
export const BaseTabber = styled.div`
  ${css.flex()};

  position: absolute;
  bottom: 0;
  margin-left: -10px;
  width: 80vw;
  overflow-x: auto;
  overflow-y: hidden;

  ${css.media.tablet`
    left: 0;
    width: calc(100% - 5%);
    padding-left: calc(3% + 15px);
  `};
`
