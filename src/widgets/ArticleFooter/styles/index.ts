import type { TTestable } from '@/spec'
import styled, { css } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>``

export const BaseInfo = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 30px;
  margin-top: 10px;
  padding-left: 0;
  padding-right: 10px;

  ${css.media.mobile`
    margin-top: 10px;
  `};
`
