import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.article`
  ${css.row()};
  position: relative;

  transition: all 0.2s;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const holder = 1
