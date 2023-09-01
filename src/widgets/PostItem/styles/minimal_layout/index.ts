import styled from 'styled-components'

import type { TC11N } from '@/spec'
import css from '@/css'

type TWrapper = {
  c11n: TC11N
}

export const Wrapper = styled.article<TWrapper>`
  ${css.row()};
  position: relative;

  margin-bottom: 5px;

  transition: all 0.2s;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const holder = 1
