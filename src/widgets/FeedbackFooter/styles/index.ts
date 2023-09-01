import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'

// import Img from '@/Img'
import css from '@/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div<TWrapper>`
  ${css.column('')};

  ${(props) => css.spaceMargins(props)};
`

export const holder = 1
