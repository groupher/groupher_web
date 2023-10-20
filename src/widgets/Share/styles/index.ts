import styled from 'styled-components'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
// import { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const Title = styled.div``
