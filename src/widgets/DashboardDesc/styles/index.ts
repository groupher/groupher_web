import styled from '~/css'
import type { TTestable } from '~/spec'

// import Img from '~/Img'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  padding: 130px;
  padding-top: 40px;
`

export const Title = styled.div``
