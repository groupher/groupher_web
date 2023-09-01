import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

import css from '@/css'

type TWrapper = { opacity?: number } & TTestable & TSpace

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  opacity: ${({ opacity }) => opacity || 1};

  ${(props) => css.spaceMargins(props)};
`

export const Title = styled.div``
