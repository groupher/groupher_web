import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'

// import Img from '@/Img'
import css from '@/css'

type TWrapper = TSpace & TTestable

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  padding-bottom: 40px;
  width: 100%;

  ${(props) => css.spaceMargins(props)};

  ${css.media.mobile`
    padding-bottom: 15px;
  `};
`

export const Title = styled.div``
