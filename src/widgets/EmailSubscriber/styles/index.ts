import styled from '~/css'
import type { TTestable } from '~/spec'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>``

export const holder = 1
