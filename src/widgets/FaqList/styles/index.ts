import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css from '@/css'
import { WithMargin } from '@/widgets/Common'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  padding-bottom: 40px;
  width: 100%;

  ${css.media.mobile`
    padding-bottom: 15px;
  `};
`

export const Title = styled.div``
