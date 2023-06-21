import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css from '@/utils/css'

import { MainWrapper } from './index'

export const Wrapper = styled(MainWrapper)<TSpace>`
  ${css.flexColumn('align-center')};
  padding-left: 22px;
  padding-right: 0;
  margin-top: -25px;
  border-right: none;

  ${(props) => css.spaceMargins(props)};
`
export const Holder = styled.div``
