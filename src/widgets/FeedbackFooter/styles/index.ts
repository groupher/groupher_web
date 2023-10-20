import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css from '@/css'
import { WithMargin } from '@/widgets/Common'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin)<TWrapper>`
  ${css.column('')};
`

export const holder = 1
