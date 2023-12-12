import styled from '@/css'
import type { TTestable } from '@/spec'

type TWrapper = TTestable & { id: string }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  position: relative;
`
export const MobileWrapper = styled.div`
  width: 100%;
  height: 0px;
`
