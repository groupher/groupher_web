import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css from '@/utils/css'

import { FEAT } from '../../../constant'

export { FeatList } from '..'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-start')};
  width: 48%;
  height: 430px;
  padding-left: 1%;

  *::selection {
    background-color: ${FEAT.DISCUSS.COLOR} !important;
    color: white;
  }

  ${css.media.mobile`
    width: 100%;
    padding: 0;
    height: auto;
  `};
`
