import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css from '@/css'

import { MainWrapper } from './index'

export const Wrapper = styled(MainWrapper)<TSpace>`
  ${css.flexColumn('align-center')};
  border-right: none;
  width: 100%;
  max-width: 500px;

  ${(props) => css.spaceMargins(props)};
`
export const Holder = styled.div``
