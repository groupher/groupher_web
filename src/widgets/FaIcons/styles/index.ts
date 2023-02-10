import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

// import Img from '@/Img'
// import { theme } from '@/utils/themes'

type TWrapper = { opacity?: number } & TTestable & TSpace

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  opacity: ${({ opacity }) => opacity || 1};

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`

export const Title = styled.div``
